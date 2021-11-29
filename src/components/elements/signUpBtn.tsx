import React, { useState } from "react";
import "./signupbtn.css";
import Modal from "./modal";
import { SignUpBtnProps } from "../../types/types";
import SignUpModalBody from "./signUpModalBody";

const SignUpBtn: React.FC<SignUpBtnProps> = ({ logInFunc }) => {
  const [showModal, setShowModal] = useState(false);

  const showModalFunc = () => {
    setShowModal(true);
  };

  const closeModalFunc = () => {
    setShowModal(false);
  };

  return (
    <div className="signUp__container">
      <button type="button" className="signUp__btn" onClick={showModalFunc}>
        <p className="signUp__title">Sign Up</p>
      </button>
      {showModal ? (
        <Modal>
          <SignUpModalBody logInFunc={logInFunc} closeModalFunc={closeModalFunc} />
        </Modal>
      ) : null}
    </div>
  );
};

export default SignUpBtn;
