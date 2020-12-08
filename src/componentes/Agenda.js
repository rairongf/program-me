import React, {useState, useEffect} from "react"
import "./Agenda.css"
import api from '../services/api';
import WorkshopCard from './WorkshopCards';
import Feedback from './Feedback';

function Agenda({history, match}) {
    const [workshops, setWorkshops] = useState([]);
    const [matricula, setMatricula] = useState(match.params.matricula);
    const [username, setUsername] = useState('');
    const [open, setOpen] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    };

    const avaliarWorkshop = async(idOfWorkshop, nota, comentario) => {
        try {
            await api.put('/workshop/avaliacao', {
                workshopId: idOfWorkshop,
                userMatricula: matricula,
                notaAvaliada: nota,
                comentario: comentario,
            })
        } catch (e) {
            console.log(e)
        }
    }

    const cancelarInscricao = async (idOfWorkshop) => {
        try {
            await api.delete(`/inscricoes/delete/${matricula}/${idOfWorkshop}`)
        
            await api.put(`/workshop/update/remove/${idOfWorkshop}`)

            setWorkshops([]);
            getAllWorkshopsIds();
            setOpen(true);
        } catch(e) {
            console.log(e)
        }
        
    }

    function deslogar() {
        history.push('/');
    }
    function openInscricoes() {
        history.push(`/inscricoes/${matricula}`);
    }

    const getAllWorkshopsIds = async() => {
        let response = await api.get(`/agenda/${matricula}`);
        let dados = response.data;
        return setWorkshops(dados);
    }

    const getUserName = async() => {
        let response = await api.get(`/${matricula}`);
        let dados = response.data;
        return setUsername(dados.Nome);
    }

    useEffect( () => {
        getUserName();
        getAllWorkshopsIds();
    }, [])

    return (
        <div className="Agenda">
            { open && 
                <Feedback 
                    handleClose = {handleClose} 
                    action = 'cancelSubscription'
            />}
            <h1>Minha Agenda</h1>

            { workshops.length !== 0 &&
                workshops.map( (workshop) => 
                    <WorkshopCard 
                    key = {workshop.Id} 
                    id = {workshop.Id}
                    cancel = {cancelarInscricao}
                    avaliacao = {avaliarWorkshop}
                    username = {username}
                    matricula = {matricula}
                    /> 
                )
            }

            {workshops.length === 0 && <h4>Inscreva-se em algum workshop! =)</h4>}

            <button name="sair" onClick={deslogar}>Sair</button>
            <button name="inscricoes" onClick={openInscricoes}>Incrições</button>
        </div>
    )
}

export default Agenda