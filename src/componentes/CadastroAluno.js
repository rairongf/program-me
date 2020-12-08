import React, {useState} from "react"
import api from '../services/api'
import "./CadastroAluno.css"
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Feedback from './Feedback';

export default function CadastroAluno({ history }) {
    const [cadastro, setCadastro] = useState([]);
    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');
    const [email, setEmail] = useState('');
    const [matricula, setMatricula] = useState('');
    const [open, setOpen] = useState(false);
    const [state, setState] = useState({
        checkedG: false
    });
    
    const handleChange = name => event => {
        setState({ ...state, [name]: event.target.checked });
    };

    const OrangeCheckbox = withStyles({
        root: {
          color: orange[400],
          '&$checked': {
            color: orange[600],
          },
        },
        checked: {},
      })(props => <Checkbox color="default" {...props} />);
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    };

    function openLogin() {
        history.push('/');
    }

    async function handleCadastro(e) {
        e.preventDefault()

        setCadastro([
            ...cadastro,
            { 
                nome: nome,
                senha: senha,
                email: email,
                matricula: matricula,
                aluno: state.checkedG
            }
        ])

        await api.post('/cadastro-aluno', { 
            Nome: nome,
            Email: email,
            Senha: senha,
            eh_Aluno: state.checkedG,
            Matricula: matricula
        });

        history.push('/'); 
    }

    return (
        <div className="CadastroAluno">
            <h1>Cadastro do Participante</h1>
            <form onSubmit={handleCadastro} method="post">
                <div className="input">
                    <div className="row">
                        <TextField
                            id="outlined-email-input"
                            label="Nome"
                            className="text-input"
                            type="text"
                            autoComplete="usuário"
                            margin="normal"
                            variant="outlined"
                            value={nome}
                            onChange={e => setNome(e.target.value)}
                            required={true}
                        />
                        <hr></hr>
                    </div>
                    <div className="row">
                        <TextField
                            id="outlined-email-input"
                            label="Senha"
                            className="text-input"
                            type="text"
                            autoComplete="usuário"
                            margin="normal"
                            variant="outlined"
                            value={senha}
                            onChange={e => setSenha(e.target.value)}
                            required={true}
                        />
                        <hr></hr>
                    </div>
                    <div className="row">
                        <TextField
                            id="outlined-email-input"
                            label="Email"
                            className="text-input"
                            type="text"
                            autoComplete="usuário"
                            margin="normal"
                            variant="outlined"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required={true}
                        />
                        <hr></hr>
                    </div>
                    <div className="row">
                        <TextField
                            id="outlined-email-input"
                            label="Matrícula"
                            className="text-input"
                            type="text"
                            autoComplete="usuário"
                            margin="normal"
                            variant="outlined"
                            value={matricula}
                            onChange={e => setMatricula(e.target.value)}
                            required={true}
                        />
                        <hr></hr>
                    </div>
                    <div className="row">
                        <FormControlLabel
                            control={
                            <OrangeCheckbox
                                checked={state.checkedG}
                                onChange={handleChange('checkedG')}
                                value="checkedG"
                            />
                            }
                            label="É aluno de C005?"
                        />
                    </div>
                    <div className='page-buttons'>
                        <input type='button' value='Voltar' name='openLogin' onClick={openLogin}></input>
                        <input type="submit" value="Pronto" name='pronto'></input>
                    </div>
                </div>
            </form>
        </div>
    )
}
