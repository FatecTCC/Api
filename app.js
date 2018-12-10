const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./controller/connection');
const Usuario = require('./models/usuario');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
var app = express();


/*If mongodb not connecting try to run:
- sudo service mongodb stop
- sudo service mongodb restart
- sudo chown -R <USERNAME> /data/db
*/

connection();

app.use(bodyParser.json()); // support json encoded bodies necessary to receive incoming post requests
var urlencodedParser = bodyParser.urlencoded({extended: false});

app.post('/arduino-api', urlencodedParser, function(req, res){
	try {
			console.log("ouvindo...");
			console.log(req.body);
			console.log("-------------------");
			if (req.body.userId.match(/^[0-9a-f]{24}$/i)) {
					console.log("entrou!");
					Usuario.findById(req.body.userId).then(function(usuario){
							console.log("Objeto Atual: ");
							console.log(usuario);
							console.log("Mudando valores do objeto anterior");
							horta = usuario.hortas.id(req.body.id);
							horta.userId = req.body.userId;
							horta.ph = req.body.ph;
							horta.data = req.body.data;
							horta.turbidez = req.body.turbidez;
							horta.vazao = req.body.vazao;
							horta.umidadeRelAr = req.body.umidadeRelAr;
							horta.temperatura = req.body.temperatura;
							horta.historico.push({
									ph: req.body.ph,
									data: req.body.data,
									turbidez: req.body.turbidez,
									vazao: req.body.vazao,
									umidadeRelAr: req.body.umidadeRelAr,
									temperatura: req.body.temperatura
							});
							console.log(horta);
							console.log("Substituindo dados....");
							try{
									usuario.save();
							}
							catch(e){
									console.log(e);
							}
					});
				}
	}
	catch(e){
			console.log("There was an error", e);
	}
});

app.listen(3004, function(){
  console.log("API is running...");
    
});