FROM php:7.0-fpm
WORKDIR '/app'
COPY ./ ./
RUN docker-php-ext-install mysqli
RUN for i in *.php; do php -l $i; done
