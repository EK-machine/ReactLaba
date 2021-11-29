import React, { useState } from "react";
import "./inputtext.css";
import { InputProps } from "../../types/types";

const InputText: React.FC<InputProps> = ({ name, id, type, loginGetter, passwordGetter }) => {
  const [value, setValue] = useState("");
  const changeHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    loginGetter(event.target.value);
    passwordGetter(event.target.value);
  };

  return (
    <div className="inputText__container">
      <label htmlFor={id} className="inputText__label">
        {name}
      </label>
      <input
        name={name}
        id={id}
        type={type}
        value={value}
        onChange={changeHandler}
        className="inputText__input"
        autoComplete="off"
      />
    </div>
  );
};

export default InputText;
