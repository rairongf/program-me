import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Feedback from './Feedback';
import api from '../services/api';

export function FormDialog(props) {
  const [notaAvaliada, setNotaAvaliada] = useState('');
  const [comentario, setComentario] = useState('');
  const [username, setUsername] = useState(props.username);
  const [isNotaValida, setIsNotaValida] = useState(true);
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    props.no();
  };

  async function getNotaAtual() {
    let response = await api.get(`/workshop/avaliacao/${props.matricula}/${props.workshopId}`);
    let dados = response.data;
    const notaAtual = dados[0].NotaAvaliada;
    setNotaAvaliada(notaAtual);
  }

  function checkNota() {
    if(notaAvaliada > 100 || notaAvaliada < 0) {
      setIsNotaValida(false);
      setOpen(false);
    }
    else {
      setIsNotaValida(true);
      props.done(props.workshopId, notaAvaliada, comentario)
      setOpen(true);
    }
  }

  useEffect( () => {
    getNotaAtual();
  }) 

  const gridStyle = {
    display: 'grid',
    gridTemplateRows: '1fr 1fr',
    gridGap: '0',
  }

  return (
    <div>
      {open && <Feedback
                  handleClose = {handleClose}
                  action = 'submitEvaluation'
      />}
      <Dialog open={true} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{props.title} - Avaliação</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Olá {username}, avalie com carinho!
          </DialogContentText>
          <div style={gridStyle}>
            <TextField
                id="outlined-email-input"
                label="Nome Completo"
                className="text-input"
                type="text"
                margin="normal"
                variant="outlined"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required={true}
            />
            {!isNotaValida && <TextField
              id="outlined-number"
              error
              helperText = 'A nota deve ser entre 0 a 100'
              name='nota-input'
              label="Erro"
              value={notaAvaliada}
              onChange={e => setNotaAvaliada(e.target.value)}
              type="number"
              margin="normal"
              placeholder='0 ~ 100'
              variant="outlined"
              required={true}
            />}
            {isNotaValida && <TextField
            id="outlined-number"
            name='nota-input'
            label="Nota Avaliada"
            value={notaAvaliada}
            onChange={e => setNotaAvaliada(e.target.value)}
            type="number"
            margin="normal"
            placeholder='0 ~ 100'
            variant="outlined"
            required={true}
          />}
            <TextField
              id="outlined-email-input"
              label="Comentários"
              className="text-input"
              type="text"
              margin="normal"
              variant="outlined"
              value={comentario}
              onChange={e => setComentario(e.target.value)}
              required={false}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.no} color="primary">
            Cancelar
          </Button>
          <Button onClick={e => {
                                 checkNota()
                                }
                          } color="primary">
            Pronto
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default function ConfirmationDialog(props) {

  return (
    <div>
      <Dialog
        open={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Deseja mesmo {props.message}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.no} color="primary">
            Não
          </Button>
          <Button onClick={e => props.yes(props.id)} color="primary" autoFocus>
            Sim
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}