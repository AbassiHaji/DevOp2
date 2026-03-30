FROM ubuntu:latest

# Install dependencies
RUN apt-get update && \
    apt-get install -y curl gnupg2 ca-certificates nginx && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    rm -rf /var/lib/apt/lists/*

# Copy nginx config
COPY ./nginx.conf /etc/nginx/nginx.conf

# Copy frontend assets
COPY ./frontend /usr/share/nginx/html

# Copy backend code
COPY ./backend /app

WORKDIR /app

RUN npm install --production

EXPOSE 80 3000

# Start both nginx and node using a process manager
CMD ["npm", "start", "&&", "service", "nginx", "start" ]