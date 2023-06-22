import React from 'react';
import Styles from './admin.module.css';
import {Button, Box} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';



function Admin () {
  const navigate = useNavigate();
  const {user} = useParams("user");
  const {idUser} = useParams("idUser");

  const show = (type) => {
    navigate("/show/"+type+"/all/"+user+"/"+idUser);
  }

  const pending = (type) => {
    navigate("/show/"+type+"/pending/"+user+"/"+idUser);
  }

  const saw = (type) => {
    navigate("/show/"+type+"/saw/"+user+"/"+idUser);
  }

  const favourite = (type) => {
    navigate("/show/"+type+"/favourite/"+user+"/"+idUser);
  }

  const contact = () => {
    navigate("/contact/"+user+"/"+idUser);
  }

  const exit = () => {
    navigate("/login")
  }

  return(
    <Box className={Styles.grid}>
      <Button 
        variant="contained" 
        className={Styles.button}
        onClick={() => {
          show("film")
        }}
      >
        Films
      </Button>
      <Button 
        variant="contained" 
        className={Styles.button}
        onClick={() => {
          show("serie")
        }}
      >
        Series
      </Button>

      <Button 
        variant="contained" 
        className={Styles.button}
        onClick={() => {
          pending("film")
        }}
      >
        Pending Films
      </Button>

      <Button 
        variant="contained" 
        className={Styles.button}
        onClick={() => {
          pending("serie")
        }}
      >
        Pending Series
      </Button>

      <Button 
        variant="contained" 
        className={Styles.button}
        onClick={() => {
          saw("film")
        }}
      >
        Saw Films
      </Button>

      <Button 
        variant="contained" 
        className={Styles.button}
        onClick={() => {
          saw("serie")
        }}
      >
        Saw Series
      </Button>

      <Button
        variant="contained" 
        className={Styles.button}
        onClick={() => {
          favourite("film")
        }}
      >
        Favourite Films
      </Button>

      <Button
        variant="contained" 
        className={Styles.button}
        onClick={() => {
          favourite("serie")
        }}
      >
        Favourite Series
      </Button>

      <Button
        variant="contained" 
        className={Styles.button}
        onClick={() => {
          contact()
        }}
      >
        Contact
      </Button>

      <Button
        variant="contained" 
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

