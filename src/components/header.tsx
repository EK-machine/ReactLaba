import React from "react";
import "./header.css";
import { NavLink } from "react-router-dom";
import { routesData } from "./routesData";

const Header: React.FC = () => {
  const activeStyle = {
    textDecoration: "underline",
  };

  const inactiveStyle = {
    textDecoration: "none",
  };

  return (
    <header className="header__container">
      <div className="header__title-container">
        <h1 className="header__title">Best Games Market</h1>
      </div>
      <ul className="header__elements-list">
        {routesData.map(({ path, text }) => (
          <li key={text} className="header__element">
            <NavLink
              to={path}
              className="header__link"
              style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
            >
              <h1>{text}</h1>
            </NavLink>
          </li>
        ))}
      </ul>
    </header>
  );
};

export default Header;
