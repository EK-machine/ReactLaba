import React from "react";
import { useDispatch } from "react-redux";
import "./signinbtn.scss";
import { showSignInModalAction } from "../../redux/modal/actionsModal";

const SignInBtn: React.FC = () => {
  const dispatch = useDispatch();
  return (
    <div className="signIn__container">
      <button type="button" className="signIn__btn" onClick={() => dispatch(showSignInModalAction())}>
        <p className="signIn__title">Sign In</p>
      </button>
    </div>
  );
};

export default SignInBtn;
