import React from "react";
import "./productitem.css";

interface productItemProps {
  title: string;
  developer: string;
  date: string;
  category?: string;
}

const ProductItem: React.FC<productItemProps> = ({ title, developer, date, category }) => (
  <div className="productItem__container" onClick={() => alert("got product")}>
    <p className="productItem__paragraph">Title: {title}</p>
    <p className="productItem__paragraph">Developer: {developer}</p>
    <p className="productItem__paragraph">Release date: {date}</p>
    <p className="productItem__paragraph">Platforms: {category}</p>
  </div>
);

export default ProductItem;
