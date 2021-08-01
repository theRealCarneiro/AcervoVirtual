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

	buscaPorId(id, res){
		const sql = `SELECT * FROM trabalhos WHERE id = ?`
		conexao.query(sql, id, (erro, resultados) => { 
			if(erro) { 
				res.status(400).json(erro)
			} else {
				const trabalho = resultados[0]
				res.status(200).json(trabalho)
			}
		})
	}

}

module.exports = new Acervo
