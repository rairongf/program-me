import React from "react"
import "./Admin.css"

function Admin({history}) {

    function openCadastro() {
        history.push('/admin/cadastro');
    }

    function openWorkshop() {
        history.push('/admin/workshop');
    }

    function openAvaliacao() {
        history.push('/admin/avaliacao');
    }

    function deslogar() {
        history.push('/');
    }

        return (
            <div className="Admin">
                <h1>Admin Hub</h1>
                <div className="table">
                    <div className="row">
                        <div>
                            <button name="cadastrar" onClick={openCadastro}>Cadastrar Workshop</button>
                        </div>
                        <div>
                            <button name="atualizar" onClick={openWorkshop}>Atualizar Workshop</button>
                        </div>
                    </div>
                    <div className="row">
                        <div>
                            <button name="avaliar" onClick={openAvaliacao}>Avaliações</button>
                        </div>
                    </div>
                </div>
                <div className='footer-buttons'>
                    <button name="sair" onClick={deslogar}>Sair</button>
                </div>
                
            </div>
        )
}

export default Admin

/* <div className="row">
                        <div>
                            <button name="avaliar" onClick={openAvaliacao}>Avaliar Workshop</button>
                        </div>
                    </div> */