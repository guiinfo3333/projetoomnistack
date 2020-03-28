const express = require('express'); ///importando o express
const routes = require('./routes'); //como é um arquivo eu coloco .
const cors = require('cors');
const {errors} = require('celebrate');  //importando os erros do celebrate para mostrar de uma forma mais legal os erros
const app = express();
app.use(cors());
app.use(express.json());  //antes de todas as requisicoes o express converte o json em javascript


app.use(routes); //coloco as rotas para rodas
app.use(errors());
//app.listen(3333); //para minha aplicacao ouvir a porta 3333

module.exports = app;