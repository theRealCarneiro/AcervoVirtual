const conexao = require('../infraestrutura/conexao');

module.exports = {
	login: function(user, result){
		const sql = `SELECT password FROM usuarios WHERE user = ?`;
		conexao.query(sql, user, result);
	},

	register: function(user, password, result) {
		const sql = `insert into usuarios (user,password) VALUES(?, ?)`
		conexao.query(sql, [user, password], result);
	}
}
