const express = require('express');
const {celebrate,Segments,Joi}  = require('celebrate');  //para validacoes do celebrate
const OngController = require('./controlers/OngController');
//const crypto = require('crypto');  //e usado para criptografia mas ai vai ser pra gerar o id
const IncidentController = require('./controlers/IncidentController');

const ProfileController = require('./controlers/ProfileController');
const SessionController = require('./controlers/SessionController');
const routes = express.Router();
routes.post('/sessions',SessionController.create);

routes.get('/ongs',OngController.index);

/*
Query
Route
Body        com o celebrate eu posso pegar isto e fazer a verificacao

*/
routes.post('/ongs',celebrate({
[Segments.BODY]: Joi.object().keys({	
	name: Joi.string().required(),         //nome é uma string e é obrigatório
	email:Joi.string().required().email(),
	whatsapp:Joi.string().required().min(10).max(11),             //tem que ser numero e tem que ter o minimo 10 e maximo 11
	city:Joi.string().required(),
	uf:Joi.string().required().length(2),
})
}),OngController.create);  //chamo o metodo la do controller

//primeiro vai ter a validacao com o celebrate e depois eu vou pra rota
routes.get('/profile',celebrate({
	[Segments.HEADERS]:  Joi.object({
		authorization: Joi.string().required(),
}).unknown(),
}),ProfileController.index);



routes.get('/incidents',celebrate({
	[Segments.QUERY]: Joi.object().keys({       //a query é o atributo q é passado na url como parametro
		page: Joi.number()
})
}),IncidentController.index);


routes.post('/incidents',IncidentController.create);
routes.delete('/incidents/:id',celebrate({
	[Segments.PARAMS] : Joi.object().keys({
		id: Joi.number().required(),   //se eu passar um id q nao seja numero entao ele nao vai passar 
	})
}),IncidentController.delete);  //agora tem que receber um parametro
module.exports = routes;