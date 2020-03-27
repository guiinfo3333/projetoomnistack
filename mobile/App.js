import React from 'react';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import Routes from './src/routes';  //aqui eu chamo minhas rotas


//por padrao todos os elementos tem displa flex
//nao existe heranca no reaact native
export default function App() {
  return (
    	<Routes/>
  );
}

