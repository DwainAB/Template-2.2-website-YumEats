import React from "react";
import "./App.css";
import "./Global.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home"
import Basket from "./Pages/Basket";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import PaymentSuccess from "./Pages/PaymentSuccess";

function App() {
  return (
    <div className="App">
      <Router>
        <div className="container-global">
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home />} />        
            <Route path="/panier" element={<Basket />} />    
            <Route path="/payment-success" element={<PaymentSuccess />} />    
          </Routes>
        </div>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
