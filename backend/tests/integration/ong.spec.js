const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');
describe('ONG',() =>{
	beforeEach( async() =>{
		await connection.migrate.rollback();  //para apagar as migrations toda vez q comecar
		await connection.migrate.latest();   //vai executar as nossas migrates
	});

	afterAll(()=>{
		connection.destroy();       
	})

	it('should be able to create a new ONG',async() =>{
		const response = await request(app)
		.post('/ongs')
		.send({
		name : "APAD",
		email : "contato@gmail.com",
		whatsapp : "54543434454",
		city:	"Rio do Sul",
		uf : "SC"
		})
	
	expect(response.body).toHaveProperty('id');  //e isso é criado no banco de dados teste
	expect(response.body.id).toHaveLength(8);
	})
});