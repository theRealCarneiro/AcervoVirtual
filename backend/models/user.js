const conexao = require('../infraestrutura/conexao')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class User{
	login(user, password, res){
		const sql = `SELECT * FROM usuarios WHERE user = ?`
	 
		conexao.query(sql, user,(erro, resultados) => { 
			if(resultados.length == 0 || erro){ //testa se encontrou o user no bd 
				res.sendStatus(401);
			} 
			else {
				//testa se a senha é válida
				bcrypt.compare(password, resultados[0].password, function(erro, result){
					if (erro || result == false)
						res.sendStatus(401);
					else{
						console.log(user, 'logado com sucesso')
						let token = jwt.sign(
							{id: resultados[0].id},
							process.env.SECRET, 
							{
								expiresIn: 3600 * 24 * 14 // time to live em segundos
							}
						);
						res.status(200).json({success: true, token: token})
					} 
				});
			}
		})
	}

	createUser(user, password){
		bcrypt.hash(password, 10, function(err, hash) {
			const sql = `insert into usuarios (user,password) VALUES(?, ?)`
			conexao.query(sql, [user, hash], (erro, resultados)=>{
				if (erro)
					res.status(400).json(erro)
				else res.status(201).json({success: true})
			})
		});
	}

}

module.exports = new User
