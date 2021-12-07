import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./signinmodalbody.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import InputText from "./inputText";
import routesData from "../routesData";
import { closeModalAction, logInAction } from "../../redux/actions";
import { ReducerState } from "../../redux/reducer";

const SignInModalBody: React.FC = () => {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState("Please enter password");
  const loggedIn = useSelector((state: ReducerState) => state.signIn.loggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    if (loggedIn) {
      dispatch(closeModalAction());
    }
  }, [loggedIn]);

  const closeLogIn = () => dispatch(closeModalAction());
  const dispatchedLogInAction = (userName: string) => dispatch(logInAction(userName));
  const history = useHistory();
  const closeModalHandler = () => {
    closeLogIn();
    history.push(routesData[0].path);
  };

  const signInUrl = "http://localhost:3000/users";

  const loginGetter = (loginData: string) => {
    setLogin(loginData);
  };

  const passwordGetter = (passwordData: string) => {
    setPassword(passwordData);
  };

  const signInObj = { login, password };

  const verifyPassword = (pass: string) => {
    const alphNumPass = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    if (!pass) {
      return { isValid: false, validMessage: "Please enter password" };
    }
    if (pass.length < 8 || pass.length > 15) {
      return { isValid: false, validMessage: "Password must be between 8 and 15 characters" };
    }
    if (pass[0].toUpperCase() !== pass[0]) {
      return { isValid: false, validMessage: "First character of password must be capital" };
    }
    if (!alphNumPass.test(pass)) {
      return { isValid: false, validMessage: "At least 1 character of password must be numeric or alphabetic" };
    }
    return { isValid: true, validMessage: "Success" };
  };

  async function postFunc(e: React.SyntheticEvent) {
    if (e) {
      e.preventDefault();
    }

    if (!verifyPassword(password).isValid) {
      setMessage(verifyPassword(password).validMessage);
    } else {
      setMessage(verifyPassword(password).validMessage);
      const postResponse = await fetch(signInUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signInObj),
      });

      if (postResponse.status === 201) {
        dispatchedLogInAction(login);
      } else {
        throw new Error(`HTTP status: ${postResponse.status}`);
      }

      const response = await postResponse.json();
      return response;
    }
    return null;
  }

  return (
    <div className="signIn__modal_container">
      <div className="signIn__modal_upper-container">
        <h1 className="signIn__modal_title">Authorization</h1>
        <button className="signIn__modal_close-btn" type="button" onClick={closeModalHandler}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      <form action="#" className="signIn__modal_content-container" onSubmit={postFunc}>
        <span>{message}</span>
        <br />
        <InputText name="Login" id="SignInLogin" type="text" onChange={loginGetter} value={login} />
        <br />
        <InputText name="Password" id="SignInPassword" type="password" onChange={passwordGetter} value={password} />
        <br />
        <div className="signIn__modal_submit-btn-container">
          <input className="signIn__modal_submit-btn" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default SignInModalBody;
