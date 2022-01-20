import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./changeuserpicmodalbody.css";
import { closeModalAction } from "../../redux/modal/actionsModal";
import { fetchLogInAction } from "../../redux/login/actionsLogin";
import InputText from "../elements/inputText";
import { ReducerState } from "../../redux/reducerRoot";
import help from "../../helpers/funcs";
import CloseBtn from "../elements/closeBtn";
import useFocusTrap from "../../helpers/useFocusTrap";

const ChangeUserPicModalBody: React.FC = () => {
  const userName = useSelector((state: ReducerState) => state.signIn.userName);
  const [userPic, setUserPic] = useState<string>("");
  const [newUserPic, setNewUserPic] = useState<string>("");
  const [formValid, setFormValid] = useState<boolean>(false);
  const [currentId, setCurrentId] = useState<number>(0);
  const [currentPass, setCurrentPass] = useState<string>("");
  const dispatch = useDispatch();

  const outerTabRef = useRef<HTMLDivElement | null>(null);
  const topTabRef = useRef<HTMLElement | null>(null);
  const bottomTabRef = useRef<HTMLElement | null>(null);

  const closeChangeUserPic = () => {
    dispatch(closeModalAction());
  };

  const focusTrap = useFocusTrap(outerTabRef, topTabRef, bottomTabRef, closeChangeUserPic, formValid);

  useEffect(() => {
    const currenUserFetch = async () => {
      const currentUserResp = await fetch(`http://localhost:3000/users?login_like=${userName}`, { method: "GET" });
      const currentUserRespJson = await currentUserResp.json();
      const [{ id, imgUrl, password }] = currentUserRespJson;
      setCurrentId(id);
      setUserPic(imgUrl);
      setCurrentPass(password);
    };
    currenUserFetch();
  }, []);

  const picUrlGetter = (picUrl: string) => {
    setNewUserPic(picUrl);
  };

  useEffect(() => {
    setFormValid(help.formValidPic(newUserPic));
  }, [newUserPic]);

  async function changePicFunc(e: React.SyntheticEvent) {
    if (e) {
      e.preventDefault();
    }

    const imgUrl = newUserPic || userPic;

    const patchResponse = await fetch(`http://localhost:3000/users/${currentId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imgUrl }),
    });

    if (patchResponse.status === 404) {
      throw new Error(`HTTP status: ${patchResponse.status}`);
    }
    dispatch(closeModalAction());
    dispatch(fetchLogInAction(userName, currentPass));
    return null;
  }

  const userAvatar = newUserPic || userPic;

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <div className="changePic__modal_container" ref={outerTabRef} onKeyDown={focusTrap} role="note">
      <CloseBtn title="Change avatar" closeHandler={closeChangeUserPic} />
      <div className="changePic__modal_picContainer">
        <img src={userAvatar} alt={`Avatar of ${userName}`} />
      </div>
      <form action="#" className="changePic__modal_content-container" onSubmit={changePicFunc}>
        <InputText name="Change avatar" id="changeUserPic" type="text" onChange={picUrlGetter} value={newUserPic} />
        <div className="changePic__modal_submit-btn-container">
          <input className="changePic__modal_submit-btn" type="submit" disabled={!formValid} />
        </div>
      </form>
    </div>
  );
};

export default ChangeUserPicModalBody;
