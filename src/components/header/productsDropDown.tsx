/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons/faCaretDown";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons/faCaretUp";
import "./productsDropDown.css";
import productsRoutesData from "./productsRoutesData";

const ProductsDropDown: React.FC = () => {
  const [toggle, setToggle] = useState(false);
  const clickHandler = () => {
    setToggle(!toggle);
  };

  const buttonHandler = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setToggle(!toggle);
    }
  };

  return (
    <div className="productsDropDown__container">
      {toggle ? (
        <>
          <div
            onClick={clickHandler}
            onKeyUp={buttonHandler}
            className="productsDropDown__btn-active"
            role="button"
            tabIndex={0}
          >
            <p className="productsDropDown__btn-title_acive">Products </p>
            <FontAwesomeIcon icon={faCaretUp} />
          </div>
          <div className="productsDropDown__items-container">
            {productsRoutesData.map(({ text, path }) => (
              // eslint-disable-next-line jsx-a11y/tabindex-no-positive
              <div className="productsDropDown__item-wrapper" key={text} tabIndex={1}>
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
        </>
      ) : (
        <div
          onClick={clickHandler}
          onKeyUp={buttonHandler}
          className="productsDropDown__btn"
          role="button"
          tabIndex={0}
        >
          <p className="productsDropDown__btn-title">Products </p>
          <FontAwesomeIcon icon={faCaretDown} />
        </div>
      )}
    </div>
  );
};

export default ProductsDropDown;
