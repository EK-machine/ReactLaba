import React from "react";
import "./header.css";
import { NavLink } from "react-router-dom";
import routesData from "./routesData";
import ProductsDropDown from "./productsDropDown";

const Header: React.FC = () => (
  <header className="header__container">
    <div className="header__title-container">
      <h1 className="header__title">Best Games Market</h1>
    </div>
    <div className="header__btns-container">
      <NavLink
        key={routesData[0].text}
        exact
        to={routesData[0].path}
        className="header__btn"
        activeClassName="header__btn-active"
        role="button"
      >
        <p className="header__btn-title">{routesData[0].text}</p>
      </NavLink>

      <ProductsDropDown>
        <p>{routesData[1].text}</p>
      </ProductsDropDown>

      <NavLink
        key={routesData[2].text}
        exact
        to={routesData[2].path}
        className="header__btn"
        activeClassName="header__btn-active"
        role="button"
      >
        <p className="header__btn-title">{routesData[2].text}</p>
      </NavLink>
    </div>
  </header>
);
export default Header;
