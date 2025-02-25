import React from "react";
import { FaSearch } from "react-icons/fa"
import { NavLink, useNavigate } from "react-router-dom";
import style from '../Navbar/NavBar.module.scss'
import { CiHeart } from "react-icons/ci"
import { Navigate } from "react-router-dom";

export const NavBar = () => {
  const navigate= useNavigate()

  return (
    <nav className={style.navBar}>
        <div className={style.logo}>
        <h1 className={style.logoHouse} onClick={()=>navigate ("/")}> HomeLands</h1>
        </div>
      <ul className={style.navLink}>
        <li><NavLink to="/" >Forside</NavLink></li>
        <li><NavLink to="/houses">Boliger til salg</NavLink></li>
        <li><NavLink to="/login">Login</NavLink></li>
        <li><NavLink>{CiHeart}</NavLink></li>
      </ul>
      <div className={style.searchBar}>
        <input type="text" placeholder="Indtast søgeord" />
        <button type="submit">
        <FaSearch size={14} />
      </button>
      </div>
    </nav>
  );
};
