package server

import (
	"context"
	"crypto/tls"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"golang.org/x/crypto/acme/autocert"
)

const (
	httpPort  = 80
	httpsPort = 443
)

// Server is a wrapper for http server, that sets up certificate handling using lets encrypt
// and forwards http requests to https.
//
// If insecure is set to true it only runs simple insecure http server.
type Server struct {
	Insecure bool
	CertsDir string
	SiteURLs []string
	HTTPPort int
}

// Run runs the server.
func (s *Server) Run(handler http.Handler) error {
	if s.HTTPPort == 0 {
		s.HTTPPort = httpPort
	}
	if s.Insecure {
		return s.runInsecure(handler)
	}
	if err := os.MkdirAll(s.CertsDir, os.ModePerm); err != nil {
		return err
	}
	return s.runSecure(handler)
}

func (s *Server) runSecure(handler http.Handler) error {
	siteURLs := make(map[string]bool, len(s.SiteURLs))
	for _, u := range s.SiteURLs {
		siteURLs[u] = true
	}

	manager := &autocert.Manager{
		Prompt: autocert.AcceptTOS,
		HostPolicy: func(ctx context.Context, host string) error {
			if siteURLs[host] {
				return nil
			}
			return fmt.Errorf("acme/autocert: host not allowed: %s", host)
		},
		Cache: autocert.DirCache(s.CertsDir),
	}

	go func() {
		log.Printf("Redirecting HTTP reuests from port %v to HTTPS\n", s.HTTPPort)
		server := newHTTPServer(s.HTTPPort, manager.HTTPHandler(newHTTPSRedirectServeMux()))

		if err := server.ListenAndServe(); err != nil {
			log.Println("HTTP redirect failed:", err)
		}
	}()

	log.Println("Serving HTTPS requests.")
	server := newHTTPServer(httpsPort, handler)
	server.TLSConfig = &tls.Config{
		GetCertificate: manager.GetCertificate,
	}
	return server.ListenAndServeTLS("", "")
}

func (s *Server) runInsecure(handler http.Handler) error {
	log.Printf("Serving HTTP on port %v\n", s.HTTPPort)
	server := newHTTPServer(s.HTTPPort, handler)

	return server.ListenAndServe()
}

func newHTTPSRedirectServeMux() *http.ServeMux {
	mux := http.NewServeMux()
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		r.URL.Scheme, r.URL.Host = "https", r.Host
		http.Redirect(w, r, r.URL.String(), http.StatusFound)
	})
	return mux
}

func newHTTPServer(port int, handler http.Handler) *http.Server {
	return &http.Server{
		Addr:         fmt.Sprintf(":%v", port),
		Handler:      handler,
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 5 * time.Second,
		IdleTimeout:  120 * time.Second,
	}
}
