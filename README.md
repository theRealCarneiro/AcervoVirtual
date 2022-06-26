# Acervo virtual
## Frontend
Gerado com [Angular CLI](https://github.com/angular/angular-cli) 11.2.8.

## Backend
Nodejs

## Setting up Backend in Local Environment

You should configure a local environment by creating a .env file (just copy paste the 
.env.sample file into .env and set the db credentials)

## DATABASE:  
    
- NODE_ENV
- PORT
- DB
- DB_HOST
- DB_PORT
- DB_USER
- DB_PASS

## Migration 
After setting up the database part, Now you need to run the migration file. 
#### Run your migration file
* `npm run migrate-latest`
#### Create new a migration file
* `npm run new-migration your-migration-file-name`

## Run Backend 
* `npm run start`

