const Trabalho = require('../models/Trabalho');
const fs = require('fs')

module.exports = {
	//list: async (req, res) => {
		//const trabalhos = await Trabalho.list(res.locals.connection);
		//const videos = await Trabalho.listVideos(res.locals.connection)
		//if (!trabalhos) return res.status(404).send({
			//status: 1, message: 'Nenhum trabalho cadastrado'
		//});
		
		//console.log(trabalhos)
		//return res.send({ status: 0, trabalhos: trabalhos.concat(videos) });
	//},

	list: async (req, res) => {
		const trabalhos = JSON.parse(fs.readFileSync('/var/www/src/acervo/backend/src/database/seeds/trabalhos.json'));
		const videos = JSON.parse(fs.readFileSync('/var/www/src/acervo/backend/src/database/seeds/videos.json'));
		if (!trabalhos) return res.status(404).send({
			status: 1, message: 'Nenhum trabalho cadastrado'
		});
		
		return res.send({ status: 0, trabalhos: trabalhos.concat(videos) });
	},

	listVideos: async (req, res) => {
		const videos = JSON.parse(fs.readFileSync('/var/www/src/acervo/backend/src/database/seeds/videos.json'));
		if (!videos) return res.status(404).send({
			status: 1, message: 'Nenhum trabalho cadastrado'
		});
		
		return res.send({ status: 0, trabalhos: videos });
	},

	getById: async (req, res) => {
		const { id } = req.params;

		const trabalho = await Trabalho.getById(res.locals.connection, id);
		if (!trabalho) return res.status(404).send({
			status: 1, message: 'Trabalho não encontrado'
		});
		return res.send({ status: 0, trabalho: trabalho });
	},

	search: async (req, res) => {
		const { trabalho } = req.body;
		console.log(trabalho);

		const trabalhos = await Trabalho.search(res.locals.connection, trabalho);
		if (!trabalhos) return res.status(404).send({
			status: 1, message: 'Nenhum trabalho cadastrado'
		});
		return res.send({ status: 0, trabalhos: trabalhos });
	},

	create: async (req, res) => {
		const { trabalho } = req.body;

		if (!trabalho) return res.status(400).send({status: 1, message: 'Objeto \'trabalho\' ausente no corpo da requisição'});

        const { id, sucess, code, message } = await Trabalho.insert(res.locals.connection, trabalho);

        if (!sucess) return res.status(code).send({ status: 1, message: message || 'Não foi possível cadastrar o trabalho devido a um erro interno' });
		return res.status(201).send({ status: 0, id: id });
	},

	delete: async (req, res) => {
		const { id } = req.params;

		if (!id) return res.status(400).send({
			status: 1, message: 'Objeto \'id\' ausente nos parametros da requisição'
		});

		const deleted = await Trabalho.delete(res.locals.connection, id);
        if (!deleted) return res.status(401).send({ status: 1, message: 'ID inválido' });
		return res.status(200).send({ status: 0 });
	},

	update: async (req, res) => {
		const { id } = req.params;
		const { trabalho } = req.body;

        if (!trabalho) return res.status(400).send({ status: 1, message: 'Por favor, preencha o trabalho'});

		trabalho.id = id;

		const updated = await Trabalho.update(res.locals.connection, id, trabalho)
        if (!updated) return res.status(401).send({ status: 1, message: 'ID inválido' });
		return res.status(200).send({ status: 0 });
	},

    login: async (req, res) => {
        const { trabalho, senha } = req.body;

        if (!trabalho) return res.status(400).send({ status: 1, message: 'Por favor, preencha o trabalho'});
        if (!senha) return res.status(400).send({ status: 1, message: 'Por favor, preencha a senha' });
        
        const trabalho_objeto = await Trabalho.getByTrabalho(res.locals.connection, trabalho);
        if (!trabalho_objeto) return res.status(401).send({ status: 1, message: 'Usuário incorreto' });

        const { success, token } = LoginService(trabalho_objeto, senha);
        if (!success) return res.status(401).send({ status: 1, message: 'Senha incorreta' });

		return res.status(200).send({ status: 0, token: token, trabalho: trabalho });
    }
}

