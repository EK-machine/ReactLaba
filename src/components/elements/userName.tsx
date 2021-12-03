import React from "react";
import "./username.css";
import { UserNameProps } from "../../types/types";

const UserName: React.FC<UserNameProps> = ({ userName }) => (
  <div className="userName__container">
    <p className="userName__title">{userName}</p>
  </div>
);

export default UserName;
