import axios from 'axios';
//baseURL é a parte da requisicao que sempre vai permanecer a mesma
const api = axios.create({
	baseURL: 'localhost:3333',
})
export default api;
