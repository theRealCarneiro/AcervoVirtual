const customExpress = require('./config/customExpress')
const result = require('dotenv').config()

const conexao = require('./infraestrutura/conexao')
const Tabelas = require('./infraestrutura/tabelas')

conexao.query('select 1 + 1', (err, rows) => { 
    if(err){
	   console.log(err)
    }else{
	   console.log('conectado no banco de dados com sucesso!')

	   //cria tabelas (como um migrate)
	   Tabelas.init(conexao)

	   const app = customExpress()
	   app.listen(33001,()=>{
		  console.log('servidor rodando na porta 33001!')
	   })
    }
});
