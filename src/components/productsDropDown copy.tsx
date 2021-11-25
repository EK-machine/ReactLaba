import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import "./productsDropDown.css";
import productsRoutesData from "./productsRoutesData";

const ProductsDropDown: React.FC = () => {
  const [toggle, setToggle] = useState(false);
  const clickHandler = () => {
    setToggle(!toggle);
  };

  const downButtonHandler = (e: React.KeyboardEvent): void => {
    if (e.key === "ArrowDown") {
      setToggle(!toggle);
    }
  };

  const upButtonHandler = (e: React.KeyboardEvent): void => {
    if (e.key === "ArrowUp") {
      setToggle(!toggle);
    }
  };

  useEffect(() => {
    window.addEventListener("keyup", downButtonHandler);
    return () => window.removeEventListener("keyup", downButtonHandler);
  }, []);

  useEffect(() => {
    window.addEventListener("keyup", upButtonHandler);
    return () => window.removeEventListener("keyup", upButtonHandler);
  }, []);

  return (
    <div className="productsDropDown__container">
      {toggle ? (
        <div
          onClick={clickHandler}
          onKeyUp={upButtonHandler}
          className="productsDropDown__btn-active"
          role="button"
          tabIndex={0}
        >
          <p className="productsDropDown__btn-title_acive">Products </p>
          <FontAwesomeIcon icon={faCaretUp} />
        </div>
      ) : (
        <div
          onClick={clickHandler}
          onKeyUp={downButtonHandler}
          className="productsDropDown__btn"
          role="button"
          tabIndex={0}
        >
          <p className="productsDropDown__btn-title">Products </p>
          <FontAwesomeIcon icon={faCaretDown} />
        </div>
      )}
      {toggle ? (
        <div className="productsDropDown__items-container">
          {productsRoutesData.map(({ text, path }) => (
            // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
            <div className="productsDropDown__item-wrapper" tabIndex={0}>
              <NavLink
                to={path}
                key={text}
                className="productsDropDown__item"
                activeClassName="productsDropDown__item-active"
              >
                <p className="productsDropDown__item-text">{text}</p>
              </NavLink>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default ProductsDropDown;
