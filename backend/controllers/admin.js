const { criaAcervo } = require('../infraestrutura/tabelas')
const Admin = require ('../models/admin')
const auth = require("../middleware/auth");

module.exports = app =>{

	app.post('/administrador', auth, (req,res)=>{
		const trabalho = req.body
		Admin.adicionar(trabalho, res)      
	})

	app.patch('/administrador/:id', auth, (req,res) =>{
		const id = parseInt(req.params.id)
		const valores = req.body
		Admin.editar(id, valores, res)
	})

	app.delete('/administrador/:id', auth, (req,res) =>{
		const id = parseInt(req.params.id)
		Admin.excluir(id, res)
	})

}
