FROM ubuntu:latest

RUN apt-get update && \
    apt-get install -y curl gnupg2 ca-certificates nginx && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    rm -rf /var/lib/apt/lists/*

COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./frontend /usr/share/nginx/html
COPY ./backend /app

WORKDIR /app

RUN npm install --production

EXPOSE 80 3000

CMD ["sh", "-c", "nginx && npm start"]