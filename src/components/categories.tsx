import React from "react";
import Category from "./category";

const Categories: React.FC = () => (
  <div className="categories__container">
    <div className="categories__title-container">
      <h1 className="categories__title">Categories</h1>
    </div>
    <div className="categories__content-container">
      <Category />
      <Category />
      <Category />
    </div>
  </div>
);

export default Categories;
