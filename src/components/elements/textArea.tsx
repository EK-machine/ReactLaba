import React from "react";
import "./textarea.css";
import { ProfileTextAreaProps } from "../../types/types";

const ProfileTextArea: React.FC<ProfileTextAreaProps> = ({ name, id, value, onChange }) => {
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

export default ProfileTextArea;
