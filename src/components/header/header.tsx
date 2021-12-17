import React from "react";
import { useSelector } from "react-redux";
import "./header.css";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import routesData from "../routesData";
import ProductsDropDown from "./productsDropDown";
import SignInBtn from "../elements/signInBtn";
import SignUpBtn from "../elements/signUpBtn";
import SignOutBtn from "../elements/signOutBtn";
import { HeaderProps } from "../../types/types";
import { ReducerState } from "../../redux/reducerRoot";

const Header: React.FC<HeaderProps> = () => {
  const numOfGames: number = useSelector((state: ReducerState) => state.cart.gamesList.length);
  const userName: string = useSelector((state: ReducerState) => state.signIn.userName);
  const loggedIn: boolean = useSelector((state: ReducerState) => state.signIn.loggedIn);

  return (
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
        <div className="header__btn-log_container">
          {loggedIn ? (
            <>
              <NavLink
                key={routesData[3].text}
                exact
                to={routesData[3].path}
                className="header__btn"
                activeClassName="header__btn-active"
                role="button"
              >
                <p className="header__btn-title">{userName}</p>
              </NavLink>
              <NavLink
                key={routesData[4].text}
                exact
                to={routesData[4].path}
                className="header__btn_cart"
                activeClassName="header__btn_cart-active"
                role="button"
              >
                <FontAwesomeIcon icon={faShoppingCart} className="header__btn-title" />
                <p className="header__btn-title">{numOfGames}</p>
              </NavLink>
              <SignOutBtn />
            </>
          ) : (
            <>
              <SignInBtn />
              <SignUpBtn />
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
