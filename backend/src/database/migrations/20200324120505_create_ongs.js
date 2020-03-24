
exports.up = function(knex) { //metodo responsavel pela criacao da migration
 return knex.schema.createTable('ongs',function(table){
table.string('id').primary();
table.string('name').notNullable();
table.string('email').notNullable();
table.string('whatsapp').notNullable();
table.string('city').notNullable();
table.string('uf',2).notNullable(); //2 e o tamanho do texto
  });
};

exports.down = function(knex) {
 return knex.schema.dropTable('ongs'); //no caso se eu quiser apagar a tabela
};
