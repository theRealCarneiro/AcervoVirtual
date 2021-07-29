const { criaAcervo } = require('../infraestrutura/tabelas')
const Admin = require ('../models/admin')

module.exports = app =>{

    app.post('/login', (req, res)=>{
        const user = req.body.username
        const pass = req.body.password
        
		Admin.login(user, pass, res)      
    })

    app.get('/administrador', (req,res)=>{
        Admin.listar(res)
    })

    app.post('/administrador', (req,res)=>{
        const trabalho = req.body
        
        Admin.adicionar(trabalho, res)      
    })

    app.get('/administrador/:id', (req,res) =>{
        
        const id = parseInt(req.params.id)
        Admin.buscaPorId(id, res)
    })

    app.patch('/administrador/:id', (req,res) =>{
        const id = parseInt(req.params.id)
        const valores = req.body

        Admin.editar(id, valores, res)
    })

    app.delete('/administrador/:id', (req,res) =>{
        const id = parseInt(req.params.id)
        Admin.excluir(id, res)
    })

}
