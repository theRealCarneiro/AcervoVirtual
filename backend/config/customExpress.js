const express = require('express')
const consign = require('consign')
const bodyParser = require('body-parser')
const cors = require('cors')

module.exports = () =>{
	const app = express()
	app.use(cors())
	app.use(bodyParser.urlencoded({extended: true}))
	app.use(bodyParser.json())

	app.get('/', (req, res) =>{
		res.status(200).send('API acervo');
	})
    
	consign()
		.include('controllers')
		.into(app)
	return app
}
