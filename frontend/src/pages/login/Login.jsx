import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { TextField, Button, Container, Typography, Grid, CircularProgress } from "@mui/material";
import axios from "axios";
import { Link } from 'react-router-dom';
import { REACT_APP_URL } from "../../constant/url";
import "./login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [validationErrors, setValidationErrors] = useState({
    username: "",
    email: "",
  });

  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleValidation = () => {
    // Create a new object for validation errors
    const newValidationErrors = {
      username: "",
      email: "",
    };

    // Validate username and email (add your validation rules)
    if (credentials.username.trim() === "") {
      newValidationErrors.username = "Username is required";
    }

    if (credentials.email.trim() === "") {
      newValidationErrors.email = "Email is required";
    }

    // Set the new validation errors
    setValidationErrors(newValidationErrors);

    // Check if there are any validation errors
    return (
      newValidationErrors.username === "" && newValidationErrors.email === ""
    );
  };

  const handleClick = async (e) => {
    e.preventDefault();

    // Perform client-side validation
    const isFormValid = handleValidation();

    if (!isFormValid) {
      return;
    }

    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(REACT_APP_URL + "/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className="login-form">
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form>
          <TextField
            fullWidth
            id="username"
            label="Username"
            variant="outlined"
            margin="normal"
            value={credentials.username}
            onChange={handleChange}
            error={Boolean(validationErrors.username)}
            helperText={validationErrors.username}
          />
          <TextField
            fullWidth
            id="email"
            label="Email"
            variant="outlined"
            margin="normal"
            value={credentials.email}
            onChange={handleChange}
            error={Boolean(validationErrors.email)}
            helperText={validationErrors.email}
          />
          <TextField
            fullWidth
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={credentials.password}
            onChange={handleChange}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleClick}
            className="login-button"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </Button>
          {error && (
            <Typography variant="body2" color="error" align="center">
              {error.message}
            </Typography>
          )}
        </form>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link to="/Register" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default Login;

// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = () => {
//     const apiUrl = 'http://localhost:8000/api/auth/login/';
//     const user = {
//       username: username,
//       password: password,
//     };

//     axios.post(apiUrl, user)


//     .catch((error) => {
//         console.error('Error logging in:', error);
//       });

//   };

//   return (
//     <Container component="main" maxWidth="xs">
//       <div>
//         <Typography component="h1" variant="h5">
//           Sign In
//         </Typography>
//         <form>
//           <TextField
//             variant="outlined"
//             margin="normal"
//             required
//             fullWidth
//             id="username"
//             label="Username"
//             name="username"
//             autoComplete="username"
//             autoFocus
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//           <TextField
//             variant="outlined"
//             margin="normal"
//             required
//             fullWidth
//             name="password"
//             label="Password"
//             type="password"
//             id="password"
//             autoComplete="current-password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <Button
//             type="button"
//             fullWidth
//             variant="contained"
//             color="primary"
//             onClick={handleLogin}
//           >
//             Sign In
//           </Button>
//         </form>
//         <Grid container justifyContent="flex-end">
//           <Grid item>
//             <Link to="/Register" variant="body2">
//               {"Don't have an account? Sign Up"}
//             </Link>
//           </Grid>
//         </Grid>
//       </div>
//     </Container>
//   );
// };

// export default Login;

// const Login = () => {
//   const [credentials, setCredentials] = useState({
//     username: "",
//     password: "",
//   });

//   const { loading, error, dispatch } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
//   };

//   const handleClick = async (e) => {
//     e.preventDefault();
//     dispatch({ type: "LOGIN_START" });

//     try {
//       const res = await axios.post(REACT_APP_URL + "/auth/login", credentials);
//       dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
//       navigate("/");
//     } catch (err) {
//       dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
//     }
//   };

//   return (
//     <Container maxWidth="xs">
//       <Box mt={5}>
//         <Typography variant="h4" align="center" gutterBottom>
//           Login
//         </Typography>
//         <form>
//           <TextField
//             fullWidth
//             id="username"
//             label="Username"
//             variant="outlined"
//             margin="normal"
//             value={credentials.username}
//             onChange={handleChange}
//           />
//           <TextField
//             fullWidth
//             id="password"
//             label="Password"
//             type="password"
//             variant="outlined"
//             margin="normal"
//             value={credentials.password}
//             onChange={handleChange}
//           />
//           <Button
//             fullWidth
//             variant="contained"
//             color="success" // Change color to green (success)
//             onClick={handleClick}
//             className="lButton"
//             disabled={loading}
//           >
//             {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
//           </Button>
//           {error && (
//             <Typography variant="body2" color="error" align="center">
//               {error.message}
//             </Typography>
//           )}
//         </form>
//       </Box>
//     </Container>
//   );
//  };

//  export default Login;

