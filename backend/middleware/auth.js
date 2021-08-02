const expressJwt = require('express-jwt')
const jwt = require('jsonwebtoken')

const fs = require('fs')
const RSA_PUBLIC_KEY = fs.readFileSync('./keys/jwtRS256.key')

const verifyToken = (req, res, next) => {
	const token = req.headers.id

	if (!token) {
		return res.status(403).send("A token is required for authentication");
	}

	try{
		jwt.verify(token, RSA_PUBLIC_KEY, { algorithms: ['RS256'] });
	}
	catch {
		return res.status(401).send("Invalid Token")
	}
	return next()
}

module.exports = verifyToken;
