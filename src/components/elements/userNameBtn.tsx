import React from "react";
import { useHistory } from "react-router-dom";
import "./usernamebtn.css";
import { UserNameBtnProps } from "../../types/types";
import routesData from "../routesData";

const UserNameBtn: React.FC<UserNameBtnProps> = ({ userName }) => {
  const history = useHistory();
  const clickHandler = () => {
    history.push(routesData[3].path);
  };
  return (
    <div className="userName__container">
      <button type="button" className="userName__btn" onClick={clickHandler}>
        <p className="userName__title">{userName}</p>
      </button>
    </div>
  );
};

export default UserNameBtn;
