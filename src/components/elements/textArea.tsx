import React from "react";
import "./textarea.scss";
import { TextAreaProps } from "../../types/types";

const TextArea: React.FC<TextAreaProps> = ({ name, id, value, onChange }) => {
  const changeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    onChange(event.target?.value);
  };

  return (
    <div className="textArea__container">
      <label htmlFor={id} className="textArea__label">
        {name}
      </label>
      <textarea
        name={name}
        id={id}
        value={value}
        onChange={changeHandler}
        className="textArea__textarea"
        autoComplete="off"
      />
    </div>
  );
};

export default TextArea;
