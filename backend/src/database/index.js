const knex = require('knex');
const dbconfig = require('../../knexfile');
const dbconnection = knex(dbconfig[process.env.NODE_ENV || 'development']);

const events = require('events')
const event = new events.EventEmitter();
require('./logQuery')(event);

module.exports.getConnection = () => {
    event.emit('new_connection', dbconnection);
    return dbconnection;
}
