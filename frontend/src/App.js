import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";
  import Home from "./pages/home/Home";
  import Hotel from "./pages/hotel/Hotel";
  import List from "./pages/list/List";
  import Login from "./pages/login/Login";
  import Register from "./pages/login/Register";
  // import Room from "./pages/Room/Room";
  // import About from "./pages/about/About";
  // import Destinations from "./pages/destination/Destinations"
  // import Contact from "./pages/contact/Contact"

  function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/hotels" element={<List/>}/>
          <Route path="/hotels/:id" element={<Hotel/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          {/* <Route path="/about"element={<About/>}/> */}
          {/* <Route path="/room"element={<Room/>}/> */}
          {/* <Route path="/destination"element={<Destinations/>}/>
          <Route path="/contact"element={<Contact/>}/> */}
        </Routes>
      </BrowserRouter>
    );
  }
  
  export default App;
  
// import React from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Home from './pages/home/Home';
// import List from './pages/list/List';
// import Hotel from './pages/hotel/Hotel';


// function App() {
//     return ( <
//         BrowserRouter >
//         <
//         Routes >
//         <
//         Route path = "/"
//         element = { < Home / > }
//         />     <
//         Route path = "/hotels"
//         element = { < List / > }
//         />     <
//         Route path = "/hotels/:id"
//         element = { < Hotel / > }
//         />    < /
//         Routes > <
//         /BrowserRouter>
//     );
// }

// export default App;