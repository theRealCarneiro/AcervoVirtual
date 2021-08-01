const conexao = require('../infraestrutura/conexao')

class Admin{

	adicionar(trabalho, res){
		const sql = 'INSERT INTO trabalhos SET ?'
		conexao.query(sql, trabalho, (erro, resultados)=>{
			if (erro){
				res.status(400).json(erro)
			}else{
				res.status(201).json(resultados.insertId)
			}
		})
	}

	excluir(id, res){
		const sql = 'DELETE FROM trabalhos WHERE id=?'
		conexao.query(sql, id, (erro, resultados)=>{
			if (erro){
				res.status(400).json(erro)
			}else{
				res.status(200).json(resultados)
			}
		})
	}

	editar(id, valores, res){
		const sql = 'UPDATE trabalhos SET ? WHERE id=?'
		conexao.query(sql, [valores, id], (erro, resultados) =>{
			if (erro){
				res.status(400).json(erro)
			}else{
				res.status(200).json(resultados)
			}
		})
	}
}

module.exports = new Admin
