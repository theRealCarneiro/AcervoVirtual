const Admin = require ('../models/admin');
const Acervo = require ('../models/acervo');
const auth = require("../middleware/auth");
const fs = require('fs');

//const jsonPath = ('./bd.json');
//const jsonPath = '/var/www/src/observatorio/frontend/src/assets/bd/bd.json'
const jsonPath = '/var/www/html/observatorio/assets/bd/bd.json';

module.exports = app =>{

	app.get('/admin/update_json', auth, (req, res) => {
		Acervo.get(function(erro, result) {
			if(erro) throw erro;
			fs.writeFile(jsonPath, JSON.stringify(result).replace(/\:null/gi, "\:\"\""), (erro) =>{
				if(erro) throw err;
				console.log('JSON criado com sucesso em: ' + jsonPath);
				res.status(201).send();
			})
		})
	})

	app.post('/admin', auth, (req, res)=>{
		const trabalho = req.body
		Admin.add(trabalho, function(erro, result){
			if(erro) throw erro;
			res.status(201).json(result.insertId);
		})
	})

	app.delete('/admin/:id', auth, (req,res) =>{
		const id = parseInt(req.params.id)
		Admin.delete(id, function(erro, result){
			if(erro) throw erro;
			res.status(200).json(result);
		})
	})

	app.patch('/admin/:id', auth, (req,res) =>{
		const id = parseInt(req.params.id)
		const trabalho = req.body
		Admin.edit(id, trabalho, function(erro, result){
			if(erro) throw erro;
			res.status(200).json(result);
		})
	})

}
