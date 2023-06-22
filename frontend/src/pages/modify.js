import React from 'react';
import {useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';
import Styles from './modificar.module.css';
import {Box, Typography, TextField, Button} from '@mui/material'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



function Admin () {
  const {idFilm} = useParams("id");
  const {user} = useParams("user");
  const {idUser} = useParams("idUser");
  const [entrada, setEntrada] = useState(true);
  const [film, setFilm] = useState([]);
  const navigate = useNavigate();

  useEffect(() =>{
    const prepara = async () => {

      if(entrada===true){
        setEntrada(false);
          await axios.post("http://localhost:5000/api/filmsSeries/"+idFilm)
          .then(res => {
            setFilm(res.data[0]);
          })

      }
    }
    prepara();
  }, [film, entrada, idFilm]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    var newFilm= film;
    if(data.get("title")!==""){
      newFilm.title = data.get("title");
    }
    if(data.get("genre")!==""){
      newFilm.genre = data.get("genre");
    }
    if(data.get("rangeAge")!==""){
      newFilm.rangeAge = data.get("rangeAge");
    }
    if(data.get("score")!==""){
      newFilm.score = data.get("score");
    }
    if(data.get("synopsis")!==""){
      newFilm.synopsis = data.get("synopsis");
    }
    if(data.get("duration")!==""){
      newFilm.duration = data.get("duration");
    }
    if(data.get("poster")!==""){
      newFilm.poster = data.get("poster");
    }

    axios.put("http://localhost:5000/api/filmsSeries/", newFilm).then(resp=> {
      alert(resp.data);
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
      <Box className={Styles.grid2} component="form" onSubmit={handleSubmit}>
        <Typography>Title: {film.title}</Typography>
        <TextField placeholder="Título modificado" name="title"></TextField>

        <Typography>Genre: {film.genre}</Typography>
        <TextField placeholder="Género modificada" name="genre"></TextField>

        <Typography>Score: {film.score}</Typography>
        <TextField placeholder="Puntuacion modificada" name="score"></TextField>
        
        <Typography rows="10">Synopsis: {film.synopsis}</Typography>
        <TextField placeholder="Sinopsis modificada" rows="10" name="synopsis"></TextField>
        
        <Typography>Duration: {film.duration}</Typography> 
        <TextField placeholder="Duración modificada" name="duration"></TextField> 
        
        <Typography>Age range: {film.rangeAge}</Typography> 
        <TextField placeholder="Rango edad modificado" name="rangeAge"></TextField>
        
        <Typography>Poster: {film.poster}</Typography> 
        <TextField placeholder="Poster modificado" name="poster"></TextField>
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

