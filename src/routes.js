import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Cadastro from './componentes/Admin/Cadastro';
import Admin from './componentes/Admin/Admin';
import Login from "./componentes/Login";
import Agenda from "./componentes/Agenda";
import CadastroAluno from "./componentes/CadastroAluno";
import Inscricao from './componentes/Inscricao';
import Workshop from './componentes/Admin/Workshop';
import Avaliacao from './componentes/Admin/Avaliacao';


export default function Routes() {
    return (
        <BrowserRouter>
            <Route path='/' exact component={Login}/>
            <Route path='/inscricoes/:matricula' component={Inscricao}/>
            <Route path='/cadastro' component={CadastroAluno}/>
            <Route path='/agenda/:matricula' component={Agenda}/>
            <Route path='/admin' exact component={Admin}/>
            <Route path='/admin/cadastro' component={Cadastro}/>
            <Route path='/admin/workshop' component={Workshop}/>
            <Route path='/admin/avaliacao' component={Avaliacao}/>
        </BrowserRouter>
    );
}