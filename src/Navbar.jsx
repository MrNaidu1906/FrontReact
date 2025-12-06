import React, { useState } from "react";
import { Link } from "react-router-dom";
import Timer from "./Timer";
import { useSelector } from "react-redux";
import "./Navbar.css";

function Navbar() {

  const [open, setOpen] = useState(false);

  // Cart Count
  let cartItems = useSelector((state) => state.cart);
  let cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="navbar">

      {/* Logo */}
      <div className="logo">
          <img src="/logoimg.jpg" className="logo-img" alt="logo" />
          <span className="logo-text">Andhra Spice House </span>
      </div>


      {/* Timer */}
      <div className="timer-box">
        <Timer />
      </div>

      {/* Hamburger Icon */}
      <div className="nav-toggle" onClick={() => setOpen(!open)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Navigation Links */}
      <ul className={open ? "nav-links open" : "nav-links"}>
        <li><Link to="/" onClick={() => setOpen(false)}>Home</Link></li>
        <li><Link to="/veg" onClick={() => setOpen(false)}>Veg</Link></li>
        <li><Link to="/nonveg" onClick={() => setOpen(false)}>NonVeg</Link></li>
        <li><Link to="/contact" onClick={() => setOpen(false)}>Contact</Link></li>
        <li><Link to="/about" onClick={() => setOpen(false)}>About</Link></li>
        <li><Link to="/cart" onClick={() => setOpen(false)}>Cart ({cartCount})</Link></li>
        <li><Link to="/orders" onClick={() => setOpen(false)}>Orders</Link></li>
        <li><Link to="/register" onClick={() => setOpen(false)}>Registration</Link></li>
        <li><Link to="/login" onClick={() => setOpen(false)}>Login</Link></li>
      </ul>

    </nav>
  );
}
export default Navbar;
