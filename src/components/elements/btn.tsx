import React from "react";
import "./btn.scss";
import { BtnProps } from "../../types/types";

const Btn: React.FC<BtnProps> = ({ title, disabled, onClick }) => (
  <button type="button" disabled={disabled} className="btn" onClick={onClick}>
    {title}
  </button>
);
export default Btn;
