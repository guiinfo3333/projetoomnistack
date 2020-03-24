const connection = require('../database/connection');


module.exports={
	async create(request,response){  //verificiar se a ong realmente exisite
const {id} = request.body;

const ong = await connection('ongs')
	.where('id',id)
	.select('name')                //Pego apenas o nome
	.first();

	if (!ong) {
		return response.status(400).json({error: 'No Song found with this ID'});  //se nao tiver manda uma bad request
	}

return response.json(ong);
	}
}
