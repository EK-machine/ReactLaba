import React from "react";
import "./signoutbtn.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import { SignOutBtnProps } from "../../types/types";

const SignOutBtn: React.FC<SignOutBtnProps> = ({ logOutFunc }) => (
  <div className="signOut__container">
    <button type="button" className="signOut__btn" onClick={logOutFunc}>
      <FontAwesomeIcon icon={faDoorOpen} />
    </button>
  </div>
);

export default SignOutBtn;
