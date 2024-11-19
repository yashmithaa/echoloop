import React from "react";
import { Link } from "react-router-dom";
import "../Navbar.css";

const Navbar = () => {
  return (
    <nav className="echoloop-navbar">
      <div className="navbar-container">
        <Link className="navbar-brand" to="/">
        <i class="bi bi-soundwave mx-3"></i> Echoloop
        </Link>
        
        <div className="navbar-menu">
          <ul className="navbar-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/search">Search</Link></li>
            
            <li><Link to="/trending">Trending</Link></li>
            <li><Link to="/library">Library</Link></li>
            <li><Link to="/fav">Favourites</Link></li>
            <li><Link to="/profile">Profile</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;