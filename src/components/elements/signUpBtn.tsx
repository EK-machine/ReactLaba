import React from "react";
import "./signupbtn.css";
import { useHistory } from "react-router-dom";
import Modal from "./modal";
import { SignUpBtnProps } from "../../types/types";
import SignUpModalBody from "./signUpModalBody";
import routesData from "../routesData";

const SignUpBtn: React.FC<SignUpBtnProps> = ({ logInFunc, showSignUpModalFunc, closeModalFunc, showSignUpModal }) => {
  const history = useHistory();

  const showModalHandler = () => {
    showSignUpModalFunc();
  };

  const closeModalHandler = () => {
    closeModalFunc();
    history.push(routesData[0].path);
  };

  return (
    <div className="signUp__container">
      <button type="button" className="signUp__btn" onClick={showModalHandler}>
        <p className="signUp__title">Sign Up</p>
      </button>
      {showSignUpModal ? (
        <Modal>
          <SignUpModalBody logInFunc={logInFunc} closeModalFunc={closeModalHandler} />
        </Modal>
      ) : null}
    </div>
  );
};

export default SignUpBtn;
