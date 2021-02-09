FROM php:7.0-fpm
WORKDIR '/app'
COPY ./ ./
RUN docker-php-ext-install mysqli
RUN pecl install redis \
    && docker-php-ext-enable redis
RUN for i in *.php; do php -l $i; done
