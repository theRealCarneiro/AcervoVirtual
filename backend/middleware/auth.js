const expressJwt = require('express-jwt')
const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
	const token = req.headers.id

	if (!token) {
		return res.status(403).send("A token is required for authentication");
	}

	jwt.verify(token, process.env.SECRET, function(err, decoded) {
		if (err) {
			return res.status(401).send("Invalid Token")
		}
	})
	return next()
}

module.exports = verifyToken;
