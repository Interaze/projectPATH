FROM php:7.0-cli as builder
WORKDIR '/app'
COPY ./ ./
RUN for i in *.php; do php -l $i; done

FROM php:7.0-fpm
WORKDIR '/app'
COPY --from=builder /app /app
