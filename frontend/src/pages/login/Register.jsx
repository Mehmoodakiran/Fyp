import React, { useState } from 'react';
import { Button, TextField, Grid, Typography, Container } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    const apiUrl = 'http://localhost:8800/api/auth/register';
    const user = {
      username: username,
      email: email,
      phone: phone,
      password: password,
    };

    try {
      await axios.post(apiUrl, user);
      console.log("Registration successful");
      navigate('/Login');
    } catch (error) {
      console.log("Error during registration", error);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const isPasswordValid = password.length >= 6; // Validate password length (6 characters minimum)
  const isPhoneValid = /^\d{11}$/.test(phone); // Validate 11-digit phone number

  const passwordErrorMessage = isPasswordValid ? '' : 'Password must be at least 6 characters';
  const phoneErrorMessage = isPhoneValid ? '' : 'Phone number must be 11 digits';

  return (
    <Container sx={{ mt: 10 }} component="main" maxWidth="xs">
      <div>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="phone"
            label="Phone Number"
            type="tel"
            id="phone"
            autoComplete="tel"
            value={phone}
            onChange={handlePhoneChange}
            error={!isPhoneValid}
            helperText={phoneErrorMessage}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={password}
            onChange={handlePasswordChange}
            error={!isPasswordValid}
            helperText={passwordErrorMessage}
          />

          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleRegister}
            disabled={!isPasswordValid || !isPhoneValid}
          >
            Sign Up
          </Button>
        </form>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link to="/Login" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default Register;
