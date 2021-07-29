const { text } = require("body-parser")

class Tabelas {
    init(conexao){
        this.conexao = conexao

        this.criaAcervo()
    }
    criaAcervo(){
        const sql = 'CREATE TABLE IF NOT EXISTS trabalhos (id int NOT NULL AUTO_INCREMENT, titulo text, autor text, generoDocumental text, tipoDocumental text, apresentacaoGrafica text, area text, assunto text, dataProducao text, instituicao text, ambito text, orientador text, recorteTemporal text, recorteEspacial text, local text, link text,PRIMARY KEY(id));'
        
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
