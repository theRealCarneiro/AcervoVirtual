const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const fs = require('fs');
const RSA_PRIVATE_KEY = fs.readFileSync(process.env.RSA_KEY_PRIV);

module.exports = (usuario, enteredPassword) => {
	if(!usuario) return { success: false };
	if (bcrypt.compareSync(enteredPassword, usuario.senha)) {
		return {
			success: true,
			token: jwt.sign({}, RSA_PRIVATE_KEY,	
				{
					algorithm: 'RS256',
					expiresIn: 3600 * 24 * 14,
					subject: usuario.usuario,
				}
			)
		};
	}
	return { success: false };
}

