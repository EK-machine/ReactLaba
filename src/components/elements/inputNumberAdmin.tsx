import React from "react";
import "./inputnumberadmin.css";
import { InputNumberAdminProps } from "../../types/types";

const InputNumberAdmin: React.FC<InputNumberAdminProps> = ({ name, id, type, value, onChange }) => {
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

export default InputNumberAdmin;
