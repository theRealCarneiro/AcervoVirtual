const Acervo = require('../models/acervo')

module.exports = app =>{
	app.get('/acervo', (req, res) => {
		Acervo.get(function(erro, result) {
			if(erro) throw erro;
			res.status(200).json(result);
		})
	})

	app.get('/acervo/:id', (req, res) =>{
		const id = parseInt(req.params.id);
		Acervo.getById(id, function(erro, result) {
			if(erro) throw erro;
			res.status(200).json(result);
		})
	})
}
