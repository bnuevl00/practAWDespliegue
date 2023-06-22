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
  const {mode} = useParams("mode");
  const {user} = useParams("user");
  const {idUser} = useParams("idUser");
  const [entrada, setEntrada] = useState(true);
  const [films, setFilm] = useState([]);
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  useEffect(() =>{
    const prepara = async () => {
      getFilms();
      
    }
    prepara();
  }, [films, entrada,  type]);

  async function getFilms()  {
    if(entrada===true){
        setEntrada(false);
          if(mode==="all"){
            await axios.get("http://localhost:5000/api/filmsSeries/"+type)
            .then(res => {
              
              setFilm(res.data);
            })
          }else{ 
            const filmsFinded = [];
            if(mode==="pending"){
              await axios.post("http://localhost:5000/api/filmsSeries/showPending/"+type, {
                userId: idUser
              })
              .then(async res => {  
                setList(res.data);
                for(var i=0; i<res.data.length; i++){
                  console.log(res.data[i].filmId);
                  await axios.post("http://localhost:5000/api/filmsSeries/" + res.data[i].filmId).then(response => {
                    filmsFinded.push(response.data[0]);
                  })
                }
              })
            }else if(mode==="saw"){
              await axios.post("http://localhost:5000/api/filmsSeries/showSaw/"+type, {
                userId: idUser
              })
              .then(async res => {  
                setList(res.data);
                for(var i=0; i<res.data.length; i++){
                  console.log(res.data[i].filmId);
                  await axios.post("http://localhost:5000/api/filmsSeries/" + res.data[i].filmId).then(response => {
                    filmsFinded.push(response.data[0]);
                  })
                }
              })
            }else if(mode==="favourite"){
              await axios.post("http://localhost:5000/api/filmsSeries/showFavourite/"+type, {
                userId: idUser
              })
              .then(async res => {  
                setList(res.data);
                for(var i=0; i<res.data.length; i++){
                  console.log(res.data[i].filmId);
                  await axios.post("http://localhost:5000/api/filmsSeries/" + res.data[i].filmId).then(response => {
                    filmsFinded.push(response.data[0]);
                  })
                }
              })
            }
            setFilm(filmsFinded);
          }
      }
  }

  function showLater(id, index) {
    axios.post("http://localhost:5000/api/filmsSeries/pending/"+type, {
      id: id,
      idUser: idUser,
    }).then(res => {     
      if(type==="film" ) alert("La película: " +films[index].title +" " + res.data);
      if(type==="serie") alert("La serie: " +films[index].title +" " + res.data);
    })
  } 

  function saw(id, index) {
    axios.post("http://localhost:5000/api/filmsSeries/saw/"+type, {
      id: id,
      idUser: idUser,
    }).then(async res => {     
      if(type==="film" ) alert("La película: " +films[index].title +" " + res.data);
      if(type==="serie") alert("La serie: " +films[index].title +" " + res.data);
      await axios.post("http://localhost:5000/api/filmsSeries/showPending/"+type, {
        userId: idUser
      })
      .then(async res => {  
        for(var i=0; i<res.data.length; i++){
          if(res.data[i].filmId===films[index]._id){
            axios.delete("http://localhost:5000/api/filmsSeries/pending/list/" +res.data[i]._id+"/"+idUser+"/"+type);
          }
        }
      })
      
    })
  } 

  function favourite(id, index) {
    axios.post("http://localhost:5000/api/filmsSeries/favourite/"+type, {
      id: id,
      idUser: idUser,
    }).then(res => {     
      if(type==="film" ) alert("La película: " +films[index].title +" " + res.data);
      if(type==="serie") alert("La serie: " +films[index].title +" " + res.data);
    })
  }

  function removePend(index){
    const action = window.confirm("Se borrará " + films[index].title + " de tu lista de pendientes");
    if(action){
       axios.delete("http://localhost:5000/api/filmsSeries/pending/list/" +list[index]._id+"/"+idUser+"/"+type).then(async res => {
        await getFilms();
        window.location.reload();
      });
    }
  }

  async function removeSaw(index){
    const action = window.confirm("Se borrará " + films[index].title + " de tu lista de vistos");
    if(action){
       axios.delete("http://localhost:5000/api/filmsSeries/saw/list/" +list[index]._id+"/"+idUser+"/"+type).then(async res => {
        await getFilms();
        window.location.reload();
      });
    }
  }

  function removeFav(index){
    const action = window.confirm("Se borrará " + films[index].title + " de tu lista de favoritos");
    if(action){
       axios.delete("http://localhost:5000/api/filmsSeries/favourite/list/" +list[index]._id+"/"+idUser+"/"+type).then(async res => {
        await getFilms();
        window.location.reload();
      });
    }
  }

  function menu() {
    navigate("/user/" + user +"/"+idUser);
  }

  return(
    <Box>
      <Button 
        variant="outlined" 
        sx={{mt: "50px", left: "50%", width: "200px", ml: "-100px"}}
        onClick={() => {
          menu();
        }}
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
            mode = {mode}
            action = {"none"}
            index={index}
            later={showLater}
            saw={saw}
            fav={favourite}
            delPend={removePend}
            delSaw={removeSaw}
            delFav={removeFav}
          />
        ))}
      </Box>
    </Box>
  );
}

export default Admin;

