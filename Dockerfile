# --------------------------------------------------------------------------------------------------
# Build workspace
# --------------------------------------------------------------------------------------------------
FROM golang:1.12-alpine AS build

ENV HUGO_VERSION=0.54.0
ENV HUGO_BINARY=hugo_${HUGO_VERSION}_linux-64bit

RUN apk update && apk add git

ADD https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/${HUGO_BINARY}.tar.gz /usr/local/
RUN tar xzf /usr/local/${HUGO_BINARY}.tar.gz -C /usr/local/bin/ \
	&& rm /usr/local/${HUGO_BINARY}.tar.gz

WORKDIR /build
ADD . /build

RUN git submodule update --init --recursive
RUN cd hugo && hugo
RUN CGO_ENABLED=0 go build -o run-server .

# --------------------------------------------------------------------------------------------------
# Runtime
# --------------------------------------------------------------------------------------------------
FROM alpine:3.9
RUN apk add --no-cache ca-certificates
COPY --from=build /build/run-server /bin/run-server
COPY --from=build /build/hugo/public /public

ENTRYPOINT [ "run-server" ]
CMD ["--root-dir=/public"]
