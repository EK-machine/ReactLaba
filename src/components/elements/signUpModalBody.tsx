import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./signupmodalbody.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import InputText from "./inputText";
import routesData from "../routesData";
import { closeModalAction, logInAction } from "../../redux/actions";
import { ReducerState } from "../../redux/reducer";

const SignUpModalBody: React.FC = () => {
  const [logup, setLogup] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [loginMessage, setLoginMessage] = useState("Please enter login");
  const [passMessage, setPassMessage] = useState("Please enter password");
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

  const signUpUrl = "http://localhost:3000/users/1";

  const logupGetter = (logupData: string) => {
    setLogup(logupData);
  };

  const passwordGetter = (passwordData: string) => {
    setPassword(passwordData);
  };

  const repeatPasswordGetter = (passwordData: string) => {
    setRepeatPassword(passwordData);
  };

  const signUpObj = { login: logup, password };

  const verifyLogin = (log: string) => {
    if (!log) {
      return { isValid: false, validMessage: "Please enter login" };
    }
    if (log.length < 3 || log.length > 12) {
      return { isValid: false, validMessage: "Login must be between 3 and 12 characters" };
    }
    return { isValid: true, validMessage: "Success" };
  };

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

  async function putFunc(e: React.SyntheticEvent) {
    if (e) {
      e.preventDefault();
    }

    if (!(repeatPassword === password)) {
      setPassMessage("Password is not correct");
    } else if (!verifyLogin(logup).isValid || !verifyPassword(password).isValid) {
      setLoginMessage(verifyLogin(logup).validMessage);
      setPassMessage(verifyPassword(password).validMessage);
    } else {
      setLoginMessage(verifyLogin(logup).validMessage);
      setPassMessage(verifyPassword(password).validMessage);
      const putResponse = await fetch(signUpUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpObj),
      });

      if (putResponse.status === 200) {
        dispatchedLogInAction(logup);
      } else {
        throw new Error(`HTTP status: ${putResponse.status}`);
      }

      const response = await putResponse.json();
      history.push(routesData[3].path);
      return response;
    }
    return null;
  }

  return (
    <div className="signUp__modal_container">
      <div className="signUp__modal_upper-container">
        <h1 className="signUp__modal_title">Registration</h1>
        <button className="signUp__modal_close-btn" type="button" onClick={closeModalHandler}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      <form action="#" className="signUp__modal_content-container" onSubmit={putFunc}>
        <p>{loginMessage}</p>
        <InputText name="Login" id="SignUplogin" type="text" onChange={logupGetter} value={logup} />
        <p>{passMessage}</p>
        <InputText name="Password" id="SignUpPassword" type="password" onChange={passwordGetter} value={password} />
        <br />
        <InputText
          name="Repeat password"
          id="SignUpRepeatPassword"
          type="password"
          onChange={repeatPasswordGetter}
          value={repeatPassword}
        />
        <br />
        <div className="signUp__modal_submit-btn-container">
          <input className="signUp__modal_submit-btn" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default SignUpModalBody;
