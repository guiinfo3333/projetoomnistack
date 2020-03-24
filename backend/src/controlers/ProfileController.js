const connection = require('../database/connection');

module.exports={  //como encheu os metodos la essa profile vai apenas listar os casos especificos

	async index(request,response){  //passa o id da ong atraves do headers e puxa os casos
		const ong_id = request.headers.authorization;

        const incidents = await connection('incidents')
        .where('ong_id',ong_id)
        .select('*');

        return response.json(incidents);
	}
}