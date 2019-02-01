package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

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
	app.Action = func(c *cli.Context) error {
		http.Handle("/", http.FileServer(http.Dir(c.String("root-dir"))))
		log.Printf("Serving %s on HTTP port: %v\n", c.String("root-dir"), c.Int("port"))
		return http.ListenAndServe(fmt.Sprintf(":%v", c.Int("port")), nil)
	}
	if err := app.Run(os.Args); err != nil {
		log.Fatal(err)
	}
}
