import React,{useState,useEffect} from 'react';
import logoImg from '../../assets/logo.svg';
import {Link,useHistory} from 'react-router-dom';
import {FiPower,FiTrash2} from 'react-icons/fi';
import api from '../../services/api';
import './styles.css';

export default function Profile(){
const [incidents,setIncidents] = useState([]);
const OngId = localStorage.getItem('ongId');
const OngName = localStorage.getItem('ongName');
const history = useHistory();

useEffect(() => {
	api.get('profile',{
		headers:{
			Authorization: OngId,
		}

	}).then(response =>{
		setIncidents(response.data);  //seto no estado todos os incidentes para dps listá-los
	})  //e eu tenho q passar atraves do header qual organizacao esta logada
},[OngId]);   //é um relacao de dependencia as chaves indicam que todas vez q houver alteracao o use Effect vai lá
///===se o id da ong muda ele recalcula tudo com o useEffects

async function handleDeleteIncident(id){
try{
	await api.delete(`incidents/${id}`,{
		headers:{
		Authorization:OngId,
		}
	});  

	 //mas eu tenho que enviar o id da ong que ta deletando isso
//====dps de apagar eu tenho q atualiza automaticamente entao eu faco um filter
setIncidents(incidents.filter(incidents => incidents.id !==id));
//====================
}catch(err){
	alert('Erro ao deletar caso, tente novamente');
}
}

function handleLogout(){
	  localStorage.clear();
	  history.push('/');  //envia para a rota raiz
}
	return (


<div className="profile-container">
<header>
	<img src={logoImg} alt="Be the Hero" />
	<span>Bem vinda, {OngName}</span> 

	<Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
 	<button onClick={handleLogout} type="button">
<FiPower size={18} color="#E02041"/>
 	</button>
</header>

<h1>Casos Cadastrados</h1>
	<ul>
		{incidents.map(incidents =>(
        <li key={incidents.id}><strong>Caso:</strong>
		<p>{incidents.title}</p>

		<strong>DESCRIÇÃO :</strong>
		<p>{incidents.description}</p>

		<strong>VALOR:</strong>
		<p>{Intl.NumberFormat('pt-BR',{style:'currency',currency: 'BRL'}).format(incidents.value)}</p>
		<button onClick={()=> handleDeleteIncident(incidents.id)} type="button">
           <FiTrash2 size={20} color="#a8a8b3"/>
		</button>
		</li>
		

		))}
	</ul>
</div>

		);
}
