import React, { useState } from "react";
import { useLocation, NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons/faCaretDown";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons/faCaretUp";
import "./productsDropDown.css";
import productsRoutesData from "./productsRoutesData";

const ProductsDropDown: React.FC = () => {
  const [toggle, setToggle] = useState<boolean>(false);
  const clickHandler = () => {
    setToggle(!toggle);
  };

  const location = useLocation().pathname;

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
            <FontAwesomeIcon icon={faCaretUp} className="productsDropDown__btn-arrow" />
          </div>
          <div className="productsDropDown__items-container">
            {productsRoutesData.map(({ text, path }) => (
              <NavLink
                to={path}
                key={text}
                tabIndex={0}
                className="productsDropDown__item"
                activeClassName="productsDropDown__item-active"
                onClick={clickHandler}
                onKeyUp={buttonHandler}
              >
                <p className="productsDropDown__item-text">{text}</p>
              </NavLink>
            ))}
          </div>
        </>
      ) : (
        <div
          onClick={clickHandler}
          onKeyUp={buttonHandler}
          className={location.includes("product") ? "productsDropDown__btn-activePage" : "productsDropDown__btn"}
          role="button"
          tabIndex={0}
        >
          <p className="productsDropDown__btn-title">Products </p>
          <FontAwesomeIcon icon={faCaretDown} className="productsDropDown__btn-arrow" />
        </div>
      )}
    </div>
  );
};

export default ProductsDropDown;
