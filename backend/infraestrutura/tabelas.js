const { text } = require("body-parser");
const fs = require('fs');

class Tabelas {
	init(conexao){
		this.conexao = conexao;

		this.criaAcervo();
		this.criaUsers();
	}

	criaAcervo(){
		const sql = `CREATE TABLE IF NOT EXISTS trabalhos (
			id int NOT NULL AUTO_INCREMENT, 
			titulo text, autor text, 
			generoDocumental text, 
			tipoDocumental text,
			apresentacaoGrafica text,
			area text,
			assunto text,
			dataProducao text,
			instituicao text,
			ambito text,
			orientador text,
			recorteTemporal text,
			recorteEspacial text,
			local text,
			link text,PRIMARY KEY(id)
		);`
		this.conexao.query(sql, erro => {
			if (erro) throw(erro);
			console.log('Tabela trabalhos inicializada com sucesso');
		})
	}

	criaUsers(){
		const sql = `CREATE TABLE IF NOT EXISTS usuarios (
			id int NOT NULL AUTO_INCREMENT,
			user varchar(255),
			password varchar(255),
			PRIMARY KEY(id),
			UNIQUE KEY user (user)
		);`
		this.conexao.query(sql, erro => {
			if (erro) throw erro;
			console.log('Tabela users inicializada com sucesso');
		})
	}
}

module.exports = new Tabelas
