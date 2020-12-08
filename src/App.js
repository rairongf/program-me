import React from 'react';
import './App.css';
import Routes from './routes'
import Descricao from './componentes/Descricao';
import programme from "./componentes/program-me.png"


function App() {

  return (
    <div className="App">
      <img alt="Program-me" src={programme}></img>
      {/* <NavBar/> */}
      <div className = 'container'>
        <Routes id='rota'/>
      </div>
      <Descricao/>
    </div>
  );
}

export default App;
