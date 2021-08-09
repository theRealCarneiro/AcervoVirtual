const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const cors = require('cors');
const result = require('dotenv').config();

const conexao = require('./infraestrutura/conexao');
const Tabelas = require('./infraestrutura/tabelas');

conexao.query('select 1 + 1', (err, rows) => { 
	if(err) throw err;

	console.log('Conectado no banco de dados com sucesso!');

	Tabelas.init(conexao);

	const app = express();
	app.use(cors());
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());

	app.get('/', (req, res) =>{
		res.send('API acervo');
	})
    
	consign()
		.include('controllers')
		.into(app)

	app.listen(process.env.SV_PORT,() =>{
		console.log('Servidor rodando na porta ' + process.env.SV_PORT);
	})
})
