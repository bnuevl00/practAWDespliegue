import React, { useState } from 'react';
import {Box, TextField, Typography, Button} from '@mui/material';
import Styles from "./signup.module.css";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
   
    if(data.get("pass") === data.get("repeatPass")){
      axios.post("http://localhost:5000/api/users/newUser", {
        name: data.get("name"),
        surname: data.get("surname"),
        email: data.get("email"),
        password: data.get("pass")
      }).then(resp => {
        alert(resp.data);
        navigate("/login");
      })
    }else{
      alert("Ambas contraseñas deben ser iguales");
    }
  };

  return (
    <Box>
      <Box className={Styles.reg} component="form" onSubmit={handleSubmit}>
        <Typography
          variant="h3"
          className={Styles.title}
        >
          Create new Account
        </Typography>
        <TextField
          placeholder="Name"
          name="name"
          >
        </TextField>
        <TextField
          placeholder="Surname"
          name="surname"
          >
        </TextField>
        <TextField
          placeholder="Email"
          name="email"
          >
        </TextField>
        <TextField
          type="password"
          placeholder="Password"
          name="pass"
        >
        </TextField>
        <TextField
          type="password"
          placeholder="Repeat password"
          name="repeatPass"
        />
      
        <Box className={Styles.actions}>
          <Button 
            type="submit"
            variant="outlined"
            className={Styles.buttonAccount}
          >
            Create Account
          </Button>
            <Button 
            variant="outlined"
            className={Styles.buttonAccount}
            onClick = {() => {
              navigate("/login");
            }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default SignUp;

  