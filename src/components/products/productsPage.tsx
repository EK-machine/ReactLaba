import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./productspage.css";
import { useParams } from "react-router-dom";
import MainProductOutput from "./mainProductOutput";
import { RouteParams } from "../../types/types";
import SearchBar from "./searchBar";
import GenreRadioButtons from "../elements/genreRadioButtons";
import AgeRadioButtons from "../elements/ageRadioButtons";
import CriteriaSelector from "../elements/criteriaSelector";
import { fetchGamesAction } from "../../redux/filter/actionsFilter";
import { ReducerState } from "../../redux/reducerRoot";
import { showEditModalAction } from "../../redux/modal/actionsModal";

const getUsersUrl = "http://localhost:3000/users";

const ProductsPage: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const currentUserName = useSelector((state: ReducerState) => state.signIn.userName);
  const dispatch = useDispatch();

  const { id } = useParams<RouteParams>();

  useEffect(() => {
    const partOfUrl = `?category_like=${id}`;
    dispatch(fetchGamesAction(partOfUrl));
  }, [id]);

  const userStatusGetter = async () => {
    const getResponse = await fetch(getUsersUrl, { method: "GET" });
    const usersResponse = await getResponse.json();
    const [{ login }] = usersResponse.filter((user: { role: string }) => user.role === "admin");
    if (login === currentUserName) {
      setIsAdmin(true);
    }
    setIsAdmin(false);
  };

  useEffect(() => {
    userStatusGetter();
  }, []);

  const categoryTitle = () => {
    if (id === "xbx") {
      return "Xbox";
    }
    if (id === "ps") {
      return "Playstation";
    }
    return id.toUpperCase();
  };

  const createHandler = () => {
    dispatch(showEditModalAction());
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
        {isAdmin ? (
          <div className="productsPage__rightContent_search">
            <SearchBar />
          </div>
        ) : (
          <div className="productsPage__rightContent_searchEdit">
            <SearchBar />
            <button className="productsPage__rightContent_editBtn" type="button" onClick={createHandler}>
              Create card
            </button>
          </div>
        )}
        <MainProductOutput />
      </section>
    </div>
  );
};

export default ProductsPage;
