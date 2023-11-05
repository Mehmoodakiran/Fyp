import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Button, AppBar, Toolbar } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';

const Navbar = () => {
  const { user } = useContext(AuthContext);

  const theme = createTheme({
    palette: {
      primary: {
        main: '#4CAF50', 
        // Replace with the desired green color in hexadecimal format
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>
          <Link to="/login" style={{ color: "inherit", textDecoration: "none", marginRight: "30%" }}>
            <span style={{ color: "white", fontWeight: "bold" }}>TRAVILICS</span>
          </Link>
          <Button variant="contained" component={Link} to="/about" style={{ textDecoration: "none", color: "white" }}>
            About
          </Button>
          <Button variant="contained" component={Link} to="/destinations" style={{ textDecoration: "none", color: "white" }}>
            Destinations
          </Button>
          <Button variant="contained" component={Link} to="/contact" style={{ textDecoration: "none", color: "white" }}>
            Contact Us
          </Button>
          <Button variant="contained" component={Link} to="/hotelRegister" style={{ textDecoration: "none", color: "white" }}>
            Hotel Register
          </Button>
          {user ? (
            <Button variant="contained" style={{ color: "white" }}>
              {user.username}
            </Button>
          ) : (
            <div>
              <Button variant="contained" component={Link} to="/register" style={{ textDecoration: "none", color: "white" }}>
                Register
              </Button>
              <Button variant="contained" component={Link} to="/login" style={{ textDecoration: "none", color: "white" }}>
                Login
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Navbar;
