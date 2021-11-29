import React, { useState } from "react";
import "./signinbtn.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Modal from "./modal";
import InputText from "./inputText";
import { SignInBtnProps } from "../../types/types";

const SignInBtn: React.FC<SignInBtnProps> = ({ logInFunc }): JSX.Element => {
  const [showModal, setShowModal] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const showModalFunc = () => {
    setShowModal(true);
  };

  const closeModalFunc = () => {
    setShowModal(false);
  };

  const signInUrl = "http://localhost:3000/users";

  const loginGetter = (loginData: string) => {
    setLogin(loginData);
  };

  const passwordGetter = (passwordData: string) => {
    setPassword(passwordData);
  };

  const signInObj = { email: login, password };

  async function postFunc(e: React.SyntheticEvent) {
    if (e) {
      e.preventDefault();
    }
    const postResponse = await fetch(signInUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signInObj),
    });
    const response = await postResponse.json();
    console.log(response);
    return response;
  }

  return (
    <div className="signIn__container">
      <button type="button" className="signIn__btn" onClick={showModalFunc}>
        <p className="signIn__title">Sign In</p>
      </button>
      {showModal ? (
        <Modal>
          <div className="signIn__modal_container">
            <div className="signIn__modal_upper-container">
              <h1 className="signIn__modal_title">Authorization</h1>
              <button className="signIn__modal_close-btn" type="button" onClick={closeModalFunc}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <form action="#" className="signIn__modal_content-container" onSubmit={postFunc}>
              <InputText name="login" id="login" type="text" loginGetter={loginGetter} />
              <br />
              <InputText name="password" id="password" type="password" passwordGetter={passwordGetter} />
              <br />
              <div className="signIn__modal_submit-btn-container">
                <input className="signIn__modal_submit-btn" type="submit" />
              </div>
            </form>
          </div>
        </Modal>
      ) : null}
    </div>
  );
};

export default SignInBtn;
