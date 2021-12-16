import React from "react";
import "./inputtextadmin.css";
import { InputProps } from "../../types/types";

const InputTextAdmin: React.FC<InputProps> = ({ name, id, type, value, onChange }) => {
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onChange(event.target?.value);
  };

  return (
    <div className="inputTextAdmin__container">
      <label htmlFor={id} className="inputTextAdmin__label">
        {name}
      </label>
      <input
        name={name}
        id={id}
        type={type}
        value={value}
        onChange={changeHandler}
        className="inputTextAdmin__input"
        autoComplete="off"
      />
    </div>
  );
};

export default InputTextAdmin;
