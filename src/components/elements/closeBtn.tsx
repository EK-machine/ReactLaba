import React from "react";
import "./closebtn.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";

interface closeBtnProps {
  title: string;
  closeHandler: () => void;
}

const CloseBtn: React.FC<closeBtnProps> = ({ title, closeHandler }) => (
  <div className="closeBtn__container">
    <h1 className="closeBtn__title">{title}</h1>
    <button className="closeBtn__btn" type="button" onClick={closeHandler}>
      <FontAwesomeIcon icon={faTimes} />
    </button>
  </div>
);
export default CloseBtn;
