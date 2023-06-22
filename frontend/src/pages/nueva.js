import React from 'react';
import {useParams} from 'react-router-dom';
import Styles from './admin.module.css';
import {Box, TextField, Button} from '@mui/material'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Admin () {
  const {type} = useParams("type");
  const {user} = useParams("user");
  const {idUser} = useParams("idUser");
  const navigate = useNavigate();

  const handleSubmit = event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    const film = {
      type: type,
      title: data.get("title"),
      genre: data.get("genre"),
      rangeAge: data.get("range"),
      duration: data.get("duration"),
      synopsis: data.get("synopsis"),
      score: data.get("score"),
      poster: data.get("poster")
    }

    axios.post("http://localhost:5000/api/filmsSeries", film).then(resp => {
      alert(type + " " + film.title + " " + resp.data);
      navigate("/"+user);
    })
  }

  return(
    <Box>
      <Button
        className={Styles.exit}
        variant="outlined"
        onClick= {() =>{
          navigate("/"+user+"/"+idUser);
        }}
        sx={{mt: "50px", left: "50%", width: "200px", ml: "-100px"}}
      > 
        Back to main menu
      </Button> 
      <Box className={Styles.grid} component="form" onSubmit={handleSubmit} >
        
        <TextField 
          placeholder="Title"
          name = "title"
          required
        >
        </TextField>
        <TextField 
          placeholder="Genre"
          name="genre"
          required
        >
        </TextField>
        <TextField 
          placeholder="Range Age"
          name = "range"
          required
        >
        </TextField>
        <TextField 
          placeholder="Score"
          name="score"
          required
        >
        </TextField>
        <TextField 
          placeholder="Duration"
          name="duration"
          required
        >
        </TextField>

        <TextField 
          placeholder="Synopsis"
          name="synopsis"
          required
        >
        </TextField>

        <TextField 
          placeholder="Poster"
          name="poster"
          required
        >
        </TextField>
        <Button
          type="submit"
          variant="outlined"
        >
          Ok
        </Button>
      </Box>
    </Box>
  );
}

export default Admin;

