import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./signupmodalbody.css";
import InputText from "../elements/inputText";
import routesData from "../routesData";
import { fetchLogUpAction } from "../../redux/login/actionsLogin";
import { closeModalAction } from "../../redux/modal/actionsModal";
import { ReducerState } from "../../redux/reducerRoot";
import help from "../../helpers/funcs";
import CloseBtn from "../elements/closeBtn";
import useFocusTrap from "../../helpers/useFocusTrap";

const SignUpModalBody: React.FC = () => {
  const [logup, setLogup] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [loginMessage, setLoginMessage] = useState<string>("Please enter login");
  const [passMessage, setPassMessage] = useState<string>("Please enter password");
  const [repeatPassMessage, setRepeatPassMessage] = useState<string>("Please repeat password");
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

  const logupGetter = (logupData: string) => {
    setLogup(logupData);
  };

  const passwordGetter = (passwordData: string) => {
    setPassword(passwordData);
  };

  const repeatPasswordGetter = (passwordData: string) => {
    setRepeatPassword(passwordData);
  };

  useEffect(() => {
    setLoginMessage(help.verifyName(logup, "signinout"));
    setPassMessage(help.verifyPassword(password, "signinout"));
    setRepeatPassMessage(help.comparePass(password, repeatPassword, "signinout"));
  }, [logup, password, repeatPassword]);

  useEffect(() => {
    setFormValid(help.formValidSignUp(loginMessage, passMessage, repeatPassMessage));
  }, [loginMessage, passMessage, repeatPassMessage]);

  async function postFunc(e: React.SyntheticEvent) {
    if (e) {
      e.preventDefault();
    }

    const getResponse = await fetch("http://localhost:3000/users", { method: "GET" });
    const allUsersArr = await getResponse.json();
    const userMatch = allUsersArr.find((user: { login: string }) => user.login === logup);

    if (userMatch) {
      setLoginMessage(`Sorry, the name "${logup}" already exists. Please try another name`);
      return;
    }
    dispatch(fetchLogUpAction(logup, password));
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <div className="signUp__modal_container" ref={outerTabRef} onKeyDown={focusTrap} role="note">
      <CloseBtn title="Registration" closeHandler={closeModalHandler} />
      <form action="#" className="signUp__modal_content-container" onSubmit={postFunc}>
        <InputText name="Login" id="SignUplogin" type="text" onChange={logupGetter} value={logup} />
        <span className="signUp__message">{loginMessage}</span>
        <InputText name="Password" id="SignUpPassword" type="password" onChange={passwordGetter} value={password} />
        <span className="signUp__message">{passMessage}</span>
        <InputText
          name="Repeat password"
          id="SignUpRepeatPassword"
          type="password"
          onChange={repeatPasswordGetter}
          value={repeatPassword}
        />
        <span className="signUp__message">{repeatPassMessage}</span>
        <br />
        <div className="signUp__modal_submit-btn-container">
          <input className="signUp__modal_submit-btn" type="submit" disabled={!formValid} />
        </div>
      </form>
    </div>
  );
};

export default SignUpModalBody;
