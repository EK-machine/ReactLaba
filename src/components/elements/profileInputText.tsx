import React from "react";
import "./profileinputtext.css";
import { InputProps } from "../../types/types";

const ProfileInputText: React.FC<InputProps> = ({ name, id, type, value, onChange }) => {
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onChange(event.target?.value);
  };

  return (
    <div className="profileInputText__container">
      <label htmlFor={id} className="profileInputText__label">
        {name}
      </label>
      <input
        name={name}
        id={id}
        type={type}
        value={value}
        onChange={changeHandler}
        className="profileInputText__input"
        autoComplete="off"
      />
    </div>
  );
};

export default ProfileInputText;
