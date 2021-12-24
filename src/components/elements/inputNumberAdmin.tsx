import React from "react";
import "./inputnumberadmin.css";
import { InputNumberAdminProps } from "../../types/types";

const InputNumberAdmin: React.FC<InputNumberAdminProps> = ({ name, id, type, value, onChange }) => {
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onChange(Number(event.target.value));
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
        step="0.01"
        min="0.01"
        max="999"
        onChange={changeHandler}
        className="inputNumberAdmin__input"
        autoComplete="off"
      />
    </div>
  );
};

export default InputNumberAdmin;
