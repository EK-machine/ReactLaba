import React from "react";
import { Link } from "react-router-dom";
import "./category.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Category: React.FC = ({ icon, title, path }) => (
  <Link to={path} key={title} className="category__container">
    <div className="category__frame">
      <div className="category__icon-container">
        <FontAwesomeIcon icon={icon} className="category__icon" />
      </div>
      <div className="category__title-container">
        <p className="category__title">{title}</p>
      </div>
    </div>
  </Link>
);

export default Category;
