package routes

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"path/filepath"

	"github.com/SpeedyCoder/michalbock.com/internal/routes/filestore"
	"github.com/SpeedyCoder/michalbock.com/internal/store"
)

type Config struct {
	StaticDir string
	Store     store.Store
	Password  []byte
}

func Handler(c Config) (http.Handler, error) {
	mux := http.NewServeMux()

	fileServer := &filestore.Server{
		Store:    c.Store,
		Password: c.Password,
	}
	mux.Handle("/files/", fileServer.Handler())

	mux.HandleFunc("/medium", func(w http.ResponseWriter, r *http.Request) {
		http.Redirect(w, r, "https://medium.com/@michal.bock", http.StatusFound)
	})
	mux.HandleFunc("/goroutines", func(w http.ResponseWriter, r *http.Request) {
		http.Redirect(w, r, "https://medium.com/@michal.bock/managing-groups-of-gorutines-in-go-ee7523e3eaca?sk=edc0cd14d1c35312f82cf9ada2df0633", http.StatusFound)
	})

	staticHandler, err := newStaticHandler(c)
	if err != nil {
		return nil, fmt.Errorf("failed to create static file handler: %w", err)
	}
	mux.Handle("/", staticHandler)

	return mux, nil
}

func newStaticHandler(c Config) (http.Handler, error) {
	f, err := os.Open(filepath.Join(c.StaticDir, "asset-manifest.json"))
	if err != nil {
		return nil, fmt.Errorf("failed to open manifest file: %w", err)
	}
	defer f.Close()

	var mf manifestFile

	if err = json.NewDecoder(f).Decode(&mf); err != nil {
		return nil, fmt.Errorf("failed to read manifest file: %w", err)
	}
	fsHandler := http.FileServer(http.Dir(c.StaticDir))
	allowedPaths := make(map[string]bool, len(mf.Files))
	for _, filePath := range mf.Files {
		allowedPaths[filePath] = true
	}

	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if !allowedPaths[r.URL.Path] {
			r.URL.Path = "/"
		}
		fsHandler.ServeHTTP(w, r)
	}), nil
}

type manifestFile struct {
	Files map[string]string `json:"files"`
}
