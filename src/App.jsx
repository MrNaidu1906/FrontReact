import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Veg from "./Veg";
import NonVeg from "./NonVeg";
import AboutUs from "./AboutUs";
import Cart from "./Cart";
import Contact from "./Contact";
import Navbar from "./Navbar"; // ⬅ your separate navbar
import "./Navbar.css";
import Orders from "./Orders";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Registration from "./Registration";
import Login from "./Login";





function App() {



  return (
    <BrowserRouter>
      {/* Navbar Component */}
      <Navbar />

      {/* Page Content */}
      <div style={{ paddingTop: "80px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/veg" element={<Veg />} />
          <Route path="/nonveg" element={<NonVeg />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/register" element={< Registration />} />
          <Route path="/login" element={< Login />} />
        </Routes>
      </div>

      

      <ToastContainer/>
      
    </BrowserRouter>
  );
}

export default App;
