const conexao = require('../infraestrutura/conexao')

module.exports = {
	add: function(trabalho, result) {
		const sql = 'INSERT INTO trabalhos SET ?'
		conexao.query(sql, trabalho, result);
	},

	delete: function(id, result) {
		const sql = 'DELETE FROM trabalhos WHERE id = ?'
		conexao.query(sql, id, result);
	},

	edit: function(id, valores, result){
		const sql = 'UPDATE trabalhos SET ? WHERE id = ?'
		conexao.query(sql, [valores, id], result);
	}
}
