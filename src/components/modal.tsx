import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

const Modal: React.FC = ({ children }) => {
  const [container] = useState(() => document.createElement("div"));
  useEffect(() => {
    document.getElementById("modal-root")?.appendChild(container);
    return () => {
      document.getElementById("modal-root")?.removeChild(container);
    };
  }, []);
  return ReactDOM.createPortal(children, container);
};

export default Modal;
