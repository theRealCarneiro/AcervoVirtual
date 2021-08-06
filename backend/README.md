# Backend

## Server

### Prepare the server
You should create a .env file containing mysql credentials, database, the RSA (RS256) key path and server port.

### Running the server
`npm start` or `node server.js` to run in foreground 
`npm run dev` or `nodemon app` to run dev server (self restarts when a file changes)

## Tools
### curldrive.sh
Download the database in google drive and convert in into a json file 

### jsondb.js
(Re)create bd.json cache file, run it with `node jsondb.js` or create a cron job like in the cron.example file
