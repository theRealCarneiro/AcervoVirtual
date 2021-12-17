require('dotenv').config()
module.exports = {

  development: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB
    },
    pool: { min: 0, max: 7 },
    migrations: {
      tableName: 'knex_migrations',
      directory: `./src/database/migrations`
    }
  },

  production: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB
    },
    pool: { min: 0, max: 7 },
    migrations: {
      tableName: 'knex_migrations',
      directory: `./src/database/migrations`
    }
  }
};
