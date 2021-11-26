import React from "react";
import "./signinbtn.css";

const SignInBtn: React.FC = () => (
  <div className="signIn__container">
    <button type="button" className="signIn__btn">
      <p className="signIn__title">Sign In</p>
    </button>
  </div>
);

export default SignInBtn;
