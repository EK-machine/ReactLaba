import React from "react";
import "./inputnumberadmin.css";
import { InputNumberAdminProps } from "../../types/types";

const InputNumberAdmin: React.FC<InputNumberAdminProps> = ({ name, id, type, value, onChange }) => {
  const changeHandler = (event: React.FormEvent<HTMLInputElement>): void => {
    onChange(event.target.value);
  };

  return (
    <div className="inputNumberAdmin__container">
      <label htmlFor={id} className="inputNumberAdmin__label">
        {name}
      </label>
      <input
        name={name}
        id={id}
        type={type}
        value={value}
        onChange={changeHandler}
        className="inputNumberAdmin__input"
        autoComplete="off"
      />
    </div>
  );
};

export default InputNumberAdmin;
