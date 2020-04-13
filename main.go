package main

import (
	"context"
	"crypto/tls"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/SpeedyCoder/michalbock.com/internal/routes"
	"github.com/SpeedyCoder/michalbock.com/internal/store"
	_ "github.com/joho/godotenv/autoload"
	"github.com/urfave/cli"
	"golang.org/x/crypto/acme/autocert"
)

var (
	disableHTTPS bool
	httpPort     int
	staticDir    string
	certsDir     string
	storeFile    string
	password     string

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
		cli.StringFlag{
			Name:        "store-file",
			EnvVar:      "STORE_FILE",
			Value:       "/data/bbolt.db",
			Destination: &storeFile,
		},
		cli.StringFlag{
			Name:        "password",
			EnvVar:      "PASSWORD",
			FilePath:    "/data/password.txt",
			Required:    true,
			Destination: &password,
		},
	}
	app.Action = func(*cli.Context) error {
		db, err := store.New(storeFile)
		if err != nil {
			return err
		}
		defer db.Close()

		handler := routes.Handler(routes.Config{
			StaticDir: staticDir,
			Store:     db,
			Password:  []byte(password),
		})
		if disableHTTPS {
			return runInsecure(handler)
		}
		if err := os.MkdirAll(certsDir, os.ModePerm); err != nil {
			return err
		}
		return runSecure(handler)
	}

	if err := app.Run(os.Args); err != nil && err != http.ErrServerClosed {
		log.Fatal(err)
	}
}

func runSecure(handler http.Handler) error {
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
	server := newHTTPServer(":443", handler)
	server.TLSConfig = &tls.Config{GetCertificate: manager.GetCertificate}

	return server.ListenAndServeTLS("", "")
}

func runInsecure(handler http.Handler) error {
	log.Printf("Serving %s on HTTP port: %v\n", staticDir, httpPort)
	server := newHTTPServer(fmt.Sprintf(":%v", httpPort), handler)

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

func newHTTPServer(address string, handler http.Handler) *http.Server {
	return &http.Server{
		Addr:         address,
		Handler:      handler,
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 5 * time.Second,
		IdleTimeout:  120 * time.Second,
	}
}
