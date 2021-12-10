import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./productspage.css";
import { useParams } from "react-router-dom";
import MainProductOutput from "./mainProductOutput";
import { RouteParams } from "../../types/types";
import ProductSearchBar from "./productSearchBar";
import GenreRadioButtons from "../elements/genreRadioButtons";
import AgeRadioButtons from "../elements/ageRadioButtons";
import CriteriaSelector from "../elements/criteriaSelector";
import { fetchGamesAction } from "../../redux/actionsFilter";

const ProductsPage: React.FC = () => {
  const dispatch = useDispatch();

  const { id } = useParams<RouteParams>();

  useEffect(() => {
    const partOfUrl = `?category_like=${id}`;
    dispatch(fetchGamesAction(partOfUrl));
  }, [id]);

  const categoryTitle = () => {
    if (id === "xbx") {
      return "Xbox";
    }
    if (id === "ps") {
      return "Playstation";
    }
    return id.toUpperCase();
  };

  return (
    <div className="productsPage__container">
      <section className="productsPage__leftContent_container">
        <form className="productsPage__sortTable">
          <div className="productsPage__sortTable_platform productsPage__sortTable_item">
            <h1 className="productsPage__sortTable_platformTitle sortTable_titleItem">{categoryTitle()}</h1>
          </div>
          <div className="productsPage__sortTable_criteria productsPage__sortTable_item">
            <div className="productsPage__sortTable_title">
              <p className="productsPage__sortTable_criteriaTitle sortTable_titleItem">Sort</p>
            </div>
            <div className="productsPage__sortTable_criteriaSelector sortTable_contentItem">
              <CriteriaSelector />
            </div>
          </div>
          <div className="productsPage_sortTable_genre productsPage__sortTable_item">
            <div className="productsPage__sortTable_title">
              <p className="productsPage__sortTable_genreTitle sortTable_titleItem">Genres</p>
            </div>
            <div className="productsPage__sortTable_genreSelector sortTable_contentItem">
              <GenreRadioButtons />
            </div>
          </div>
          <div className="productsPage_sortTable_age productsPage__sortTable_item">
            <div className="productsPage__sortTable_title">
              <p className="productsPage__sortTable_genreTitle sortTable_titleItem">Age</p>
            </div>
            <div className="productsPage__sortTable_genreSelector sortTable_contentItem">
              <AgeRadioButtons />
            </div>
          </div>
        </form>
      </section>
      <section className="productsPage__rightContent_container">
        <ProductSearchBar />
        <MainProductOutput />
      </section>
    </div>
  );
};

export default ProductsPage;
