import React, { useState, useEffect } from "react";
import Moment from 'react-moment';
import "./Inscricao.css";
import api from '../services/api';
import Feedback from './Feedback';

function Inscricao({history, match}) {
    const [workshops, setWorkshops] = useState([]);
    const [matricula, setMatricula] = useState(match.params.matricula);
    /* const [nomeDoUsuario, setNomeDoUsuario] = useState( async () => {
        const response = await api.get(`/${matricula}`);
        setNomeDoUsuario(response.data.Nome);
    } ); */
    const [open, setOpen] = useState(false);

    
    

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    };

    function openAgenda() {
        history.push(`/agenda/${matricula}`);
    }


    const inscricaoWorkshop = async (idOfWorkshop) => {
        try {
            await api.post('/inscricoes', {
                Usuario_Matricula: matricula,
                Workshop_Id: idOfWorkshop
            })
            
            await api.put(`/workshop/update/add/${idOfWorkshop}`)
            setWorkshops([])
            setOpen(true);
        } catch(e) {
            console.log(e)
        }
        
    }

    const renderWorkshops = async() => {
            
        try {
            let response = await api.get(`/workshops/available/${matricula}`);
            let dados = response.data;
            
            setWorkshops({
                Workshops: dados.map( (workshop, index) => {
                    if (workshop.Numero_Participantes === 22) {
                        return (
                            <div key={workshop.Id}>
                            <div className="row">
                                <div className="col-75">
                                    <div className="tooltip">
                                        <span className="info">
                                            <Moment 
                                                interval={0} 
                                                format='DD/MM HH:mm'
                                            >{workshop.DataMarcada}</Moment>
                                            {` | ${workshop.Local}`}
                                        </span>
                                        <i className="fas fa-info-circle"></i>
                                    </div>
                                    <label name="workshop">{workshop.NomeWorkshop} está esgotado</label>
                                </div>
                                <div className="col-25">
                                    <button 
                                        className="inscrever" 
                                        type="button"
                                        disabled={true}
                                        style={{cursor: 'not-allowed'}}>Inscrever</button>
                                </div>
                            </div>
                            <hr/>
                            </div>
                            )
                    }
                    
                    return (
                    <div key={workshop.Id}>
                    <div className="row">
                        <div className="col-75">
                            <div className="tooltip">
                                <span className="info">
                                    <Moment 
                                        interval={0} 
                                        format='DD/MM HH:mm'
                                    >{workshop.DataMarcada}</Moment>
                                    {` | ${workshop.Local}`}
                                </span>
                                <i className="fas fa-info-circle"></i>
                            </div>
                            <label name="workshop">{workshop.NomeWorkshop}</label>
                        </div>
                        <div className="col-25">
                            <button 
                                className="inscrever" 
                                type="button"
                                onClick={e => inscricaoWorkshop(workshop.Id)}
                            >Inscrever</button>
                        </div>
                    </div>
                    <hr/>
                    </div>
                    )}
                ) 
            })

        } catch (e) {
            console.log(e);
        }
    }

    useEffect( () => {
        renderWorkshops();
    }, [])
    

    return (
        <div className="Inscricao">
            { open && 
                <Feedback 
                    handleClose = {handleClose} 
                    action = 'subscription'
            />}
            <h1>Workshops Disponíveis</h1>
            <div className="tabela">
                   {workshops.Workshops}
            </div>
            
            <button name="agenda" onClick={openAgenda}>Minha Agenda</button>
        </div>
    )
}

export default Inscricao