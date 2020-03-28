const knex = require('Knex');
const configuration = require('../../knexfile'); //importanto as configuracoes do arquivo raiz
//pq eu criei duas configuration uma para teste e outra para producao
const config = process.env.NODE_ENV=='test' ? configuration.test :configuration.development;  //VARIAVEIS AMBIENTE
const connection = knex(config);  //conexao de desenvolvimento

module.exports = connection;