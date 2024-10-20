#!/bin/bash

echo "Apply database migrations"
python manage.py migrate

echo "Starting server"
gunicorn movieh.wsgi:application --bind "0.0.0.0:8000"
