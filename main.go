package main

import (
	"log"
	"net/http"
	"os"

	"github.com/SpeedyCoder/michalbock.com/internal/routes"
	"github.com/SpeedyCoder/michalbock.com/internal/store"
	"github.com/SpeedyCoder/michalbock.com/pkg/server"
	_ "github.com/joho/godotenv/autoload"
	"github.com/urfave/cli"
)

var (
	disableHTTPS bool
	httpPort     int
	staticDir    string
	certsDir     string
	storeFile    string
	password     string

	siteURLs = []string{
		"michalbock.com",
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

		s := &server.Server{
			Insecure: disableHTTPS,
			CertsDir: certsDir,
			SiteURLs: siteURLs,
			HTTPPort: httpPort,
		}
		return s.Run(routes.Handler(routes.Config{
			StaticDir: staticDir,
			Store:     db,
			Password:  []byte(password),
		}))
	}

	if err := app.Run(os.Args); err != nil && err != http.ErrServerClosed {
		log.Fatal(err)
	}
}
