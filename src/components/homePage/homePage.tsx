import React from "react";
import "./homepage.scss";
import SearchBar from "../products/searchBar";
import Categories from "./categories";
import HomePageOutput from "./homePageOutput";

const HomePage: React.FC = () => (
  <div className="homePage__container">
    <div className="homePage__search-container">
      <SearchBar />
    </div>
    <div className="homePage__categories-container">
      <Categories />
    </div>
    <div className="homePage__new-container">
      <HomePageOutput />
    </div>
  </div>
);

export default HomePage;
