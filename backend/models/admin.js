const conexao = require('../infraestrutura/conexao')

class Admin{

    listar(res){
        const sql = 'SELECT * FROM trabalhos'
        conexao.query(sql, (erro, resultados)=>{
            if (erro){
                res.json(erro)
            }else{
                res.json(resultados)
            }
        })
    }

    adicionar(trabalho, res){
        //acho que aki sao as aspas diferentes
        const sql = 'INSERT INTO trabalhos SET ?'
        conexao.query(sql, trabalho, (erro, resultados)=>{
            if (erro){
                res.status(400).json(erro)
            }else{
                res.status(201).json(resultados.insertId)
                
            }
        })
    }

    buscaPorId(id, res){
        const sql = `SELECT * FROM trabalhos WHERE id=${id}`
       
        conexao.query(sql, (erro, resultados) => { 
            const trabalho = resultados[0]
            if(erro) { 
                res.status(400).json(erro)
            } else {
                res.status(200).json(trabalho)
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
    validarLogin( ){

    }
}

module.exports = new Admin
