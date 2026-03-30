FROM nginx:latest
FROM node:latest

COPY ./nginx.conf /etc/nginx/nginx.conf

COPY ./frontend /usr/share/nginx/html

COPY ./backend /app

WORKDIR /app

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]

CMD ["nginx", "-g", "daemon off;"]