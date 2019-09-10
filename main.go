package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"

	"github.com/urfave/cli"
)

func main() {
	app := cli.NewApp()
	app.Flags = []cli.Flag{
		cli.IntFlag{
			Name:   "port",
			EnvVar: "HTTP_PORT",
			Value:  8080,
		},
		cli.StringFlag{
			Name:   "root-dir",
			EnvVar: "ROOT_DIR",
			Value:  "hugo/public",
		},
	}
	app.Action = run

	if err := app.Run(os.Args); err != nil && err != http.ErrServerClosed {
		log.Fatal(err)
	}
}

func run(c *cli.Context) error {
	mux := http.NewServeMux()
	mux.HandleFunc("/medium", func(w http.ResponseWriter, r *http.Request) {
		http.Redirect(w, r, "https://medium.com/@michal.bock", http.StatusFound)
	})
	mux.HandleFunc("/goroutines", func(w http.ResponseWriter, r *http.Request) {
		http.Redirect(w, r, "https://medium.com/@michal.bock/managing-groups-of-gorutines-in-go-ee7523e3eaca?sk=edc0cd14d1c35312f82cf9ada2df0633", http.StatusFound)
	})
	mux.Handle("/", http.FileServer(http.Dir(c.String("root-dir"))))

	server := &http.Server{
		Addr:    fmt.Sprintf(":%v", c.Int("port")),
		Handler: mux,
	}
	go func() {
		sCh := make(chan os.Signal, 1)
		signal.Notify(sCh, os.Interrupt, syscall.SIGTERM)
		<-sCh
		if err := server.Close(); err != nil {
			log.Printf("error when closing the server: %s", err)
		}
	}()

	log.Printf("Serving %s on HTTP port: %v\n", c.String("root-dir"), c.Int("port"))

	return server.ListenAndServe()
}
