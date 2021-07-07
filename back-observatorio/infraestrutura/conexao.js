const mysql = require('mysql')

//criando a conexao

const conexao = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '!@#QWEASD123qweasd',
    database: 'acervo'
})

module.exports = conexao
