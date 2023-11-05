import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import {
  Container,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  Typography
} from '@mui/material';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleRegister = () => {
    // Validate form fields before registration
    if (!username || !email || !phone || !password) {
      alert('Please fill in all fields');
      return;
    }

    // Perform email and phone validation - example regex used here
    const emailPattern = /\S+@\S+\.\S+/;
    const phonePattern = /^[0-9]{10}$/;
    if (!emailPattern.test(email) || !phonePattern.test(phone)) {
      alert('Please enter a valid email and phone number');
      return;
    }

    const apiUrl = 'http://localhost:8800/api/auth/register';
    const user = {
      username: username,
      email: email,
      phone: phone,
      password: password,
    };

    axios.post(apiUrl, user)
      .then((response) => {
        console.log('Registration successful!', response);
        navigate('/login');
      })
      .catch((error) => {
        console.error('Error registering user:', error);
      });
  };

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}
    >
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Container maxWidth='sm'>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Typography variant="h4" align="center">
                  Register
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Enter Username"
                  id="username"
                  sx={{ borderRadius: '25px' }}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Enter your email"
                  id="email"
                  sx={{ borderRadius: '25px' }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Phone"
                  id="phone"
                  sx={{ borderRadius: '25px' }}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  type="password"
                  label="Password"
                  id="password"
                  sx={{ borderRadius: '25px' }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={8}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ borderRadius: '25px', ml: 10, mr: 5 }}
                  onClick={handleRegister}
                >
                  Register
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" align="center">
                  I have an Account!
                  <Link to="/login" variant="body2">
                    {" Login "}
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Container>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Register;
