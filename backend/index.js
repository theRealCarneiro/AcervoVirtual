const customExpress = require('./config/customExpress')
const result = require('dotenv').config()

const conexao = require('./infraestrutura/conexao')
const Tabelas = require('./infraestrutura/tabelas')
const fs = require('fs')
//const https = require('https')

//var options = {
    //key: fs.readFileSync(process.env.SSL_KEY),
    //cert: fs.readFileSync(process.env.SSL_CERT),
//};

conexao.query('select 1 + 1', (err, rows) => { 
	if(err){
		console.log(err)
	}else{
		console.log('conectado no banco de dados com sucesso!')

		Tabelas.init(conexao)

		const app = customExpress()
		app.listen(process.env.SV_PORT,() =>{
			console.log('servidor rodando na porta ' + process.env.SV_PORT)
		})
	}
})
