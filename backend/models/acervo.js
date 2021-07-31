const conexao = require('../infraestrutura/conexao')

class Acervo{
	listarAcervo(res){
		const sql = 'SELECT * FROM trabalhos'
		conexao.query(sql, (erro, resultados)=>{
			if (erro)
				res.json(erro)
			else
				res.json(resultados)
		})
	}
}

module.exports = new Acervo
