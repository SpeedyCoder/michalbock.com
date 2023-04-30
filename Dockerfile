# --------------------------------------------------------------------------------------------------
# Build workspaces
# --------------------------------------------------------------------------------------------------
FROM node:18.16.0-alpine AS fe-build

WORKDIR /ui

ADD ./ui /ui

RUN npm install
RUN npm run build

FROM golang:alpine AS build

WORKDIR /build
ADD . /build

RUN CGO_ENABLED=0 go build -ldflags='-s -w' -o run-server .

# --------------------------------------------------------------------------------------------------
# Runtime
# --------------------------------------------------------------------------------------------------
FROM alpine:latest
RUN apk add --no-cache ca-certificates tzdata
COPY --from=build /build/run-server /bin/run-server
COPY --from=fe-build /ui/build /public

ENTRYPOINT [ "run-server" ]
