FROM node:18-alpine

WORKDIR /app

COPY ./backend/package*.json ./
RUN npm install --production

COPY ./backend .

EXPOSE 3000

CMD ["sh", "-c", "sleep 10 && node migration.js && node app.js"]
