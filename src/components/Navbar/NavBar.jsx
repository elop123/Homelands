import React from "react"
import { useContext, useState } from "react"
import { FaSearch,  FaBars } from "react-icons/fa"
import { NavLink, useNavigate } from "react-router-dom"
import style from '../Navbar/NavBar.module.scss'
import { CiHeart } from "react-icons/ci"
import { UserContext } from "../../context/userContext"

export const NavBar = () => {
  const { userData, logout, favorites } = useContext(UserContext)
  const navigate= useNavigate()
  const [searchWord, setSearchWord] = useState("")
  const [menuOpen, setMenuOpen] = useState(false);
  
  //console.log(searchWord)

  return (
    <nav className={style.navBar}>
        <div className={style.logo}>
        <h1 className={style.logoHouse} onClick={()=>navigate ("/")}> HomeLands</h1>
        </div>
        <div className={style.menuToggle} onClick={() => setMenuOpen(!menuOpen)}>
        <FaBars />
      </div>
      <ul className={`${style.navLink} ${menuOpen ? style.showMenu : ""}`}>
        <li><NavLink to="/" >Forside</NavLink></li>
        <li><NavLink to="/houses">Boliger til salg</NavLink></li>
        
         {userData && <li><NavLink to="/administration">Admin</NavLink></li>}
       
        {userData ? (
            <li className={style.logoutBtn} onClick={() => { logout(); navigate("/login"); }}>
              Logout
            </li>
        ) : (
          <li><NavLink to="/login">Login</NavLink></li>
        )}
        <li><CiHeart className={style.favoriteIcon} style={{ color: "red" }} />
        <span className={style.favoriteCount}>{favorites.length}</span></li>
      </ul>
      <div className={style.searchBar}>
      
        <form onSubmit={(e) => { e.preventDefault(), navigate(`/search/${searchWord}`) }}>
          <input
            name="search"
            type="search"
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
            placeholder="Indtast søgeord"
            className={style.searchInput}
          />
           <NavLink to={searchWord ? `/search/${searchWord}` : `/allhouses`}></NavLink>
          <button className={style.btn} type="submit">
            <FaSearch size={14} />
          </button>
        </form>
      </div>
    </nav>
  );
};
