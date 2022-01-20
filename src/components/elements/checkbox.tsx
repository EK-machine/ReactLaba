import React from "react";
import { CheckboxProps } from "../../types/types";

const Checkbox: React.FC<CheckboxProps> = ({ name, checked, onChange, onKeyUp }) => (
  <label htmlFor={name} className="editModal__contentForm_labelPc">
    {name}
    <input
      type="checkbox"
      className="editModal__contentForm_PcCheck"
      checked={checked}
      onChange={onChange}
      onKeyUp={onKeyUp}
    />
  </label>
);

export default Checkbox;
