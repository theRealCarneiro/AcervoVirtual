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

    app.get('/auth', (req, res)=>{
		const token = req.cookies.id

		User.verifyToken(token, res)
    })

    app.get('/loggout', (req, res)=>{
		res.cookie("id", null, {
			httpOnly:true, 
		});
		res.status(200).json({success: true})
    })

	app.post('/rg', (req, res)=>{
        const user = req.body.user
        const password = req.body.password
        
		User.createUser(user, password)      
    })

}
