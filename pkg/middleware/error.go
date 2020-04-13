package middleware

import (
	"log"
	"net/http"
)

type ErrorHandleFunc func(w http.ResponseWriter, r *http.Request) error

func ErrorHandler(handler ErrorHandleFunc) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if err := handler(w, r); err != nil {
			log.Println(err)
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
	})
}
