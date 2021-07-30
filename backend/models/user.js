const conexao = require('../infraestrutura/conexao')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')

class User{
	login(user, password, res){
        const sql = `SELECT * FROM usuarios WHERE user = ?`
       
        conexao.query(sql, user,(erro, resultados) => { 
			if(resultados.length == 0 || erro) { 
				res.status(401).json({success: false})
			} 
			else {
				//testa se a senha é válida
				bcrypt.compare(password, resultados[0].password, function(erro, result) { 
					if (erro || result == false){
						console.log('test')
						res.status(401).json({success: false})
					}
					else{
						let token = jwt.sign({ 
							user: user, 
							password: password },
							process.env.SECRET, {
								expiresIn: 60 // expires in 5min
						});
						console.log(token)
						res.cookie("id", token, {
							httpOnly:true, 
						});
						res.status(200).json({success: true})
					} 
				});
			}
        })
	}

	verifyToken(token, res){
		jwt.verify(token, process.env.SECRET, function(err, decoded) {
			if (err) {
				console.log('aff')
				return res.json({success: false})
			}
			res.status(200).json({success: true})
			
		})
	}

	createUser(user, password){
		bcrypt.hash(password, 10, function(err, hash) {
			const sql = `insert into usuarios (user,password) VALUES(?, ?)`
			conexao.query(sql, [user, hash], (erro, resultados)=>{
				if (erro){
					res.status(400).json(erro)
				}else{
					res.status(201).json(resultados.insertId)
				}
			})
		});
	}
}

module.exports = new User
