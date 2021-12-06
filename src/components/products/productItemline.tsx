import React from "react";
import "./productitemline.css";
import { ProductItemProps } from "../../types/types";

const ProductItemLine: React.FC<ProductItemProps> = ({ title, developer, date, category }) => {
  const productAlert = () => {
    alert("got product");
  };

  const buttonHandler = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      productAlert();
    }
  };

  return (
    <div className="productItem__container" onClick={productAlert} onKeyUp={buttonHandler} tabIndex={0} role="button">
      <p className="productItem__paragraph">Title: {title}</p>
      <p className="productItem__paragraph">Developer: {developer}</p>
      <p className="productItem__paragraph">Release date: {date}</p>
      <p className="productItem__paragraph">Platforms: {category}</p>
    </div>
  );
};
export default ProductItemLine;
