import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./changepassmodalbody.scss";
import { closeModalAction } from "../../redux/modal/actionsModal";
import InputText from "../elements/inputText";
import { ReducerState } from "../../redux/reducerRoot";
import help from "../../helpers/funcs";
import CloseBtn from "../elements/closeBtn";
import useFocusTrap from "../../helpers/useFocusTrap";

const ChangePassModalBody: React.FC = () => {
  const userName = useSelector((state: ReducerState) => state.signIn.userName);
  const [newPassword, setNewPassword] = useState<string>("");
  const [repeatNewPassword, setRepeatNewPassword] = useState<string>("");
  const [passMessage, setPassMessage] = useState<string>("Please enter new password");
  const [repeatPassMessage, setRepeatPassMessage] = useState<string>("Please repeat new password");
  const [formValid, setFormValid] = useState<boolean>(false);
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [currentId, setCurrentId] = useState();
  const dispatch = useDispatch();

  const outerTabRef = useRef<HTMLDivElement | null>(null);
  const topTabRef = useRef<HTMLElement | null>(null);
  const bottomTabRef = useRef<HTMLElement | null>(null);

  const closeChangePass = () => {
    dispatch(closeModalAction());
  };

  const focusTrap = useFocusTrap(outerTabRef, topTabRef, bottomTabRef, closeChangePass, formValid);

  useEffect(() => {
    const currenUserFetch = async () => {
      const currentUserResp = await fetch(`http://localhost:3000/users?login_like=${userName}`, { method: "GET" });
      const currentUserRespJson = await currentUserResp.json();
      const [{ password, id }] = currentUserRespJson;
      setCurrentPassword(password);
      setCurrentId(id);
    };
    currenUserFetch();
  }, []);

  const passwordGetter = (passwordData: string) => {
    setNewPassword(passwordData);
  };

  const repeatPasswordGetter = (passwordData: string) => {
    setRepeatNewPassword(passwordData);
  };

  useEffect(() => {
    setPassMessage(help.verifyPassword(newPassword, "change"));
    setRepeatPassMessage(help.comparePass(newPassword, repeatNewPassword, "change"));
  }, [newPassword, repeatNewPassword]);

  useEffect(() => {
    setFormValid(help.formValidPass(passMessage, repeatPassMessage));
  }, [passMessage, repeatPassMessage]);

  async function changeFunc(e: React.SyntheticEvent) {
    if (e) {
      e.preventDefault();
    }

    const password = repeatNewPassword || currentPassword;

    const patchResponse = await fetch(`http://localhost:3000/users/${currentId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });

    if (patchResponse.status === 404) {
      throw new Error(`HTTP status: ${patchResponse.status}`);
    }
    dispatch(closeModalAction());
    return null;
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <div className="changePass__modal_container" ref={outerTabRef} onKeyDown={focusTrap} role="note">
      <CloseBtn title="Change password" closeHandler={closeChangePass} />
      <form action="#" className="changePass__modal_content-container" onSubmit={changeFunc}>
        <InputText name="Password" id="SignUpPassword" type="password" onChange={passwordGetter} value={newPassword} />
        <span className="changePass__message">{passMessage}</span>
        <br />
        <InputText
          name="Repeat password"
          id="SignUpRepeatPassword"
          type="password"
          onChange={repeatPasswordGetter}
          value={repeatNewPassword}
        />
        <span className="changePass__message">{repeatPassMessage}</span>
        <br />
        <div className="changePass__modal_submit-btn-container">
          <input className="changePass__modal_submit-btn" type="submit" disabled={!formValid} />
        </div>
      </form>
    </div>
  );
};

export default ChangePassModalBody;
