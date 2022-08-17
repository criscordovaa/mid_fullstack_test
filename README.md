# Mid Fullstack Project
## Description
This example provide a basic user login developed with Angular 8, Laravel 8 and MySQL. 
Communication by API based on access tokens managed by passport library. 
It was attached docker compose tool for running containers to build and deploy locally the project example.

## Requirements
- Node 14 or greater.
- npm.
- Docker.
- Docker compose.
- Bash for execute sh files.
- Release local ports 8001 and 3000.

## Project Structure
In folder /Backend can find all laravel project files.
In folder /Frontend can find all Angular project files.


## 1. Set Environments Variables
### Backend
1. Clone file ***.env.example*** to a new one named ***.env***
2. Fill variables on ***.env*** with provided information
```
DB_CONNECTION=mysql
DB_HOST=database
DB_PORT=3306
DB_DATABASE=mid_fullstack_test
DB_USERNAME=docker
DB_PASSWORD=docker
```

### Frontend
Environments on angular project can found inside folder ***Frontend/src/environments***
currently no needed to change.

## 2.- Build projects
### Backend
Doesn't need to build anything.

### Frontend
1. Install dependencies for the project.
2. Run command `npm run build`.
3. Wait it for building files.

## 3. Build Containers

1. Execute command `docker-compose build` for building images.
2. Execute command `docker-compose up` (This will cause display into your cli all log process of each container, if you want to run as background task use option `-d`).
3. MySQL container needs to wait around 5 min. after container was started, because take time to create de default database. It's necessary to wait to go to the next step.

## 4. Configurations inside backend-server container.

Once the containers was ready and fully deployed, the next step is run migrations and seeds inside the backend container.
For that we need to execute sh files, situated inside ***Backend*** folder, ***php-artisan.sh*** and ***composer.sh***

1. Execute `sh composer.sh install` for install dependencies inside container.
2. Execute `sh php-artisan.sh key:generate`
   for fill environment variable `APP_KEY`.
3. Execute `sh php-artisan.sh config:cache` and `sh php-artisan.sh route:cache` for generate cache configuration and routes files inside container.
4. Execute `sh php-artisan.sh migrate --seed` for run seeds and migrations.
5. Execute `sh php-artisan.sh passport:install` for generate passport keys.
6. Execute `sh permission.sh` this is for prevent permission access denied on storage during apache (www-data) tries to access.

Once all, you can acces to your http://localhost:3000

***Enjoy!***
