import React from "react";
import { useDispatch } from "react-redux";
import "./signinbtn.css";
import { SignInBtnProps } from "../../types/types";
import { showSignInModalAction } from "../../redux/modal/actionsModal";

const SignInBtn: React.FC<SignInBtnProps> = () => {
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
