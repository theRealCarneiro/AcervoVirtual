const User = require ('../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const fs = require('fs');
const RSA_PRIVATE_KEY = fs.readFileSync(process.env.RSA_KEY_PRIV);

module.exports = app =>{

	app.post('/login', (req, res)=>{
		const user = req.body.user;
		const password = req.body.password;
        
		User.login(user, function(erro, result) {
			if(erro || result[0].length == 0) res.sendStatus(401);
			bcrypt.compare(password, result[0].password, function(erro, result){
				if(erro) res.sendStatus(401);
				let token = jwt.sign({}, RSA_PRIVATE_KEY,	
					{
						algorithm: 'RS256',
						expiresIn: 3600 * 24 * 14, 
						subject: user
					}
				)
				res.status(200).json({success: true, token: token})
			})
		})
	})

	//app.post('/rg', (req, res)=>{
		//const user = req.body.user
		//const password = req.body.password
		//bcrypt.hash(password, 10, function(erro, hash) {
			//if(erro) throw erro;
			//User.register(user, hash, function(erro, result){
				//if(erro) throw erro;
				//res.status(201).json({success: true});
				//console.log(result);
			//});
		//})
	//});

}
