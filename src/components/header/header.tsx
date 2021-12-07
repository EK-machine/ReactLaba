import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import "./header.css";
import { NavLink } from "react-router-dom";
import routesData from "../routesData";
import ProductsDropDown from "../productsDropDown";
import SignInBtn from "../elements/signInBtn";
import SignUpBtn from "../elements/signUpBtn";
import SignOutBtn from "../elements/signOutBtn";
import { HeaderProps } from "../../types/types";
import { logInAction, logOutAction } from "../../redux/actions";

const Header: React.FC<HeaderProps> = ({ loggedIn, userName, dispatchedLogInAction, dispatchedLogOutAction }) => (
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
            <SignOutBtn dispatchedLogOutAction={dispatchedLogOutAction} />
          </>
        ) : (
          <>
            <SignInBtn dispatchedLogInAction={dispatchedLogInAction} />
            <SignUpBtn dispatchedLogInAction={dispatchedLogInAction} />
          </>
        )}
      </div>
    </div>
  </header>
);

const mapStateToProps = (state: { signIn: { loggedIn: boolean; userName: string } }) => ({
  loggedIn: state.signIn.loggedIn,
  userName: state.signIn.userName,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  dispatchedLogInAction: (userName: string) => dispatch(logInAction(userName)),
  dispatchedLogOutAction: () => dispatch(logOutAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
