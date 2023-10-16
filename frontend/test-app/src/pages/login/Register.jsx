import React, { useState } from 'react';
import { Button, TextField, Grid, Typography, Container} from '@mui/material';
import { Link,useNavigate } from 'react-router-dom';
// import Login from "./Login"
import axios from 'axios'
const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate()

    const handleRegister =async () => {
        const apiUrl = 'http://localhost:8800/api/auth/register'
        const user = {
            username: username,
            email: email,
            password: password,
          };
          try{

await axios.post('http://localhost:8800/api/auth/register',user)
console.log("added")
navigate('/Login')
          }catch(error){
            console.log("error",error)
          }
    
    
    


    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const passwordsMatch = password === confirmPassword;
    const passwordErrorMessage = passwordsMatch ? '' : 'Passwords do not match';




    return (
        <Container sx={{mt:10}} component="main" maxWidth="xs">
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
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        id="confirmPassword"
                        autoComplete="new-password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                    />
                    <Typography color={passwordsMatch ? 'inherit' : 'error'} variant="caption">
                        {passwordErrorMessage}
                    </Typography>
                    {/* Other form fields */}
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleRegister}
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
        </Container >
    );
};

export default Register;

// import React, { useState } from 'react';
// import { TextField, Button, Container, Typography, Box } from '@mui/material';
// import axios from 'axios';

// const Register = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     phone: '',
//     password: '',
//   });

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     // Send a POST request to your backend API endpoint
//     axios.post('http://localhost:8800/api/auth/register', formData)
//       .then(response => {
//         // Handle the response from the backend
//         console.log('User Register:', response.data);
//       })
//       setFormData({
//         username:'',
//         email:'',
//         phone:'',
//         password:'',
     
       
//       })
//       .catch(error => {
//         // Handle any errors that occur during the request
//         console.error('Error During Register:', error);
//       });
//   };

//   return (
//     <Container maxWidth="xs">
//       <Box mt={5}>
//         <Typography variant="h4" align="center"color="primary" gutterBottom>
//           Registration Form
//         </Typography>
//         <form onSubmit={handleSubmit}>
//           <TextField
//             fullWidth
//             id="username"
//             name="username"
//             label="Username"
//             variant="outlined"
//             margin="normal"
//             value={formData.username}
//             onChange={handleChange}
//             required
//           />
//           <TextField
//             fullWidth
//             id="email"
//             name="email"
//             label="Email"
//             type="email"
//             variant="outlined"
//             margin="normal"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//           <TextField
//             fullWidth
//             id="phone"
//             name="phone"
//             label="Phone"
//             variant="outlined"
//             margin="normal"
//             value={formData.phone}
//             onChange={handleChange}
//             required
//           />
//           <TextField
//             fullWidth
//             id="password"
//             name="password"
//             label="Password"
//             type="password"
//             variant="outlined"
//             margin="normal"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
       
//           <Button
//             type="submit"
//             variant="contained"
//             color="primary"
//             fullWidth
//           >
//             Register
//           </Button>
//         </form>
//       </Box>
//     </Container>
//   );
// };

// export default Register;
