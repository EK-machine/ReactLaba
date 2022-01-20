import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./signinmodalbody.scss";
import InputText from "../elements/inputText";
import routesData from "../routesData";
import { closeModalAction } from "../../redux/modal/actionsModal";
import { fetchLogInAction } from "../../redux/login/actionsLogin";
import { ReducerState } from "../../redux/reducerRoot";
import help from "../../helpers/funcs";
import CloseBtn from "../elements/closeBtn";
import useFocusTrap from "../../helpers/useFocusTrap";

const SignInModalBody: React.FC = () => {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginMessage, setLoginMessage] = useState<string>("Please enter login");
  const [passMessage, setPassMessage] = useState<string>("Please enter password");
  const [formValid, setFormValid] = useState<boolean>(false);
  const loggedIn = useSelector((state: ReducerState) => state.signIn.loggedIn);
  const dispatch = useDispatch();

  const outerTabRef = useRef<HTMLDivElement | null>(null);
  const topTabRef = useRef<HTMLElement | null>(null);
  const bottomTabRef = useRef<HTMLElement | null>(null);

  const closeLogIn = () => dispatch(closeModalAction());

  const focusTrap = useFocusTrap(outerTabRef, topTabRef, bottomTabRef, closeLogIn, formValid);

  useEffect(() => {
    if (loggedIn) {
      dispatch(closeModalAction());
    }
  }, [loggedIn]);
  const history = useHistory();
  const closeModalHandler = () => {
    closeLogIn();
    history.push(routesData[0].path);
  };

  const loginGetter = (loginData: string) => {
    setLogin(loginData);
  };

  const passwordGetter = (passwordData: string) => {
    setPassword(passwordData);
  };

  useEffect(() => {
    setLoginMessage(help.verifyName(login, "signinout"));
    setPassMessage(help.verifyPassword(password, "signinout"));
  }, [login, password]);

  useEffect(() => {
    setFormValid(help.formValidSignIn(loginMessage, passMessage));
  }, [loginMessage, passMessage]);

  async function logInFunc(e: React.SyntheticEvent) {
    if (e) {
      e.preventDefault();
    }

    const getResponse = await fetch("http://localhost:3000/users", { method: "GET" });
    const allUsersArr = await getResponse.json();
    const userMatch = allUsersArr.find(
      (user: { login: string; password: string }) => user.login === login && user.password === password
    );
    if (typeof userMatch === "undefined") {
      setLoginMessage("Login or password is not correct. Please try again.");
      setPassMessage("Login or password is not correct. Please try again.");
      return;
    }
    dispatch(fetchLogInAction(login, password));
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <div className="signIn__modal_container" ref={outerTabRef} onKeyDown={focusTrap} role="note">
      <CloseBtn title="Authorization" closeHandler={closeModalHandler} />
      <form action="#" className="signIn__modal_content-container" onSubmit={logInFunc}>
        <InputText name="Login" id="SignInLogin" type="text" onChange={loginGetter} value={login} />
        <span className="signIn__message">{loginMessage}</span>
        <InputText name="Password" id="SignInPassword" type="password" onChange={passwordGetter} value={password} />
        <span className="signIn__message">{passMessage}</span>
        <br />
        <div className="signIn__modal_submit-btn-container">
          <input className="signIn__modal_submit-btn" type="submit" disabled={!formValid} />
        </div>
      </form>
    </div>
  );
};

export default SignInModalBody;
