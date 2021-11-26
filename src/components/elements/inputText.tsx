import React, { useState } from "react";
import "./inputtext.css";
import InputProps from "../../types/types";

const InputText: React.FC = ({ name, htmlFor, id, type }: InputProps) => {
  const [value, setValue] = useState<string>("");
  const changeHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <div className="inputText__container">
      <label htmlFor={htmlFor} className="inputText__label">
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
