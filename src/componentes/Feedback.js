import React, {useState} from "react";
import {MySnackbarContentWrapper} from './Snackbar';
import Snackbar from '@material-ui/core/Snackbar';

export default function Feedback(props) {
    const [open, setOpen] = useState(true)
    const [variant, setVariant] = useState('success')
    const [message, setMessage] = useState(() => {
        if (props.action === 'subscription') {
            setVariant('success')
            return 'Inscrição realizada!'
        }
        else if (props.action === 'cancelSubscription') {
            setVariant('success')
            return 'Inscrição cancelada.'
        }
        else if (props.action === 'loginFailed') {
            setVariant('error')
            return 'Senha inválida.'
        }
        else if (props.action === 'submitEvaluation') {
            setVariant('success')
            return 'Avaliacao realizada!'
        }
    });
    

    return (
        <Snackbar
            anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
            }}
            open={open}
            autoHideDuration={4000}
            onClose={props.handleClose}
        >
            <MySnackbarContentWrapper
            onClose={props.handleClose}
            variant={variant}
            message={message}
            />
        </Snackbar>
    )
}