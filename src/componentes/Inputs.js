import React from 'react';
import TextField from '@material-ui/core/TextField';

export default function Input() {
  
    return (
                <TextField
                    label="Usuário"
                    
                    type="text"
                    margin="normal"
                    variant="outlined"
                />
                /* <TextField
                    id="outlined-password-input"
                    label="Password"
                    
                    type="password"
                    autoComplete="current-password"
                    margin="normal"
                    variant="outlined"
                    required={true}
                /> */
  );
}