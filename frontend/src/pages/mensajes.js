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
import { useNavigate, useParams } from 'react-router-dom';

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
  const [message, setMessage] = useState('');
  const [contacts, setContacts] = useState(contacto);
  const [entrada, setEntrada] = useState(true);
  const navigate = useNavigate();

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
    axios.post("http://localhost:5000/api/contacts/all/consults/").then(res=> {
      setContacts(res.data);
    })
  } 
  
  const getConsultResponse = (index, contact) => {
    if(contacts[index].status==="on"){
      return (
        <Button
          variant="outlined"
          onClick={() =>{
            navigate("/response/"+contact._id);
          }}
        >
          Responder
        </Button>
      );
    }
  }
  
  const getConsultClose = (index, contact) => {
    if(contacts[index].status==="on"){
      return (
        <Button
          variant="outlined"
          onClick={() =>{
            axios.put("http://localhost:5000/api/contacts/"+contact._id, {
              status: "off",
              response: contact.response,
            }).then(res => {
              window.location.reload();
            })
          }}
        >
          Cerrar
        </Button>
      );
    }
  }

  return (
    <Box>
      <Container maxWidth="bg" sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Consultas
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
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contacts.map((contact, index) => (
                <TableRow key={contact.id}>
                  <TableCell>{contact.email}</TableCell>
                  <TableCell>{contact.subject}</TableCell>
                  <TableCell>{contact.message}</TableCell>
                  <TableCell>{contact.response}</TableCell>
                  <TableCell>{contact.status}</TableCell>
                  <TableCell>{getConsultResponse(index, contact)}</TableCell>
                  <TableCell>{getConsultClose(index, contact)}</TableCell>
                  
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