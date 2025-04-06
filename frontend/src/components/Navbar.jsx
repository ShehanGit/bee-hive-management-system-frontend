import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import NotificationBell from './NotificationBell';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Bee Hive</Link>
      </div>
      
      
      
      <div className="navbar-hamburger" onClick={toggleMenu}>
        <div className={`bar ${isOpen ? 'open' : ''}`}></div>
        <div className={`bar ${isOpen ? 'open' : ''}`}></div>
        <div className={`bar ${isOpen ? 'open' : ''}`}></div>
      </div>
      
      <ul className={`navbar-menu ${isOpen ? 'active' : ''}`}>
        <li>
          <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
        </li>
        <li>
          <Link to="/about" onClick={() => setIsOpen(false)}>About</Link>
        </li>
        <li>
          <Link to="/hive-management" onClick={() => setIsOpen(false)}>Manage Hives</Link>
        </li>
        <li>
          <Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
        </li>
        <li> <NotificationBell /> </li>
      </ul>
            
    </nav>
  );
}

export default Navbar;