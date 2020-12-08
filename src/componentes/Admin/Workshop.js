import React, {useState} from "react"
import "./Cadastro.css"
import api from '../../services/api';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import {MySnackbarContentWrapper} from '../Snackbar';
import Snackbar from '@material-ui/core/Snackbar';

function Workshop({history}) {
    const [nome, setNome] = useState('');
    const [local, setLocal] = useState('');
    const [selectedDate, handleDateChange] = useState(new Date());
    const [id, setId] = useState(0);
    const [buscou, setBuscou] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [dropdown, setDropdown] = useState([]);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [title, setTitle] = useState('');
    const [avaliacao, setAvaliacao] = useState('');

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    };

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

    async function getDadosFromWorkshop(name) {
        const response = await api.get(`/admin/load-workshop/${name}`)

        setNome(response.data.NomeWorkshop);
        setLocal(response.data.Local);
        handleDateChange(new Date(response.data.DataMarcada));
        setId(response.data.Id);
        setTitle(response.data.NomeWorkshop);
        setAvaliacao(response.data.Avaliacao);
        
        setBuscou(false);
        setLoaded(true);
    }

    async function deleteWorkshop(id) {
        await api.delete(`/workshop/delete/${id}`)

        setMessage('Workshop deletado!')
        setOpen(true);
        setLoaded(false);

        setNome('');
        setLocal('');
        handleDateChange(new Date());
        setId(0);
        setAvaliacao('');
    }

    function openAdminHUB() {
        history.push('/admin');
    }

    async function handleSubmit(e) {
        e.preventDefault();

        await api.put('/admin/update-workshop', {
            NomeWorkshop: nome,
            DataMarcada: 
            `${selectedDate.getFullYear()}-${selectedDate.getMonth()+1}-${selectedDate.getDate()} ${selectedDate.getHours()}:${selectedDate.getMinutes()}`,
            Local: local,
            Id: id,
            Avaliacao: avaliacao,
        })

        setOpen(true);
        setMessage('Workshop atualizado!')
    }
    
        return (
            <div className="Cadastro">
                <Snackbar
                    anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                    }}
                    open={open}
                    autoHideDuration={4000}
                    onClose={handleClose}
                >
                    <MySnackbarContentWrapper
                    onClose={handleClose}
                    variant="success"
                    message={message}
                    />
                </Snackbar>
                { nome && <h1>Workshop {title}</h1> }
                <div className='dropdown-button'>
                    <button 
                        name='selecionaWorkshop' 
                        onClick={loadWorkshops}
                    >Selecionar Workshop</button>
                </div>
                { buscou && <div className='workshops-dropdown'>{dropdown.Workshops}</div>}
                { loaded && <div className='buttons-container'>
                                <button name='excluir' onClick={e => deleteWorkshop(id)}>Excluir</button>
                            </div>
                }
                <form onSubmit={handleSubmit}>
                    <div className="input">
                        <div className="row">
                            <div className="col">
                                <TextField
                                    id="outlined-email-input"
                                    label="Nome do Workshop"
                                    className="text-input"
                                    type="text"
                                    autoComplete="usuário"
                                    margin="normal"
                                    variant="outlined"
                                    value={nome}
                                    onChange={e => setNome(e.target.value)}
                                    required={true}
                                />
                            </div>
                        </div>
                        <hr></hr>
                        <div className="row">
                            <div className="col-datetime">
                                <label>Data*</label>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        margin="normal"
                                        format="dd/MM/yyyy"
                                        value={selectedDate}
                                        onChange={date => handleDateChange(date)}
                                    />
                                </MuiPickersUtilsProvider>
                            </div>
                        </div>
                        <hr></hr>
                        <div className="row">
                            <div className="col-datetime">
                                <label>Horário*</label>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardTimePicker
                                        margin="normal"
                                        ampm={false}
                                        value={selectedDate}
                                        onChange={date => handleDateChange(date)}
                                    />
                                </MuiPickersUtilsProvider>
                            </div>
                        </div>
                        <hr></hr>
                        <div className="row">
                            <div className="col">
                                <TextField
                                    id="outlined-email-input"
                                    label="Local"
                                    className="text-input"
                                    type="text"
                                    autoComplete="usuário"
                                    margin="normal"
                                    variant="outlined"
                                    value={local}
                                    onChange={e => setLocal(e.target.value)}
                                    required={true}
                                />
                            </div>
                        </div>
                        <hr></hr>
                        <div className="row">
                            <div className="col">
                                <TextField
                                    id="outlined-email-input"
                                    label="Link de Avaliação"
                                    className="text-input"
                                    type="text"
                                    autoComplete="usuário"
                                    margin="normal"
                                    variant="outlined"
                                    value={avaliacao}
                                    onChange={e => setAvaliacao(e.target.value)}
                                    required={false}
                                    title='http//... '
                                />
                            </div>
                        </div>
                        <hr></hr>
                        <div className='footer-buttons'>
                            <button name='voltar' onClick={openAdminHUB}>Voltar</button>
                            <input type="submit" value="Pronto"></input>
                        </div>
                    </div>
                </form>
            </div>
        )
}

export default Workshop