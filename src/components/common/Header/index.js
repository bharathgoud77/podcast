import React from "react";
import './styles.css'
import { Link, NavLink } from "react-router-dom";
function Header(){
    return<div className="navbar">
        <div className="gradient"></div>
        <div className="links">
            <NavLink to='/'>Signup</NavLink>
            <NavLink to="/podcasts">Podcasts</NavLink>
            <NavLink to="/create-a-podcast">Start A Podast</NavLink>
            <NavLink to="/profile">Profile</NavLink>
        </div>
    </div>
}
export default Header;