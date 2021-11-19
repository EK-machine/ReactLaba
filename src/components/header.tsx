import React from "react";
import "./header.css";
import { NavLink } from "react-router-dom";
import routesData from "./routesData";

const Header: React.FC = () => (
  <header className="header__container">
    <div className="header__title-container">
      <h1 className="header__title">Best Games Market</h1>
    </div>
    <div className="header__btns-container">
      {routesData.map(({ path, text }) => (
        <NavLink key={text} exact to={path} className="header__btn" activeClassName="header__btn-active">
          <p className="header__btn-title">{text}</p>
        </NavLink>
      ))}
    </div>
  </header>
);
export default Header;
