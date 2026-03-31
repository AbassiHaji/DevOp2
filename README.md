#Run docker app
docker run -d -p 8080:80 -p 3000:3000 --name my-container my-app

#Stop all container
docker stop $(docker ps -q)

#Remove all container 
docker rm $(docker ps -aq)

#Remove all images
docker rmi $(docker images -q)

## Run Database Migration

To run the database migration (create or update the `user_detail` table) using Node.js, use the following command from the `backend` directory:

```bash
node migration.js
```

Make sure your environment variables and database configuration in `backend/config.json` are set correctly before running the migration.

Build and start containers
docker-compose up --build

Run in background (detached mode)
docker-compose up -d --build

docker-compose logs -f

Stop containers
docker-compose down

Rebuild only backend
docker-compose build backend
docker-compose up -d

1. Copy / Backup in Docker
🔹 A. Backup a Container (as image)

Convert a running container into an image:

docker commit <container_name> my-backup-image
Example:
docker commit app-backend backend-backup
This saves the current state of the container.

Copy files FROM container → host
docker cp <container>:/path/in/container /path/on/host
Example:
docker cp app-backend:/app ./backup-app

Copy files TO container
docker cp /path/on/host <container>:/path/in/container
Example:
docker cp ./config.json app-backend:/app/config.json