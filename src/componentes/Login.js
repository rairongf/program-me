import React, {useState} from "react"
import api from '../services/api';
import "./Login.css";
import TextField from '@material-ui/core/TextField';
import Feedback from './Feedback';

function Login({ history }) {
    const [matricula, setMatricula] = useState('');
    const [password, setPassword] = useState('');
    const [open, setOpen] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    };

    function openCadastroAluno() {
        history.push('/cadastro');
    }

    async function handleLogin(e) {
        e.preventDefault();

        const response = await api.get(`/${matricula}`);

        
        if (response.data.Senha === password) {
            if (matricula === '9999') {
                history.push(`/admin`);
            }
            else {
                history.push(`/agenda/${matricula}`);
            }
            
        }
        else {
            setOpen(true);
            setPassword('');
        }

    }

    return (
        <div className="Login">
            { open && 
                <Feedback 
                    handleClose = {handleClose} 
                    action = 'loginFailed'
            />}
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div className="input">
                    <div className="row">
                        <div className="col">
                            <TextField
                                id="outlined-email-input"
                                label="Matrícula"
                                className="user"
                                type="text"
                                autoComplete="usuário" 
                                margin="normal"
                                variant="outlined"
                                value={matricula}
                                onChange={e => setMatricula(e.target.value)}
                                required={true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <TextField
                                id="outlined-password-input"
                                label="Senha"
                                className="senha"
                                type="password"
                                autoComplete="current-password"
                                margin="normal"
                                variant="outlined"
                                required={true}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <input type="button" value="Cadastrar" onClick={openCadastroAluno}></input>
                <input type="submit" value="Entrar"></input>
            </form>
        </div>
    )
}

export default Login