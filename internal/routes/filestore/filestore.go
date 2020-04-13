package filestore

import (
	"errors"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/SpeedyCoder/michalbock.com/internal/store"
	"github.com/SpeedyCoder/michalbock.com/pkg/middleware"
	"golang.org/x/crypto/bcrypt"
)

const maxMemoryBytes = 500 * 1024 * 1024

var errNoFileName = errors.New("no file name specified")

type Server struct {
	Store    store.Store
	Password []byte
}

func (s *Server) Handler() http.Handler {
	getHandler := http.StripPrefix("/files/", http.FileServer(&storeFileSystemAdapter{store: s.Store}))
	uploadHandler := middleware.ErrorHandler(s.fileUploadHandler())

	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case http.MethodGet:
			getHandler.ServeHTTP(w, r)
		case http.MethodPost:
			uploadHandler.ServeHTTP(w, r)
		default:
			http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		}
	})
}

func (s *Server) fileUploadHandler() middleware.ErrorHandleFunc {
	return func(w http.ResponseWriter, r *http.Request) error {
		if err := r.ParseMultipartForm(maxMemoryBytes); err != nil {
			return err
		}
		if err := bcrypt.CompareHashAndPassword(s.Password, []byte(r.FormValue("password"))); err != nil {
			return err
		}

		name := r.FormValue("name")
		if name == "" {
			return errNoFileName
		}
		file, _, err := r.FormFile("file")
		if err != nil {
			return err
		}
		defer file.Close()

		data, err := ioutil.ReadAll(file)
		if err != nil {
			return err
		}
		log.Printf("Saving file '%s' with size %v.", name, len(data))

		if err := s.Store.SaveFile(name, data); err != nil {
			return err
		}
		log.Printf("File '%s' was saved successfully.", name)

		http.Redirect(w, r, fmt.Sprintf("/files/%s", name), http.StatusSeeOther)
		return nil
	}
}
