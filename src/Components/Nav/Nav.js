import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../cssResources/logo.png'
import './nav.css'

//Define router links to each section of the app
function Nav() {
  return (
    <nav className="purple-bar">
        <div className="nav-container">
            <img className="cw-logo" src={logo} alt="Currywurst"></img>
            <div className="nav-list">
                <Link to="/" className="nav-item  dashboard-section">
                    Dashboard
                </Link>
                <Link to="/employees" className="nav-item  recipes-section">
                    Employees
                </Link>
                <Link to="/recipes" className="nav-item employees-section">
                    Recipes
                </Link>
                <Link to="/ingredients" className="nav-item employees-section">
                    Ingredients
                </Link>
                <Link to="/about" className="nav-item  about-section">
                    About
                </Link>
            </div>
        </div>
    </nav>
  );
}

export default Nav;