import React from "react";
import {Box, Typography, Button} from "@mui/material";
import Styles from "./usuario.module.css";
import axios from "axios";
export default function Usuario(params){

  const changeType=(type) => {
    axios.put("http://localhost:5000/api/users/"+params.id, {type: type}).then(resp => {
      console.log(resp.data);
      alert(resp.data);
      window.location.reload();
    })
  }

  const remove=() => {
    var res = window.confirm("¿Realmente desea borrar al usuario " + params.name + " de la base de datos?");
    if(res){
      axios.delete("http://localhost:5000/api/users/"+params.id).then(resp => {
        alert(resp.data);
        window.location.reload();
      })
    }
  }

  const getAdmin = () => {
    if(params.typeUser==="normal"){
      return(
        <Button
        variant="contained"
        className={Styles.button}
        onClick={() => {
          changeType("admin");
        }}
      >
        Convert to Admin
      </Button>
      );
    }else{
      return (
        <Button
        variant="contained"
        className={Styles.button}
        onClick={() => {
          changeType("normal");
        }}
      >
        Convert to Normal
      </Button>
      );
    } 
  }
  return (
    <Box className={Styles.row}>
      <Typography>
        {params.id}
      </Typography>

      <Typography>
        {params.name}
      </Typography>

      <Typography>
        {params.surname}
      </Typography>

      <Typography>
        {params.email}
      </Typography>

      <Typography>
        {params.typeUser}
      </Typography>

      {getAdmin()}

      <Button
        variant="contained"
        className={Styles.button}
        onClick={() => {
          remove();
        }}
      >
        Remove
      </Button>

    </Box>
  );
}  