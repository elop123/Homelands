import React from "react";
import style from '../Footer/Footer.module.scss'; 
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareTwitter } from "react-icons/fa6";

export const Footer = () => {
  return (
    <footer className={style.footer}>
      <div className={style.container}>
        <div className={style.logo}>
          <h1>HomeLands</h1>
        </div>
        <div className={style.address}>
          <p>Øster Uttrupvej 5</p>
          <p>9000 Aalborg</p>
        </div>
        <div className={style.contact}>
          <p>Email: info@homelands.dk</p>
          <p>Telefon: +45 1122 3344</p>
        </div>
        <div className={style.socialIcons}>
          <a><FaSquareTwitter /></a>
          <a><FaFacebookSquare /></a>
        </div>
      </div>
    </footer>
  );
};
