import React, { useState } from "react";
import "./signinbtn.css";
import Modal from "./modal";
import SignInModalBody from "./signInModalBody";
import { SignInBtnProps } from "../../types/types";

const SignInBtn: React.FC<SignInBtnProps> = ({ logInFunc }): JSX.Element => {
  const [showModal, setShowModal] = useState(false);

  const showModalFunc = () => {
    setShowModal(true);
  };

  const closeModalFunc = () => {
    setShowModal(false);
  };

  return (
    <div className="signIn__container">
      <button type="button" className="signIn__btn" onClick={showModalFunc}>
        <p className="signIn__title">Sign In</p>
      </button>
      {showModal ? (
        <Modal>
          <SignInModalBody logInFunc={logInFunc} closeModalFunc={closeModalFunc} />
        </Modal>
      ) : null}
    </div>
  );
};

export default SignInBtn;
