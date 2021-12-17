import React from "react";
import "./signoutbtn.css";
// import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import routesData from "../routesData";
// import { logOutAction } from "../../redux/login/actionsLogin";

const SignOutBtn: React.FC = () => {
  // const dispatch = useDispatch();
  const history = useHistory();
  const handleCkick = () => {
    // dispatch(logOutAction());
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
