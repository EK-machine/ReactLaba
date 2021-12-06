import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showChangePassModalAction } from "../redux/actions";
import "./profilepage.css";
import { ReducerState } from "../redux/reducer";
import ProfileInputText from "./elements/profileInputText";
import ProfileTextArea from "./elements/ProfileTextArea";

const ProfilePage: React.FC = () => {
  const userName = useSelector((state: ReducerState) => state.signIn.userName);
  const changePassModalDispatch = useDispatch();
  const [name, setName] = useState(userName);
  const [description, setDescription] = useState("");
  const userNameGetter = (inputName: string) => {
    setName(inputName);
  };
  const descriptionGetter = (inputName: string) => {
    setDescription(inputName);
  };
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
            <button type="button" className="profilePage__btnsSection_saveBtn">
              <p>Save profile</p>
            </button>
            <button
              type="button"
              className="profilePage__btnsSection_changePassBtn"
              onClick={() => changePassModalDispatch(showChangePassModalAction())}
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
