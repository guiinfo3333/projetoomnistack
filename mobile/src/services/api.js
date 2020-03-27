import axios from 'axios';
//tenho que colocar o ip pra dar certo da minha maquina pois esta rodando no celular externamente
const api = axios.create({
baseURL: 'http://192.168.11.10:3333',  //COLOCA O IP DA MAQUINA E A PORTA DA API

});

export default api;