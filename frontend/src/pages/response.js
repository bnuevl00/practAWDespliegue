import React, { useState} from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
} from '@mui/material';

import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

//Formulario de contacto
const Response = ({ onSubmit }) => {
  const {idMessage} = useParams("idMessage");
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

 

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put("http://localhost:5000/api/contacts/"+idMessage, {
      status: "on",
      response: message,
    }).then(res => {
      navigate("/messages");
    })
    setMessage('');
  };

  return (
    <Box>
      <Container maxWidth="md">
        <Typography variant="h5" gutterBottom>
          Formulario de contacto
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Mensaje"
            fullWidth
            multiline
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="15"
            sx={{height: "400px", mt: "10px"}}
          />
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Enviar
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default Response;