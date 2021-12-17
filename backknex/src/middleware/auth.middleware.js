const jwt = require('jsonwebtoken');

const fs = require('fs');
const RSA_PUBLIC_KEY = fs.readFileSync(process.env.RSA_KEY_PUB);

class Auth {
	static verifyToken(req, res, next) {
		const token = req.headers.id;

		if (!token) return res.status(403).send({ status: 1, message: "Nenhum token encontrado" });

		try {
			jwt.verify(token, RSA_PUBLIC_KEY, { algorithms: ['RS256'] });
		}
		catch {
			return res.status(401).send({ status: 1, message: "Token inválido" });
		}
		return next();
	}
}

module.exports = Auth;

