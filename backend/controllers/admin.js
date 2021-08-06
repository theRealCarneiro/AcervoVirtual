const admin = require ('../models/admin');
const acervo = require ('../models/acervo');
const auth = require("../middleware/auth");
const fs = require('fs');

//const jsonPath = ('./bd.json');
//const jsonPath = '/var/www/src/observatorio/frontend/src/assets/bd/bd.json'
const jsonPath = '/var/www/html/observatorio/assets/bd/bd.json';

module.exports = app =>{

	app.get('/admin/update_json', auth, (req, res) => {
		acervo.get(function(erro, result) {
			if(erro) throw erro;
			fs.writeFile(jsonPath, JSON.stringify(result).replace(/\:null/gi, "\:\"\""), (erro) =>{
				if(erro) throw err;
				console.log('JSON criado com sucesso em: ' + jsonPath);
				res.status(200).send();
			})
		})
	})

	app.post('/admin', auth, (req, res)=>{
		const trabalho = req.body
		admin.add(trabalho, function(erro, result){
			if(erro) throw erro;
			res.status(200).json(result.insertId);
		})
	})

	app.delete('/admin/:id', auth, (req,res) =>{
		const id = parseInt(req.params.id)
		admin.delete(id, function(erro, result){
			if(erro) throw erro;
			res.status(200).json(result);
		})
	})

	app.patch('/admin/:id', auth, (req,res) =>{
		const id = parseInt(req.params.id)
		const trabalho = req.body
		admin.edit(id, trabalho, function(erro, result){
			if(erro) throw erro;
			res.status(200).json(result);
		})
	})

}
