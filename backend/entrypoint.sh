#!/bin/sh

echo "Esperando a PostgreSQL..."

while ! nc -z "$DB_HOST" "$DB_PORT"; do
  sleep 1
done

echo "PostgreSQL disponible."

echo "Ejecutando migraciones..."
python manage.py makemigrations
python manage.py migrate

echo "Iniciando servidor Django..."
python manage.py runserver 0.0.0.0:8000