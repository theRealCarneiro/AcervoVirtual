function newConnectionHandler(knex) {
    console.log(`[DB] New connection: ${knex.client.config.connection.host}: ${knex.client.database()}`);
}

module.exports = (event) => {
    event.on('new_connection', newConnectionHandler);
}

