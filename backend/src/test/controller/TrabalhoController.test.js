require('../../../node_modules/mysql2/node_modules/iconv-lite').encodingExists('foo');
const TrabalhoController = require('../../controllers/TrabalhoController');
require('dotenv').config({ path: '/var/www/src/acervo/backend/.env' })
const dbConnection = require('../../database/index');

test("Cria um trabalho e retorna o id", async () => {
	const mReq = { body: { trabalho: { titulo: "teste" } } };
	const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn().mockReturnThis(), locals: {} };
	mRes.locals.connection = dbConnection.getConnection();
	//jest.useFakeTimers()
	await TrabalhoController.create(mReq, mRes)
	expect(mRes.status).toHaveBeenCalledWith(201);
});

test("Cria um trabalho em branco", async () => {
	const mReq = { body: { trabalho: {} } };
	const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn().mockReturnThis(), locals: {} };
	mRes.locals.connection = dbConnection.getConnection();
	await TrabalhoController.create(mReq, mRes)
	expect(mRes.status).toHaveBeenCalledWith(201);
});

test("Cria um trabalho inválido com undefined", async () => {
	const mReq = { body: { trabalho: undefined } };
	const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn().mockReturnThis(), locals: {} };
	mRes.locals.connection = dbConnection.getConnection();
	await TrabalhoController.create(mReq, mRes)
	expect(mRes.status).toHaveBeenCalledWith(400);
});

test("Cria um trabalho com atributos inválidos", async () => {
	const mReq = { body: { trabalho: { nome: "reginaldo"} } };
	const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn().mockReturnThis(), locals: {} };
	mRes.locals.connection = dbConnection.getConnection();
	await TrabalhoController.create(mReq, mRes)
	expect(mRes.status).toHaveBeenCalledWith(500);
});

test("Deleta um trabalho com id válido", async () => {
	mock = jest.fn()
	const mRes = { status: jest.fn().mockReturnThis(), send: mock.mockReturnValue, locals: {} };
	mRes.locals.connection = dbConnection.getConnection();
	await TrabalhoController.list({}, mRes);
	trabalhos = mock().trabalhos;
	console.log(trabalhos[trabalhos.length - 1].id)
	const mReq = { params: { id: trabalhos[trabalhos.length - 1].id} };
	await TrabalhoController.delete(mReq, mRes);
	expect(mRes.status).toHaveBeenCalledWith(200);
});

test("Deleta um trabalho mas não inclui id", async () => {
	mock = jest.fn()
	const mRes = { status: jest.fn().mockReturnThis(), send: mock.mockReturnValue, locals: {} };
	const mReq = { params: { } };
	mRes.locals.connection = dbConnection.getConnection();
	await TrabalhoController.delete(mReq, mRes);
	expect(mRes.status).toHaveBeenCalledWith(400);
});

test("Deleta um trabalho com id inválido", async () => {
	mock = jest.fn()
	const mRes = { status: jest.fn().mockReturnThis(), send: mock.mockReturnValue, locals: {} };
	const mReq = { params: { id: 1000} };
	mRes.locals.connection = dbConnection.getConnection();
	await TrabalhoController.delete(mReq, mRes);
	expect(mRes.status).toHaveBeenCalledWith(401);
});

test("Deleta um trabalho com id inválido", async () => {
	mock = jest.fn()
	const mRes = { status: jest.fn().mockReturnThis(), send: mock.mockReturnValue, locals: {} };
	const mReq = { params: { id: 'a'} };
	mRes.locals.connection = dbConnection.getConnection();
	await TrabalhoController.delete(mReq, mRes);
	expect(mRes.status).toHaveBeenCalledWith(401);
});

test("Lista todos os trabalhos", async () => {
	mock = jest.fn()
	const mRes = { status: jest.fn().mockReturnThis(), send: mock.mockReturnValue, locals: {} };
	mRes.locals.connection = dbConnection.getConnection();
	await TrabalhoController.list({}, mRes);
	trabalhos = mock().trabalhos;
});

afterAll(done => {
	dbConnection.getConnection().destroy()
	done()
});
