const bcrypt = require('bcrypt');

const Usuario = require('../models/Usuario');
const LoginService = require('../services/LoginService');

module.exports = {
	list: async (req, res) => {
		const usuarios = await Usuario.list(res.locals.connection);
		if (!usuarios) return res.status(404).send({
			status: 1, message: 'Nenhum usuário cadastrado'
		});
		return res.send({ status: 0, usuarios: usuarios });
	},

	getById: async (req, res) => {
		const { id } = req.params;

		const usuario = await Usuario.getById(res.locals.connection, id);
		if (!usuario) return res.status(404).send({
			status: 1, message: 'Usuario não encontrado'
		});
		return res.send({ status: 0, usuario: usuario });
	},

	getByUsuario: async (req, res) => {
		const { nome_usuario } = req.params;

		const usuario = await Usuario.getById(res.local.connection, nome_usuario);
		if (!usuarios) return res.status(404).send({
			status: 1, message: 'Usuario não encontrado'
		});
		return res.send({ status: 0, usuario: usuario });
	},

	create: async (req, res) => {
		const { usuario } = req.body;

		if (!usuario) return res.status(400).send({
			status: 1, message: 'Objeto \'usuario\' ausente no corpo da requisição'
		});

		usuario.senha = bcrypt.hashSync(usuario.senha, 10);

        const { id, sucess, code, message } = await Usuario.insert(
			res.locals.connection, usuario
		);

        if (!sucess) return res.status(code).send({ status: 1, message: message || 'Não foi possível cadastrar o usuário devido a um erro interno' });
        return res.status(201).send({ status: 0 });
	},

	delete: async (req, res) => {
		const { id } = req.params;

		if (!id) return res.status(400).send({
			status: 1, message: 'Objeto \'id\' ausente nos parametros da requisição'
		});

		const deleted = await Usuario.delete(res.locals.connection, id);
        if (!deleted) return res.status(401).send({ status: 1, message: 'ID inválido' });
		return res.status(200).send({ status: 0 });
	},

	update: async (req, res) => {
		const { id } = req.params;
		const { usuario } = req.body;

        if (!usuario.usuario) return res.status(400).send({ status: 1, message: 'Por favor, preencha o usuario'});
        if (!usuario.senha) return res.status(400).send({ status: 1, message: 'Por favor, preencha a senha' });

		usuario.senha = bcrypt.hashSync(usuario.senha, 10);
		usuario.id = id;

		const updated = await Usuario.update(res.locals.connection, id, usuario)
        if (!updated) return res.status(401).send({ status: 1, message: 'ID inválido' });
		return res.status(200).send({ status: 0 });
	},

    login: async (req, res) => {
        const { usuario, senha } = req.body;

        if (!usuario) return res.status(400).send({ status: 1, message: 'Por favor, preencha o usuario'});
        if (!senha) return res.status(400).send({ status: 1, message: 'Por favor, preencha a senha' });
        
        const usuario_objeto = await Usuario.getByUsuario(res.locals.connection, usuario);
        if (!usuario_objeto) return res.status(401).send({ status: 1, message: 'Usuário incorreto' });

        const { success, token } = LoginService(usuario_objeto, senha);
        if (!success) return res.status(401).send({ status: 1, message: 'Senha incorreta' });

		return res.status(200).send({ status: 0, token: token, usuario: usuario });
    }
}
