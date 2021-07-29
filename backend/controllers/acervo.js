const { criaAcervo } = require('../infraestrutura/tabelas')
const Acervo = require('../models/acervo')

module.exports = app =>{
    app.get('/acervo', (req, res)=>{
        Acervo.listarAcervo(res)
    })

}