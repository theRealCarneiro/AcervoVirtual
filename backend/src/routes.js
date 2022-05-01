const express = require('express');
const routes = express.Router();

const auth = require('./middleware/auth.middleware');
const UsuarioController = require('./controllers/UsuarioController');
const TrabalhoController = require('./controllers/TrabalhoController');

routes.get('/', (req, res) => {
    res.send({ welcome: "Bem vindo ao backend do acervo virtual" });
});

// User routes
// Inserir um usuário
// Parâmetros: { usuario, senha } body
routes.post('/user', auth.verifyToken, UsuarioController.create);

// Delata um usuário
// Parâmetros: id params
routes.delete('/user/:id', auth.verifyToken, UsuarioController.delete);

// Atualiza um usuário
// Parâmetros: id params
routes.patch('/user/:id', auth.verifyToken, UsuarioController.update);

// Lista usuarios
routes.get('/user', auth.verifyToken, UsuarioController.list);
routes.get('/user/:id', auth.verifyToken, UsuarioController.getById);

// Autenticar um usuário
// Parâmetros: { usuario, senha } body
routes.put('/login', UsuarioController.login);

// Trabalhos routes
// Inserir um trabalho
// Parâmetros: user=object (body)
routes.post('/trabalhos', auth.verifyToken, TrabalhoController.create);

// Deleta um trabalho
// Parâmetros: id params
routes.delete('/trabalhos/:id', auth.verifyToken, TrabalhoController.delete);

// Atualiza um trabalho
// Parâmetros: id params
routes.patch('/trabalhos/:id', auth.verifyToken, TrabalhoController.update);

// Lista trabalhos
routes.get('/videos', TrabalhoController.listVideos);
routes.get('/trabalhos', TrabalhoController.list);
routes.get('/trabalhos/:id', TrabalhoController.getById);

// Pesquisa
// Parâmentros { trabalho } (body)
// Não precisa colocar todos os parametros
routes.put('/trabalhos', TrabalhoController.search);

module.exports = routes;
