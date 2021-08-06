const customExpress = require('./config/customExpress')
const result = require('dotenv').config()

const conexao = require('./infraestrutura/conexao')
const Tabelas = require('./infraestrutura/tabelas')
//const fs = require('fs')

conexao.query('select 1 + 1', (err, rows) => { 
	if(err) throw err;

	console.log('Conectado no banco de dados com sucesso!')

	Tabelas.init(conexao)

	const app = customExpress()
	app.listen(process.env.SV_PORT,() =>{
		console.log('Servidor rodando na porta ' + process.env.SV_PORT)
	})
})
