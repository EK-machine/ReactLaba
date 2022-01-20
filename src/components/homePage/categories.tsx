import React from "react";
import "./categories.scss";
import { faDesktop } from "@fortawesome/free-solid-svg-icons/faDesktop";
import { faPlaystation } from "@fortawesome/free-brands-svg-icons/faPlaystation";
import { faXbox } from "@fortawesome/free-brands-svg-icons/faXbox";
import Category from "./category";

const gameCategories = [
  {
    title: "PC",
    icon: faDesktop,
    path: "/products/pc",
  },
  {
    title: "Playstation",
    icon: faPlaystation,
    path: "/products/ps",
  },
  {
    title: "Xbox",
    icon: faXbox,
    path: "/products/xbx",
  },
];

const Categories: React.FC = () => (
  <div className="categories__container">
    <div className="categories__title-container">
      <h1 className="categories__title">Categories</h1>
    </div>
    <div className="categories__content-container">
      {gameCategories.map(
        ({ title, icon, path }): JSX.Element => (
          <Category key={title} title={title} icon={icon} path={path} />
        )
      )}
    </div>
  </div>
);

export default Categories;
