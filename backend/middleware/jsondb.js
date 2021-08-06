const result = require('dotenv').config({path:'/var/www/src/observatorio/backend/.env'});
const acervo = require('../models/acervo');
const fs = require('fs');

//const jsonPath = ('./bd.json');
//const jsonPath = '/var/www/src/observatorio/frontend/src/assets/bd/bd.json'
const jsonPath = '/var/www/html/observatorio/assets/bd/bd.json'

acervo.get(function(erro, result) {
	if(erro) throw erro;
	fs.writeFile(jsonPath, JSON.stringify(result).replace(/\:null/gi, "\:\"\""), (erro) =>{
		if(erro) throw err;
		console.log('JSON criado com sucesso');
		process.exit();
	})
})
