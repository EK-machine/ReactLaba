import React from "react";
import { OptSelProps } from "../../types/types";

const OptionSelect: React.FC<OptSelProps> = ({ name, id, value, onChange, arr }) => (
  <label htmlFor={id} className="editModal__contentForm_labelGen">
    <p className="editModal__contentForm_paragraph">{name}</p>
    <select className="editModal__contentForm_genre" id={id} onChange={onChange} value={value}>
      {arr.map((gen) => (
        <option value={gen} key={gen}>
          {gen}
        </option>
      ))}
    </select>
  </label>
);

export default OptionSelect;
