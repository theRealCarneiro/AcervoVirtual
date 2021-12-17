# Backend

## Server

### Prepare the server
You should create a .env file containing mysql credentials, database, the RSA (RS256) key path and server port, use .env.example as a stating point

### Running the server
`npm start`

## Tools
### generate_rsa_key.sh
Generate RSA keys for jwt 

### curldrive.sh
Download the database in google drive and convert in into a json file 

### jsondb.js
(Re)create bd.json cache file, run it with `node jsondb.js` or create a cron job like in the cron.example file
