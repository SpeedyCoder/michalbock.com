package filestore

import (
	"bytes"
	"errors"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/SpeedyCoder/michalbock.com/internal/store"
)

type storeFileSystemAdapter struct {
	store store.Store
}

func (fs *storeFileSystemAdapter) Open(name string) (http.File, error) {
	name = strings.TrimPrefix(name, "/")

	data, err := fs.store.ReadFile(name)
	if err != nil {
		return nil, err
	}
	return &inMemoryFile{
		name:   name,
		reader: bytes.NewReader(data),
	}, nil
}

// inMemoryFile implements the http.File interface
type inMemoryFile struct {
	name   string
	reader *bytes.Reader
}

func (f *inMemoryFile) Read(b []byte) (int, error) {
	return f.reader.Read(b)
}

func (f *inMemoryFile) Seek(offset int64, whence int) (int64, error) {
	return f.reader.Seek(offset, whence)
}

func (f *inMemoryFile) Stat() (os.FileInfo, error) {
	return &inMemoryFileInfo{f}, nil
}

func (f *inMemoryFile) Readdir(int) ([]os.FileInfo, error) {
	return nil, errors.New("not a directory")
}

func (f *inMemoryFile) Close() error {
	return nil
}

// inMemoryFileInfo implements os.FileInfo
type inMemoryFileInfo struct {
	file *inMemoryFile
}

func (s *inMemoryFileInfo) Name() string       { return s.file.name }
func (s *inMemoryFileInfo) Size() int64        { return s.file.reader.Size() }
func (s *inMemoryFileInfo) Mode() os.FileMode  { return os.ModeTemporary }
func (s *inMemoryFileInfo) ModTime() time.Time { return time.Time{} }
func (s *inMemoryFileInfo) IsDir() bool        { return false }
func (s *inMemoryFileInfo) Sys() interface{}   { return nil }
