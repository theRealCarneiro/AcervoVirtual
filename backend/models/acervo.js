const conexao = require('../infraestrutura/conexao')

module.exports = {
	get: function(result) {
		const sql = 'SELECT * FROM trabalhos'
		conexao.query(sql, result);
	},

	getById: function(id, result) {
		const sql = 'SELECT * FROM trabalhos WHERE id = ?'
		conexao.query(sql, id, result);
	}
}
