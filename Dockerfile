# syntax=docker/dockerfile:1
FROM nginx:alpine

# Copy the static site into the default nginx HTML directory
COPY ./ /usr/share/nginx/html

# Expose port 80 (nginx default)
EXPOSE 80
