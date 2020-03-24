const express = require('express');

const OngController = require('./controlers/OngController');
//const crypto = require('crypto');  //e usado para criptografia mas ai vai ser pra gerar o id
const IncidentController = require('./controlers/IncidentController');

const ProfileController = require('./controlers/ProfileController');
const SessionController = require('./controlers/SessionController');
const routes = express.Router();
routes.post('/sessions',SessionController.create);

routes.get('/ongs',OngController.index);

routes.post('/ongs',OngController.create);  //chamo o metodo la do controller
routes.get('/profile',ProfileController.index);
routes.get('/incidents',IncidentController.index);
routes.post('/incidents',IncidentController.create);
routes.delete('/incidents/:id',IncidentController.delete);  //agora tem que receber um parametro
module.exports = routes;