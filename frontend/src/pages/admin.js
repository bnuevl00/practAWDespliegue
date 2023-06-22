import React from 'react';
import Styles from './admin.module.css';
import {Button, Box} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';



function Admin () {
  const navigate = useNavigate();
  const {user} = useParams("user");
  const {idUser} = useParams("idUser");

  const nueva = (type) => {
    navigate("/nueva/"+type+"/"+user+"/"+idUser);
  }

  const modificar = (type) => {
    navigate("/modifyFilms/"+type+"/"+user+"/"+idUser);
  }

  const borrar = (type) => {
    navigate("/borrar/"+type+"/"+user+"/"+idUser);
  }

  const administrarUsuarios = () => {
    navigate("/administrarUsuarios/"+user+"/"+idUser)
  }

  const messages = () => {
    navigate("/messages");
  }

  const exit = () => {
    navigate("/login")
  }

  return(
    <Box className={Styles.grid}>
      <Button 
        variant="outlined" 
        className={Styles.button}
        onClick={() => {
          nueva("film")
        }}
      >
        New Film
      </Button>
      <Button 
        variant="outlined" 
        className={Styles.button}
        onClick={() => {
          nueva("serie")
        }}
      >
        New Serie
      </Button>

      <Button 
        variant="outlined" 
        className={Styles.button}
        onClick={() => {
          modificar("film")
        }}
      >
        Modify Film
      </Button>

      <Button 
        variant="outlined" 
        className={Styles.button}
        onClick={() => {
          modificar("serie")
        }}
      >
        Modify Serie
      </Button>

      <Button 
        variant="outlined" 
        className={Styles.button}
        onClick={() => {
          borrar("film")
        }}
      >
        Remove Film
      </Button>

      <Button 
        variant="outlined" 
        className={Styles.button}
        onClick={() => {
          borrar("serie")
        }}
      >
        Remove Serie
      </Button>

      <Button
        variant="outlined" 
        className={Styles.button}
        onClick={() => {
          administrarUsuarios()
        }}
      >
        Admin users
      </Button>

      <Button
        variant="outlined" 
        className={Styles.button}
        onClick={() => {
          messages()
        }}
      >
        Answer messages
      </Button>

      <Button
        variant="outlined" 
        className={Styles.button}
        onClick={() => {
          exit()
        }}
      >
        Exit
      </Button>
    </Box>
  );
}

export default Admin;

