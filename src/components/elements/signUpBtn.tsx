import React, { useState } from "react";
import "./signupbtn.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Modal from "./modal";
import InputText from "./inputText";

const SignUpBtn: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const showModalFunc = () => {
    setShowModal(!showModal);
  };

  const closeModalFunc = () => {
    setShowModal(false);
  };

  const signUpUrl = "http://localhost:3000/users";

  return (
    <div className="signUp__container">
      <button type="button" className="signUp__btn" onClick={showModalFunc}>
        <p className="signUp__title">Sign Up</p>
      </button>
      {showModal ? (
        <Modal>
          <div className="signUp__modal_container">
            <div className="signUp__modal_upper-container">
              <h1 className="signUp__modal_title">Registration</h1>
              <button className="signUp__modal_close-btn" type="button" onClick={closeModalFunc}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <form action={signUpUrl} className="signUp__modal_content-container">
              <InputText name="login" htmlFor="login" id="login" type="text" />
              <br />
              <InputText name="password" htmlFor="password" id="password" type="password" />
              <br />
              <InputText name="repeatpassword" htmlFor="repeatpassword" id="repeatpassword" type="password" />
              <br />
              <div className="signUp__modal_submit-btn-container">
                <input className="signUp__modal_submit-btn" type="submit" />
              </div>
            </form>
          </div>
        </Modal>
      ) : null}
    </div>
  );
};

export default SignUpBtn;
