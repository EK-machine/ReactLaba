import React from "react";
import "./header.css";
import { NavLink } from "react-router-dom";
import routesData from "./routesData";

const Header: React.FC = () => {
  const activeStyle = {
    textDecoration: "none",
    backgroundColor: "#272727",
    boxShadow: "0px -6px 0px 0px #9933CC inset",
    fontWeight: "bolder",
  };

  const inactiveStyle = {
    textDecoration: "none",
  };

  return (
    <header className="header__container">
      <div className="header__title-container">
        <h1 className="header__title">Best Games Market</h1>
      </div>
      <div className="header__btns-container">
        {routesData.map(({ path, text }) => (
          <NavLink
            key={text}
            to={path}
            className="header__btn"
            style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
          >
            <p className="header__btn-title">{text}</p>
          </NavLink>
        ))}
      </div>
    </header>
  );
};

export default Header;
