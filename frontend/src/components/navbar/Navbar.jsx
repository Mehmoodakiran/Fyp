import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
const Navbar = () => { 
  const { user } = useContext(AuthContext);
    return(
        <div className ="navbar">
          <div className ="navContainer">
          <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">TRAVILICS</span>
        </Link>
    
        <div className="navItems">
        {/* <button className="navButton">
              <Link to="/About"style={{textDecoration: "none"}}>
              About Us
              </Link>
              </button>
              <button className="navButton">
              <Link to="/Destination"style={{textDecoration: "none"}}>
              Destination
              </Link>
              </button>
              <button className="navButton">
              <Link to="/Room"style={{textDecoration: "none"}}>
              Room
              </Link>
              </button> */}
              {user ? user.username : (
          <div className="navItems">
            <button className="navButton">
            <Link to="/register"style={{textDecoration: "none"}}>
            Register
              </Link>
              </button>
            <button className="navButton">
              <Link to="/login"style={{textDecoration: "none"}}>
              Login
              </Link>
              </button>
          </div> 
      
        )}
            </div>
          </div>
       </div>
    )
}
export default Navbar