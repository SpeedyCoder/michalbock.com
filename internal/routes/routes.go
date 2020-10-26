package routes

import (
	"net/http"

	"github.com/SpeedyCoder/michalbock.com/internal/routes/filestore"
	"github.com/SpeedyCoder/michalbock.com/internal/store"
)

type Config struct {
	StaticDir string
	Store     store.Store
	Password  []byte
}

func Handler(c Config) http.Handler {
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
	mux.Handle("/", http.FileServer(http.Dir(c.StaticDir)))

	return mux
}
