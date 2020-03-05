import React, {useState} from 'react';
// Este arquivo era o App.js
/* 3 conceitos do REACT que fundamentam ele: 
- Componente : É uma função que retorna algum conteúdo HTML, CSS , JS !!! só isso (Componente sempre primeira letra maiuscula)
- ESTADO: Informações mantidas pelo componente (lembrar imutabilidade, nunca incrementa, sempre cria novas variaveis)
- Propriedade: Informações que o componente pai passa para o componente filhos
*/

//Componentes só podem estarem juntos com alguma tag agrupando-as, no react usa: <> </> 
// useState retorna um vetor , no qual usar [var1 , function] , para separar em 2 variaveis separadas
function App() {
  const [counter , setCounter] = useState(0) // começa a contar do 0
  function incrementCounter(){
    setCounter(counter + 1)
    
  }

  return (
    <> 
    <h1>Contador: {counter}</h1>
    <button onClick = {incrementCounter}>Incrementar</button>
    </>
  );
}

export default App;













/*
import Header from './Header'
//Componentes só podem estarem juntos com alguma tag agrupando-as, no react usa: <> </> 
function App() {
  return (
    <> 
      <Header title= "Titulo 1"/>
      <Header title= "Titulo 2"/>
      <Header title= "Titulo 3"/>
    </>
  );



  header.js

  import React from 'react'

function Header(props){ // sempre quiser referenciar um variavel no html precisa colcoar entre {} pro js entender
return <h1>{props.title}</h1>
}

export default Header

}*/