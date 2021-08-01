const customExpress = require('./config/customExpress')
const result = require('dotenv').config()

const conexao = require('./infraestrutura/conexao')
const Tabelas = require('./infraestrutura/tabelas')

const options = {
	port: 7777
}

conexao.query('select 1 + 1', (err, rows) => { 
	if(err){
		console.log(err)
	}else{
		console.log('conectado no banco de dados com sucesso!')

		Tabelas.init(conexao)

		const app = customExpress()
		app.listen(options.port,()=>{
			console.log('servidor rodando na porta ' + options.port)
		})
	}
})
