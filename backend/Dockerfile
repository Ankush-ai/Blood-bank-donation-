FROM php:8.2-apache

# Install PostgreSQL development dependencies and other required tools
RUN apt-get update && apt-get install -y \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Install and enable the pdo_pgsql extension
RUN docker-php-ext-install pdo pdo_pgsql

# Enable Apache rewrite module
RUN a2enmod rewrite

# Set the document root
# Render will serve from /var/www/html
ENV APACHE_DOCUMENT_ROOT /var/www/html

# Update the default apache site with the config we created.
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# Copy application files
COPY . /var/www/html/

# Expose port 80
EXPOSE 80
