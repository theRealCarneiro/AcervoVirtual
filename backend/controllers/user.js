const { criaAcervo } = require('../infraestrutura/tabelas')
const User = require ('../models/user')
const cookieParser = require('cookie-parser')

module.exports = app =>{
	app.use(cookieParser())

    app.post('/login', (req, res)=>{
        const user = req.body.user
        const password = req.body.password
        
		User.login(user, password, res)      
    })

    app.post('/auth', (req, res)=>{
		const token = req.body.id

		User.verifyToken(token, res)
    })

	app.post('/rg', (req, res)=>{
        const user = req.body.user
        const password = req.body.password
        
		User.createUser(user, password)      
    })

}
