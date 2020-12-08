import React, {useEffect,useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import api from '../services/api';
import CancelIcon from './assets/dislike.svg';
import Moment from 'react-moment';
import ConfirmationDialog from './Dialogs';
import {FormDialog} from './Dialogs';

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    margin: '10px',
    border: '1px solid grey',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function WorkshopCard(props) {
    const [workshopData, setWorkshopData] = useState({})
    const [openConfirmation, setOpenConfirmation] = useState(false)
    const [openEvaluation, setOpenEvaluation] = useState(false);

    function handleClose() {
        setOpenConfirmation(false);
        setOpenEvaluation(false);
    }

    function handleOpenConfirmation() {
        setOpenConfirmation(true);
    }

    function handleOpenEvaluation() {
        setOpenEvaluation(true);
    }

    useEffect( () => {

        const renderWorkshopCard = async() => {
            let workshopData = await api.get(`/workshop/${props.id}`)
            let realData = workshopData.data;
            
            setWorkshopData(
                {
                    NomeWorkshop: realData[0].NomeWorkshop,
                    DataMarcada: realData[0].DataMarcada,
                    Local: realData[0].Local,
                    Id: realData[0].Id,
                    LinkAvaliacao: realData[0].Avaliacao,
                }
            )
        }

        renderWorkshopCard();

    })

  const classes = useStyles();

  const avaliacaoButton = {
    color: '#a33b3b',
    padding: '6px',
    border: '1px solid #a33b3b',
    borderRadius: '4px',
    cursor: 'pointer',
    margin: '5px',
    width: '80px',
  }

  const actionsContainer = {
    justifyContent: 'space-between',
  }

  return (
    <Card className={classes.card}>
      {openConfirmation && <ConfirmationDialog
        title = {workshopData.NomeWorkshop}
        yes = {props.cancel}
        no = {handleClose}
        id = {workshopData.Id}
        message = 'cancelar sua inscrição'
      /> }
      {openEvaluation && <FormDialog
        title = {workshopData.NomeWorkshop}
        no = {handleClose}
        done = {props.avaliacao}
        username = {props.username}
        workshopId = {workshopData.Id}
        matricula = {props.matricula}
      /> }
      <CardContent>
        <Typography variant="h5" component="h2">
            {workshopData.NomeWorkshop}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
            {workshopData.Local}
        </Typography>
        <Typography variant="body1" component="p">
            {`Data: `} 
            <Moment 
                interval={0} 
                format='DD/MM'
                >{workshopData.DataMarcada}
            </Moment>
            <br />
            {`Hora: `}
            <Moment 
                interval={0} 
                format='HH:mm'
                >{workshopData.DataMarcada}
            </Moment>
        </Typography>
      </CardContent>
      <CardActions style={actionsContainer}>
        <Button
            className='cancel-button' 
            size="small"
            onClick={handleOpenConfirmation}>
            <img src = {CancelIcon}
                 alt='Cancelar'></img>
        </Button>
        {/* <Button name = 'Avaliar com link'
                style={avaliacaoButton}>       
                <a  style={{textDecoration: 'none', color: '#a33b3b'}}
                    target='_blank'
                    href={workshopData.LinkAvaliacao}>Avaliar
                </a>
        </Button> */}
        <Button name = 'Avaliar com link'
                style={avaliacaoButton}
                onClick={handleOpenEvaluation}>Avaliar</Button>
      </CardActions>
    </Card>
  );
}