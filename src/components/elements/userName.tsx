import React from "react";
import "./username.css";

interface UsaerNameProps {
  userName: string;
}

const UserName: React.FC<UsaerNameProps> = ({ userName }) => (
  <div className="userName__container">
    <p className="userName__title">{userName}</p>
  </div>
);

export default UserName;
