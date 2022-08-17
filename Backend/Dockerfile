FROM php:7.4-apache

RUN apt-get update && apt-get install -y \
    curl \
    g++ \
    git \
    libpq-dev \
    libbz2-dev \
    libfreetype6-dev \
    libicu-dev \
    libjpeg-dev \
    libmcrypt-dev \
    libreadline-dev \
    sudo \
    unzip \
    zip \
    libzip-dev \
    && rm -rf /var/lib/apt/list/*

RUN echo "ServerName laravel-mid_fullstack.local" >> /etc/apache2/apache2.conf

ENV APACHE_DOCUMENT_ROOT=/var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

RUN a2enmod rewrite headers

RUN mv "$PHP_INI_DIR/php.ini-development" "$PHP_INI_DIR/php.ini"

RUN docker-php-ext-install \
            bcmath \
            bz2 \
            calendar \
            iconv \
            intl \
            opcache \
            pdo \
            pdo_mysql \
            mysqli \
            gd \
            zip

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

RUN composer self-update

#ARG uid
RUN useradd -G www-data,root -u 1000 -d /home/devuser devuser
RUN mkdir -p /home/devuser/.composer && \
    chown -R devuser:devuser /home/devuser

WORKDIR "/var/www/html"
