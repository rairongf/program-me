import React, {useState, useEffect} from 'react';
import "./Cadastro.css"
import "./Avaliacao.css"
import api from '../../services/api';
import TextField from '@material-ui/core/TextField';
import Feedback from '../Feedback';

export default function Avaliacao({history}) {
    // Auxiliares
    const [open, setOpen] = useState(false);
    const [buscou, setBuscou] = useState(false);
    const [selected, setSelected] = useState(false);
    const [dropdown, setDropdown] = useState([]);
    // Workshop
    const [nome, setNome] = useState('');
    const [id, setId] = useState(0);
    // Avaliações
    const [avaliacoes, setAvaliacoes] = useState([]);

    /* async function getUsername(matricula) {

        const response = await api.get(`/${matricula}`);
        const dados = response.data;

        return dados.Nome;
    } */
    
    async function buscarAvaliacoes() {
        const response = await api.get(`/admin/avaliacoes-workshop/${id}`)
        const dados = response.data;

        if (dados.length === 0) {
            setAvaliacoes({
                Avaliacoes: <div className='user-row'>
                                Sem avaliações
                            </div>
            })

        }

        else setAvaliacoes({
            Avaliacoes: dados.map((dados,index) => {

                return (
                    <div className='user-row' key={index}>
                        <div className='nome-nota'>
                            <button>
                                {dados.Usuario_Matricula}
                            </button>
                            <TextField
                                id="outlined-email-input"
                                className='nota'
                                label="Nota Avaliada"
                                type="text"
                                margin="normal"
                                variant="outlined"
                                value={dados.NotaAvaliada}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </div>
                        <div className='comentario'>
                            <TextField
                                id="outlined-email-input"
                                label="Comentário"
                                className="text-input"
                                type="text"
                                margin="normal"
                                variant="outlined"
                                value={dados.Comentario}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </div>
                    </div>
                )
            }
            )
        });
    }

    useEffect( () => {

        buscarAvaliacoes();

    }, [id])

    function openAdminHUB() {
        history.push('/admin');
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    };

    async function getDadosFromWorkshop(name) {
        const response = await api.get(`/admin/load-workshop/${name}`)

        setNome(response.data.NomeWorkshop);
        setId(response.data.Id);

        setSelected(true);
    }

    async function loadWorkshops() {
        if (!buscou) {
            const response = await api.get(`/workshops/names`)
            setDropdown({
                Workshops: response.data.map((dados, index) => 
                    <button 
                        key={index}
                        value={dados.NomeWorkshop}
                        onClick={e => getDadosFromWorkshop(e.target.value)}
                        >{dados.NomeWorkshop}</button>
                    )
            })
            
            setBuscou(true);
        }
        else setBuscou(false);
        
    }

    return (
        <div className='Cadastro'>
            { nome && <h1>Workshop {nome}</h1> }
            { open && <Feedback handleClose = {handleClose} 
                                action = 'submitEvaluation'/>
            }
            <div className='dropdown-button'>
                <button 
                    name='selecionaWorkshop' 
                    onClick={loadWorkshops}
                >Selecionar Workshop</button>
            </div>
            { buscou && <div className='workshops-dropdown'>{dropdown.Workshops}</div>}
            { selected && 
                <div className='avaliacoes-list'>
                    {avaliacoes.Avaliacoes}
                </div>
            }
            <button className='back-button' onClick={openAdminHUB}>Voltar</button>
        </div>
    )
}
