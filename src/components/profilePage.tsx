import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showChangePassModalAction, logInAction } from "../redux/actions";
import "./profilepage.css";
import { ReducerState } from "../redux/reducer";
import ProfileInputText from "./elements/profileInputText";
import ProfileTextArea from "./elements/ProfileTextArea";

const ProfilePage: React.FC = () => {
  const userName = useSelector((state: ReducerState) => state.signIn.userName);
  const [currentName, setCurrentName] = useState("");
  const [currentId, setCurrentId] = useState();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const dispatchedLogInAction = (newUserName: string) => dispatch(logInAction(newUserName));

  useEffect(() => {
    const currenUserFetch = async () => {
      const currentUserResp = await fetch(`http://localhost:3000/users?login_like=${userName}`, { method: "GET" });
      const currentUserRespJson = await currentUserResp.json();
      const [{ login, id }] = currentUserRespJson;
      setCurrentName(login);
      setCurrentId(id);
    };
    currenUserFetch();
  }, []);

  const userNameGetter = (inputName: string) => {
    setName(inputName);
  };
  const descriptionGetter = (inputName: string) => {
    setDescription(inputName);
  };

  const updatedName = name || currentName;

  const userObj = { id: currentId, login: updatedName, description };

  async function saveHandler() {
    const patchResponse = await fetch(`http://localhost:3000/users/${currentId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObj),
    });

    if (patchResponse.status === 404) {
      throw new Error(`HTTP status: ${patchResponse.status}`);
    }
    dispatchedLogInAction(updatedName);
  }

  return (
    <div className="profilePage__container">
      <div className="profilePage__inner-container">
        <section className="profilePage__upperSectiopn">
          <h1 className="profilePage__userName_title">{userName}</h1>
        </section>
        <section className="profilePage__lowerSectiopn">
          <div className="profilePage__picSection">
            <div className="profilePage__picSection_pic">
              <div>no picture</div>
            </div>
            <button type="button" className="profilePage__picSection_changePicBtn">
              <p>Change profile image</p>
            </button>
          </div>
          <div className="profilePage__editSection">
            <ProfileInputText name="Username" id="UserName" type="text" onChange={userNameGetter} value={name} />
            <ProfileTextArea
              name="Profile description"
              id="Description"
              onChange={descriptionGetter}
              value={description}
            />
          </div>
          <div className="profilePage__btnsSection">
            <button type="button" className="profilePage__btnsSection_saveBtn" onClick={saveHandler}>
              <p>Save profile</p>
            </button>
            <button
              type="button"
              className="profilePage__btnsSection_changePassBtn"
              onClick={() => dispatch(showChangePassModalAction())}
            >
              <p>Change password</p>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProfilePage;
