import React, {useState} from 'react';
import './NavBar.css';

export default function NavBar({history}) {
    const [showDropdown, setShowDropdown] = useState(false);

    function openInscricoes() {
        history.push('/inscricoes');
    }
    function openAgenda() {
        history.push('/agenda');
    }
    function openCadastroAluno() {
        history.push('/cadastro');
    }
    function openLogin() {
        history.push('/');
    }
    
    return (
        <div className="NavBar">
            <ul>
                <li className="menu-icon">
                    <button onClick={() => setShowDropdown(!showDropdown)}>
                        <i className="fas fa-bars"></i>
                    </button>
                </li>
                <li className='buttons'>
                    <button onClick={openInscricoes}>Inscrições</button>
                    <button onClick={openAgenda}>Agenda</button>
                    <div className="user">
                        <button name="cadastrar" onClick={openCadastroAluno}>Cadastrar</button>
                        <button name="login" onClick={openLogin}>Login</button>
                    </div>
                </li>
            </ul>
            {showDropdown && 
                <div id='menu-dropdown'>
                    <button onClick={openInscricoes}>Inscrições</button>
                    <button onClick={openAgenda}>Agenda</button>
                    <button name="cadastrar" onClick={openCadastroAluno}>Cadastrar</button>
                    <button name="login" onClick={openLogin}>Login</button>
                </div>
            }
        </div>
    )
}