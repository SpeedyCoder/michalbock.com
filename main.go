package main

import (
	"context"
	"crypto/tls"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	_ "github.com/joho/godotenv/autoload"
	"github.com/urfave/cli"
	"golang.org/x/crypto/acme/autocert"
)

var (
	disableHTTPS        bool
	httpPort            int
	staticDir, certsDir string

	siteURLs = map[string]bool{
		"michalbock.com": true,
	}
)

func main() {
	app := cli.NewApp()
	app.Flags = []cli.Flag{
		cli.IntFlag{
			Name:        "http-port",
			EnvVar:      "HTTP_PORT",
			Value:       80,
			Destination: &httpPort,
		},
		cli.StringFlag{
			Name:        "static-dir",
			EnvVar:      "STATIC_DIR",
			Value:       "/public",
			Destination: &staticDir,
		},
		cli.BoolFlag{
			Name:        "disable-https",
			EnvVar:      "DISABLE_HTTPS",
			Destination: &disableHTTPS,
		},
		cli.StringFlag{
			Name:        "certs-dir",
			EnvVar:      "CERTS_DIR",
			Value:       "/certs",
			Destination: &certsDir,
		},
	}
	app.Action = func(*cli.Context) error {
		if disableHTTPS {
			return runInsecure()
		}
		if err := os.MkdirAll(certsDir, os.ModePerm); err != nil {
			return err
		}
		return runSecure()
	}

	if err := app.Run(os.Args); err != nil && err != http.ErrServerClosed {
		log.Fatal(err)
	}
}

func runSecure() error {
	manager := &autocert.Manager{
		Prompt: autocert.AcceptTOS,
		HostPolicy: func(ctx context.Context, host string) error {
			if siteURLs[host] {
				return nil
			}
			return fmt.Errorf("acme/autocert: host not allowed: %s", host)
		},
		Cache: autocert.DirCache(certsDir),
	}
	go func() {
		log.Printf("Redirecting HTTP reuests from port %v to HTTPS\n", httpPort)
		server := newHTTPServer(fmt.Sprintf(":%v", httpPort), manager.HTTPHandler(newHTTPSRedirectServeMux()))

		if err := server.ListenAndServe(); err != nil {
			log.Println("HTTP redirect failed:", err)
		}
	}()

	log.Printf("Serving %s over HTTPS\n", staticDir)
	server := newHTTPServer(":443", newSiteServeMux())
	server.TLSConfig = &tls.Config{GetCertificate: manager.GetCertificate}

	return server.ListenAndServeTLS("", "")
}

func runInsecure() error {
	log.Printf("Serving %s on HTTP port: %v\n", staticDir, httpPort)
	server := newHTTPServer(fmt.Sprintf(":%v", httpPort), newSiteServeMux())

	return server.ListenAndServe()
}

func newSiteServeMux() *http.ServeMux {
	mux := http.NewServeMux()
	mux.HandleFunc("/medium", func(w http.ResponseWriter, r *http.Request) {
		http.Redirect(w, r, "https://medium.com/@michal.bock", http.StatusFound)
	})
	mux.HandleFunc("/goroutines", func(w http.ResponseWriter, r *http.Request) {
		http.Redirect(w, r, "https://medium.com/@michal.bock/managing-groups-of-gorutines-in-go-ee7523e3eaca?sk=edc0cd14d1c35312f82cf9ada2df0633", http.StatusFound)
	})
	mux.Handle("/", http.FileServer(http.Dir(staticDir)))

	return mux
}

func newHTTPSRedirectServeMux() *http.ServeMux {
	mux := http.NewServeMux()
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		r.URL.Scheme, r.URL.Host = "https", r.Host
		http.Redirect(w, r, r.URL.String(), http.StatusFound)
	})
	return mux
}

func newHTTPServer(address string, handler http.Handler) *http.Server {
	return &http.Server{
		Addr:         address,
		Handler:      handler,
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 5 * time.Second,
		IdleTimeout:  120 * time.Second,
	}
}
