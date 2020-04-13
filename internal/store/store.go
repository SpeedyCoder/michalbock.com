package store

import (
	"errors"

	bolt "go.etcd.io/bbolt"
)

var (
	// ErrNotFound signifies that the requested object was not found.
	ErrNotFound = errors.New("object not found")

	fileBucketName = []byte("FileBucket")
)

// Store is an interface for persisting data.
type Store interface {
	ReadFile(name string) ([]byte, error)
	SaveFile(name string, data []byte) error
	Close() error
}

// New returns new Store instance.
func New(dbPath string) (Store, error) {
	db, err := bolt.Open(dbPath, 0600, nil)
	if err != nil {
		return nil, err
	}
	s := &store{db: db}

	return s, s.init()
}

func (s *store) init() error {
	tx, err := s.db.Begin(true)
	if err != nil {
		return err
	}
	defer tx.Rollback()

	if _, err = tx.CreateBucketIfNotExists(fileBucketName); err != nil {
		return err
	}
	return tx.Commit()
}

type store struct {
	db *bolt.DB
}

func (s *store) ReadFile(name string) ([]byte, error) {
	var data []byte
	err := s.db.View(func(tx *bolt.Tx) error {
		b := tx.Bucket(fileBucketName)
		data = b.Get([]byte(name))

		return nil
	})
	if err == nil && data == nil {
		return nil, ErrNotFound
	}
	return data, err
}

func (s *store) SaveFile(name string, data []byte) error {
	return s.db.Update(func(tx *bolt.Tx) error {
		b := tx.Bucket(fileBucketName)
		return b.Put([]byte(name), data)
	})
}

func (s *store) Close() error {
	return s.db.Close()
}
