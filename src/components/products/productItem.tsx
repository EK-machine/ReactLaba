import React from "react";
import "./productitem.css";
import { productItemProps } from "../../types/types";

const ProductItem: React.FC<productItemProps> = ({ title, developer, date, category }) => (
  <div className="productItem__container" onClick={() => alert("got product")}>
    <p className="productItem__paragraph">Title: {title}</p>
    <p className="productItem__paragraph">Developer: {developer}</p>
    <p className="productItem__paragraph">Release date: {date}</p>
    <p className="productItem__paragraph">Platforms: {category}</p>
  </div>
);

export default ProductItem;
