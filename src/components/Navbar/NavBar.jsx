import React from "react";
import { NavLink } from "react-router-dom";
import style from '../Navbar/NavBar.module.scss'

export const NavBar = () => {
  return (
    <nav className={style.navBar}>
        <div className={style.logo}>
        <h1>HomeLands</h1>
        </div>
      <ul className={style.navLink}>
        <li><NavLink to="/" activeclassname="active">Forside</NavLink></li>
        <li><NavLink to="/houses" activeclassname="active">Boliger til salg</NavLink></li>
        <li><NavLink to="/login" activeclassname="active">Login</NavLink></li>
      </ul>
      <div className={style.searchBar}>
        <input type="text" placeholder="Indtast søgeord" />
        <button></button>
      </div>
    </nav>
  );
};
