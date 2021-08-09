const Admin = require ('../models/admin');
const Acervo = require ('../models/acervo');
const auth = require("../middleware/auth");
const fs = require('fs');

module.exports = app =>{

	// atualiza o json
	app.get('/admin/update_json', auth, (req, res) => {
		Acervo.get(function(erro, result) {
			if(erro) throw erro;
			fs.writeFile(process.env.DB_JSON, JSON.stringify(result).replace(/\:null/gi, "\:\"\""), (erro) =>{
				if(erro) throw err;
				console.log('JSON criado com sucesso em: ' + process.env.DB_JSON);
				res.status(201).send();
			})
		})
	})

	// adiciona um trabalho
	app.post('/admin', auth, (req, res)=>{
		const trabalho = req.body
		Admin.add(trabalho, function(erro, result){
			if(erro) throw erro;
			res.status(201).json(result.insertId);
		})
	})

	// deleta um trabalho
	app.delete('/admin/:id', auth, (req,res) =>{
		const id = parseInt(req.params.id)
		Admin.delete(id, function(erro, result){
			if(erro) throw erro;
			res.status(200).json(result);
		})
	})

	// atualiza um trabalho
	app.patch('/admin/:id', auth, (req,res) =>{
		const id = parseInt(req.params.id)
		const trabalho = req.body
		Admin.edit(id, trabalho, function(erro, result){
			if(erro) throw erro;
			res.status(200).json(result);
		})
	})

}
