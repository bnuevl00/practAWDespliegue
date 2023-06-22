import React from 'react';
import {useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';
import Styles from './modificar.module.css';
import {Box, Button} from '@mui/material'
import axios from 'axios';
import Film from '../components/films';
import { useNavigate } from 'react-router-dom';


function Admin () {
  const {type} = useParams("type");
  const {user} = useParams("user");
  const {idUser} = useParams("idUser");
  const [entrada, setEntrada] = useState(true);
  const [films, setFilm] = useState([]);
  const navigate = useNavigate();

  useEffect(() =>{
    const prepara = async () => {
      if(entrada===true){
        
        setEntrada(false);
          await axios.get("http://localhost:5000/api/filmsSeries/"+type)
          .then(res => {
            setFilm(res.data);
          })

      }
    }
    prepara();
  }, [films, entrada,  type]);

  function borrar(id) {
    axios.delete("http://localhost:5000/api/filmsSeries/"+id+"/"+type).then(resp => {
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
      <Box className={Styles.grid}>
        {films.map((film, index) => (
          <Film className={Styles.card}
            id={film._id}
            title={film.title}
            genre={film.genre}
            score={film.score}
            synopsis = {film.synopsis}
            duration = {film.duration}
            rangeAge = {film.rangeAge}
            poster = {film.poster}
            index={index}
            action={"borrar"}
            remove={borrar}
          />
        ))}
      </Box>
    </Box>
  );
}

export default Admin;

