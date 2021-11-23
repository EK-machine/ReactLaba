import React, { useState } from "react";
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

  return (
    <div className="productsDropDown__container">
      {toggle ? (
        <div onClick={clickHandler} className="productsDropDown__btn-active" role="button">
          <p className="productsDropDown__btn-title_acive">Products </p>
          <FontAwesomeIcon icon={faCaretUp} />
        </div>
      ) : (
        <div onClick={clickHandler} className="productsDropDown__btn" role="button">
          <p className="productsDropDown__btn-title">Products </p>
          <FontAwesomeIcon icon={faCaretDown} />
        </div>
      )}
      {toggle ? (
        <div className="productsDropDown__items-container">
          {productsRoutesData.map(({ text, path }) => (
            <NavLink
              to={path}
              key={text}
              className="productsDropDown__item"
              activeClassName="productsDropDown__item-active"
            >
              <p className="productsDropDown__item-text">{text}</p>
            </NavLink>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default ProductsDropDown;
