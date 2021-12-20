import React from "react";
import { useDispatch } from "react-redux";
import "./signupbtn.css";
import { showSignUpModalAction } from "../../redux/modal/actionsModal";

const SignUpBtn: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <div className="signUp__container">
      <button type="button" className="signUp__btn" onClick={() => dispatch(showSignUpModalAction())}>
        <p className="signUp__title">Sign Up</p>
      </button>
    </div>
  );
};

export default SignUpBtn;
