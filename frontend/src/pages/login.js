import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const theme = createTheme();

export default function Login() {

  const navigate = useNavigate();
    
  const handleSubmitPrincipal = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    axios.post("http://localhost:5000/api/login", {
      email: data.get('email'),
      password: data.get('password'),
    }).then(user => {
      console.log(user.data);
      if(user.data.length===0){
        alert("Unknow user and password");
      }else{
        
        if(user.data[0].userType==="admin"){
          navigate("/admin/" + user.data[0].name+"/"+user.data[0]._id)
        }else{
          navigate("/user/" + user.data[0].name+"/"+user.data[0]._id);
        }
      }
    })
  };
  const handleRegister = (event) => {
    navigate("/signup")
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmitPrincipal} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="User email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
              </Button>
          
          </Box>
          <Box noValidate sx={{ mt: 1 }}>            
              <Grid item>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={() => {
                      handleRegister()
                    }}
                  >
                    Don't have an account? Sign Up
                  </Button>
              </Grid>
            
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}