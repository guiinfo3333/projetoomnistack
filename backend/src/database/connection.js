const knex = require('Knex');
const configuration = require('../../knexfile'); //importanto as configuracoes do arquivo raiz


const connection = knex(configuration.development);  //conexao de desenvolvimento

module.exports = connection;