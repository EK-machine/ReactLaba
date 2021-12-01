import React from "react";
import "./username.css";
import { UsaerNameProps } from "../../types/types";

const UserName: React.FC<UsaerNameProps> = ({ userName }) => (
  <div className="userName__container">
    <p className="userName__title">{userName}</p>
  </div>
);

export default UserName;
