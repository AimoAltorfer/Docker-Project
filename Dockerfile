# Basis-Image: Nginx
FROM nginx:alpine

# HTML, CSS und JavaScript in den Nginx-Container kopieren
COPY index.html /usr/share/nginx/html/



# Port 80 freigeben
EXPOSE 80

# Nginx starten
CMD ["nginx", "-g", "daemon off;"]