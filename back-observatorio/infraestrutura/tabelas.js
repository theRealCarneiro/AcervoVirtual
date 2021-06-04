const { text } = require("body-parser")

class Tabelas {
    init(conexao){
        this.conexao = conexao

        this.criaAcervo()
    }
    criaAcervo(){
        const sql = 'CREATE TABLE IF NOT EXISTS trabalhos (id int NOT NULL AUTO_INCREMENT, serie text, area text, grau text, titulo text, autor text, orientador text, tipo text, instituicao text, keyword text, data_producao text, data_topica text, recorte_temporal text, recorte_espacial text, dimensao text, genero_documental text, tipo_documental text, apresentacao_grafica text, assunto text, ambito text, notas text, PRIMARY KEY(id))'
        
        this.conexao.query(sql, erro => {
            if (erro){
                console.log(erro)
            }else{
                console.log('tabela criada com sucesso')
            }

        })
    }
}

module.exports = new Tabelas