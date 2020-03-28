const generateUniqueId = require('../utils/generateUniqueId');
const connection = require('../database/connection');
module.exports ={

async index(request,response){
const ongs = await connection('ongs').select('*');

return response.json(ongs);
},
async create(request,response){
	const {name,email,whatsapp,city,uf} = request.body; //uma variavel para cada dado da requisicao
	const id = generateUniqueId();
//console.log(data);

await connection('ongs').insert({
	id,
	name,
	email,
	whatsapp,
	city,
	uf,
})

return response.json({id}); //retorno apenas o id
}
};