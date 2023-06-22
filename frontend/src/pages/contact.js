import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  FormControlLabel,
  Checkbox
} from '@mui/material';

import axios from 'axios';
import { useParams } from 'react-router-dom';

const contacto =[{
  _id: "",
  name: "",
  email: "",
  idUser: "",
  subject: "",
  response: "",
  state: ""
}]

//Formulario de contacto
const ContactPage = ({ onSubmit }) => {
  const {idUser} = useParams("idUser");
  const {user} = useParams("user");
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [contacts, setContacts] = useState(contacto);
  const [entrada, setEntrada] = useState(true);

  useEffect(() => {
    if(entrada){
      const prepara = async () => {
        setEntrada(false);
        getConsults();
      }
      prepara();
    }
  }, [contacts, entrada]);

  async function getConsults(){
    axios.post("http://localhost:5000/api/contacts/myConsults/"+idUser).then(res=> {
      setContacts(res.data);
    })
  }
  

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/contacts/"+idUser, {
      name: user,
      subject: subject,
      email: email,
      message: message,
      status: "on",
      response: "En espera"
    }).then(res => {
      alert(res.data);
    })
    setEmail('');
    setSubject('');
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
            label="Email"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{mt: "10px"}}
          />
          <TextField
            label="Asunto"
            fullWidth
            required
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            sx={{mt: "10px"}}
          />
          <TextField
            label="Mensaje"
            fullWidth
            multiline
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="5"
            sx={{height: "140px", mt: "10px"}}
          />
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Enviar
          </Button>
        </Box>
      </Container>
    
      <Container maxWidth="bg" sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Consultas enviadas
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>Asunto</TableCell>
                <TableCell>Consulta</TableCell>
                <TableCell>Respuesta</TableCell>
                <TableCell>Estado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contacts.map((contact) => (
                <TableRow key={contact.id}>
                  <TableCell>{contact.email}</TableCell>
                  <TableCell>{contact.subject}</TableCell>
                  <TableCell>{contact.message}</TableCell>
                  <TableCell>{contact.response}</TableCell>
                  <TableCell>{contact.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
}

export default ContactPage;