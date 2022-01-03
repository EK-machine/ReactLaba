import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./changeuserpicmodalbody.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import { closeModalAction } from "../../redux/modal/actionsModal";
import { fetchLogInAction } from "../../redux/login/actionsLogin";
import InputText from "../elements/inputText";
import { ReducerState } from "../../redux/reducerRoot";

const ChangeUserPicModalBody: React.FC = () => {
  const userName = useSelector((state: ReducerState) => state.signIn.userName);
  const [userPic, setUserPic] = useState<string>("");
  const [newUserPic, setNewUserPic] = useState<string>("");
  const [formValid, setFormValid] = useState<boolean>(false);
  const [currentId, setCurrentId] = useState<number>(0);
  const [currentPass, setCurrentPass] = useState<string>("");
  const dispatch = useDispatch();

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
    if (newUserPic.length > 0) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
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
    <div className="changePic__modal_container">
      <div className="changePic__modal_upper-container">
        <h1 className="changePic__modal_title">Change avatar</h1>
        <button className="changePic__modal_close-btn" type="button" onClick={() => dispatch(closeModalAction())}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
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
