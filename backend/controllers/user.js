const { criaAcervo } = require('../infraestrutura/tabelas')
const User = require ('../models/user')
const auth = require("../middleware/auth");

module.exports = app =>{

	app.post('/login', (req, res)=>{
		const user = req.body.user
		const password = req.body.password
        
		User.login(user, password, res)      
	})

	//app.post('/rg', (req, res)=>{
		//const user = req.body.user
		//const password = req.body.password
        
		//User.createUser(user, password)      
	//})

}
