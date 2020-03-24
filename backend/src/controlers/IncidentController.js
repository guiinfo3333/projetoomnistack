const connection = require('../database/connection');

module.exports={

	async index(request,response){
const {page = 1} = request.query;  //as querys sao os que vem dps do ?

const [count] = await connection('incidents').count(); //pega a quantidade de registros
const incidents = await connection('incidents')
.join('ongs','ongs.id','=','incidents.ong_id')  //usando chave estrangeira
.limit(5)
.offset((page -1 )* 5)  //e pra pular sempre os 5 primeiros registros para ter paginacao
.select([
	'incidents.*',  //da tabela incidentes eu quero tudo mas da ong so os campos especificos
	'ongs.name',
	'ongs.email',
	'ongs.whatsapp',
	'ongs.city',
	 'ongs.uf'
	]);

response.header('X-Total-Count',count['count(*)']); //eu mando a quantidade no cabeçário da resposta
return response.json(incidents);
	},
	async create(request,response){
		const{ title,description,value} = request.body;
         const ong_id = request.headers.authorization;  //pegando o id da ong que vem do cabecário da request
	
	const [id] = await connection('incidents').insert({
     title,
     description,
     value,
     ong_id,

	});
return response.json({id});
	},

	async delete(request,response){
		const{id} = request.params;   //pega o id que vem da requisicao
		const ong_id = request.headers.authorization;  //pega o id da ong pois eu preciso verificar se realmente esse caso foi cadastrado pela ong
	
	const incident = await connection('incidents')
	.where('id',id)
	.select('ong_id')
	.first();

	if (incident.ong_id!=ong_id) {   //se ong_id do incident for diferente do id logado
return response.status(401).json({error:'Operattion not permited.'}); //no authorizhed
	}

await  connection('incidents').where('id',id).delete();  //apaga o registro
return response.status(204).send(); //deu sucesso mas nao tem conteudo
	}
};