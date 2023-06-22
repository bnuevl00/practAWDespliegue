import React from 'react';
import {useState, useEffect} from 'react';
import {Box, Button, Typography} from '@mui/material'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Usuario from "../components/usuario";
import Styles from "./administrarUsuario.module.css";


function AdministrarUsuarios () {
  const {user} = useParams("user");
  const {idUser} = useParams("idUser");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [entrada, setEntrada] = useState(true);

  useEffect(() => {
    const prepara = async () => {
      if(entrada===true){
        setEntrada(false);
        axios.get("http://localhost:5000/api/users").then(resp => {
          console.log(resp.data);
        setUsers(resp.data);
        })
      }
    }
    prepara();
  }, [users, entrada]);

  return(
    <Box className={Styles.container}>
      <Button
        variant="outlined"
        onClick= {() =>{
          navigate("/"+user+"/"+idUser);
        }}
        sx={{mt: "50px", left: "50%", width: "200px", ml: "-100px"}}
      > 
        Back to main menu
      </Button> 
      <Box className={Styles.row}>
        <Typography>Id</Typography>
        <Typography>Name</Typography>                   
        <Typography>Surname</Typography>     
        <Typography>Email</Typography>        
        <Typography>Type of user</Typography>
        <Typography>To admin</Typography>
        <Typography>Remove</Typography>
      </Box>
      {users.map((person, index)=> (
        <Usuario
          id={person._id}
          name={person.name}
          surname={person.surname}
          email={person.email}
          typeUser={person.userType}
          index={index}
        />
      ))}
    </Box>
  );
}

export default AdministrarUsuarios;

