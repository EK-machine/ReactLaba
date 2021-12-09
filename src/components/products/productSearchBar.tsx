import React, { useState } from "react";
import { useDispatch } from "react-redux";
import debounce from "lodash.debounce";
import "./productsearchbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { filterByCategoryAction } from "../../redux/actionsFilter";

const ProductSearchBar: React.FC = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");

  const updateQuery = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    const { value } = e.target;
    if (value === "") {
      const resp = await fetch("http://localhost:3000/games", { method: "GET" });
      const respJson = await resp.json();
      dispatch(filterByCategoryAction(respJson));
    } else {
      const resp = await fetch(`http://localhost:3000/games?title_like=${value}`, { method: "GET" });
      setQuery(value);
      const respJson = await resp.json();
      dispatch(
        filterByCategoryAction(
          respJson.filter(({ title }) => title.toLocaleLowerCase().includes(query.toLocaleLowerCase()))
        )
      );
    }
    setIsLoading(false);
  };

  const debouncedOnChange = debounce(updateQuery, 300);

  return (
    <>
      <div className="searchBar__container">
        <div className="searchBar__icon-container">
          {isLoading ? (
            <FontAwesomeIcon icon={faSpinner} className="searchBar__loading-icon" />
          ) : (
            <FontAwesomeIcon icon={faSearch} className="searchBar__search-icon" />
          )}
        </div>
        <input type="text" placeholder="Search" className="searchBar" onChange={debouncedOnChange} />
      </div>
    </>
  );
};
export default ProductSearchBar;
