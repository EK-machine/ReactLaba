import React, { useState } from "react";
import { useDispatch } from "react-redux";
import debounce from "lodash.debounce";
import "./productsearchbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { fetchGamesAction } from "../../redux/actionsFilter";

const ProductSearchBar: React.FC = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const updateQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    const { value } = e.target;
    dispatch(fetchGamesAction(`?title_like=${value}`));
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
