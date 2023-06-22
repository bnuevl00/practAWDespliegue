import React from 'react';
import {Box, Typography, Button } from '@mui/material';

import Styles from './films.module.css';

export default function FilmSerie(params){
  
  const getId =() => {
    if(params.action!=="none"){
      return (
        <Typography align="center">id: {params.id}</Typography>
      );
    }
  }

  const getAction =() => {
    if(params.action==="modificar"){
      return (
        <Box className={Styles.buttonAlone}>
          <Button
            variant ="outlined"
            onClick={() =>{
              params.modify(params.id)
            }}
          >
          Modify
        </Button>
      </Box>
      );
    }
    else if(params.action==="borrar"){
      return (
        <Box className={Styles.buttonAlone}>
          <Button
            variant ="outlined"
            onClick={() =>{
              params.remove(params.id)
            }}
          >
            Remove
          </Button>
        </Box>
      );
    }else{
      if(params.mode==="all"){
        return (
          <Box className={Styles.buttons}>
            <Button
              variant= "outlined"
              onClick={() =>{
                params.later(params.id, params.index)
              }}
              className={Styles.button}
            >
              Show Later
            </Button>

            <Button
              variant= "outlined"
              onClick={() =>{
                params.saw(params.id, params.index)
              }}
              className={Styles.button}
            >
              Saw
            </Button>

            <Button
              variant= "outlined"
              onClick={() =>{
                params.fav(params.id, params.index)
              }}
              className={Styles.button}
            >
              Favourite
            </Button>

            <Button
              variant= "outlined"
              onClick={() =>{
                params.later(params.id, params.index)
              }}
              className={Styles.button}
            >
              Rating
            </Button>
          </Box>
        );
      }else if(params.mode==="pending"){
        return (
          <Box className={Styles.buttonAlone}>
            <Button
              variant ="outlined"
              onClick={() =>{
                params.delPend(params.index)
              }}
            >
              Remove from pending
            </Button>
          </Box>
        );
      }else if(params.mode==="saw"){
        return (
          <Box className={Styles.buttonAlone}>
            <Button
              variant ="outlined"
              onClick={() =>{
                params.delSaw(params.index)
              }}
            >
              Remove from saw
            </Button>
          </Box>
        );
      }else if(params.mode==="favourite"){
        return (
          <Box className={Styles.buttonAlone}>
            <Button
              variant ="outlined"
              onClick={() =>{
                params.delFav(params.index)
              }}
            >
              Remove from favourite
            </Button>
          </Box>
        );
      }
    }
  }

  return (
    <Box 
    className={Styles.card}
    variant="outlined"
    >
      {getId()}

      <Typography
        variant="h5"
        align="center"
        className={Styles.score}
      >
        Rate: {params.score}
      </Typography>

      <Typography
        variant="h4"
        align="center"
      >
        {params.title} 
      </Typography>

      <Box className={Styles.duo}>
        <Typography>gen: {params.genre}</Typography>
        <Typography>dur: {params.duration}</Typography>
        <Typography>Age: {params.rangeAge}</Typography>
      </Box>
      
      <img src={params.poster} alt="Poster of film" className={Styles.img}/>

      <Typography
        variant="h6"
        align="center"
        className={Styles.synopsisText}
      >
        {params.synopsis} 
      </Typography>

      {getAction()}
      

    </Box>
  )
}