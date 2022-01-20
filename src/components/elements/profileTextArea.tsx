import React from "react";
import "./profiletextarea.scss";
import { TextAreaProps } from "../../types/types";

const ProfileTextArea: React.FC<TextAreaProps> = ({ name, id, value, onChange }) => {
  const changeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    onChange(event.target?.value);
  };

  return (
    <div className="profileTextArea__container">
      <label htmlFor={id} className="profileTextArea__label">
        {name}
      </label>
      <textarea
        name={name}
        id={id}
        value={value}
        onChange={changeHandler}
        className="profileTextArea__textarea"
        autoComplete="off"
      />
    </div>
  );
};

export default ProfileTextArea;
