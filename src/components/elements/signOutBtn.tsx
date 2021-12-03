import React from "react";
import "./signoutbtn.css";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import { SignOutBtnProps } from "../../types/types";
import routesData from "../routesData";

const SignOutBtn: React.FC<SignOutBtnProps> = ({ dispatchedLogOutAction }) => {
  const history = useHistory();
  const handleCkick = () => {
    dispatchedLogOutAction();
    history.push(routesData[0].path);
    window.location.reload();
  };
  return (
    <div className="signOut__container">
      <button type="button" className="signOut__btn" onClick={handleCkick}>
        <FontAwesomeIcon icon={faDoorOpen} />
      </button>
    </div>
  );
};

export default SignOutBtn;
