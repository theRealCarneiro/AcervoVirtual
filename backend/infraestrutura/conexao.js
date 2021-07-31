const mysql = require('mysql')

//criando a conexao
const conexao = mysql.createPool({
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,       
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_TABLE
})

module.exports = conexao
