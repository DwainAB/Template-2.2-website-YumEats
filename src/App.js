import React from "react";
import "./App.css";
import "./Global.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home"
import Basket from "./Pages/Basket";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="App">
      <Router>
        <div className="container-global">
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home />} />        
            <Route path="/panier" element={<Basket />} />        
          </Routes>
        </div>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
