import React from "react";
import "./signinbtn.css";
import Modal from "./modal";
import SignInModalBody from "./signInModalBody";
import { SignInBtnProps } from "../../types/types";

const SignInBtn: React.FC<SignInBtnProps> = ({ logInFunc, showModalFunc, closeModalFunc, showModal }): JSX.Element => {
  const showModalHandler = () => {
    showModalFunc();
  };

  const closeModalHandler = () => {
    closeModalFunc();
  };

  return (
    <div className="signIn__container">
      <button type="button" className="signIn__btn" onClick={showModalHandler}>
        <p className="signIn__title">Sign In</p>
      </button>
      {showModal ? (
        <Modal>
          <SignInModalBody logInFunc={logInFunc} closeModalFunc={closeModalHandler} />
        </Modal>
      ) : null}
    </div>
  );
};

export default SignInBtn;
