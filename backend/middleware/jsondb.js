#!/usr/bin/env node

const dotenvDir = '/var/www/src/acervo/backend/.env';
const result = require('dotenv').config({path: dotenvDir});
const acervo = require('../models/acervo');
const fs = require('fs');

acervo.get(function(erro, result) {
	if(erro) throw erro;
	fs.writeFile(process.env.DB_JSON, JSON.stringify(result)
		.replace(/\:null/gi, "\:\"\""), (erro) =>{
		if(erro) throw err;
		console.log('JSON criado com sucesso em ' + process.env.DB_JSON);
		process.exit();
	})
})
