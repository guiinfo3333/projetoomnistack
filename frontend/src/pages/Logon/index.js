import React,{useState} from 'react';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png'; //chamando a imagem
import {Link,useHistory} from 'react-router-dom';  //importando o componente link para nao recarregar a pag
import api from '../../services/api';
export default function Logon(){
  const [id,setId] = useState('');
  const history = useHistory();

  async function handleLogin(e){
    e.preventDefault();

    try{
      const response = await api.post('sessions',{id});
      //console.log(response.data.name);
      localStorage.setItem('ongId',id); //preciso ter disponivel o id e o nome do id para toda a aplicacao
      localStorage.setItem('ongName',response.data.name);
     history.push('/profile');  //redirecionando para a rota profile
     }catch(err){
      alert('Falha no login, tente novamente');
    }


  }
	return(
  <div className ="logon-container">

  	<section className ="form">
		<img src={logoImg} alt="Be The Hero"/>
 		<form onSubmit={handleLogin}>
          	<h1>Faça seu Logon</h1>

          	<input 
             placeholder="Sua ID"
             value={id}
             onChange={e => setId(e.target.value)}
             />
          	<button className="button" type="submit">Entrar</button>
          	<Link className="back-link" to="/register">Não tenho cadastro</Link>
 		</form>

  	</section>

  <img src={heroesImg} alt="Heroes"/>
  </div>
		
	);
}