import React from "react";
import "./btn.css";

interface BtnProps {
  title: string;
  disabled?: boolean;
  onClick: () => void;
}

const Btn: React.FC<BtnProps> = ({ title, disabled, onClick }) => (
  <button type="button" disabled={disabled} className="btn" onClick={onClick}>
    {title}
  </button>
);
export default Btn;
