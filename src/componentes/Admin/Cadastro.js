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

function Cadastro({history}) {
    const [workshop, setWorkshop] = useState([]);
    const [nome, setNome] = useState('');
    const [local, setLocal] = useState('');
    const [selectedDate, handleDateChange] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [avaliacao, setAvaliacao] = useState('');

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    };

    function openAdminHUB() {
        history.push('/admin');
    }

    async function handleSubmit(e) {
        e.preventDefault();

        setWorkshop([...workshop, {
            nome: nome,
            data: {
                dia: selectedDate.getDate(),
                mes: selectedDate.getMonth() + 1
            },
            horario: {
                hora: selectedDate.getHours(),
                minuto: selectedDate.getMinutes()
            },
            local: local,
            linkAvaliacao: avaliacao,
        }]);

        await api.post('/admin/cadastro-workshop', {
            NomeWorkshop: nome,
            DataMarcada: 
            `${selectedDate.getFullYear()}-${selectedDate.getMonth()+1}-${selectedDate.getDate()} ${selectedDate.getHours()}:${selectedDate.getMinutes()}`,
            Local: local,
            //Avaliacao: avaliacao,
        })

        setOpen(true);

    }
    
        return (
            <>
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
                    message="Workshop cadastrado!"
                    />
                </Snackbar>
                <h1>Cadastro de Workshop</h1>
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
                                        minDate={new Date()}
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
            </>
        )
}

export default Cadastro