import React from "react";
import { useDispatch, useSelector } from "react-redux";
import debounce from "lodash.debounce";
import "./searchbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";
import { faSpinner } from "@fortawesome/free-solid-svg-icons/faSpinner";
import { fetchGamesAction } from "../../redux/filter/actionsFilter";
import { FilterState } from "../../types/types";
import { ReducerState } from "../../redux/reducerRoot";

const SearchBar: React.FC = () => {
  const dispatch = useDispatch();
  const games: FilterState = useSelector((state: ReducerState) => state.filter);

  const updateQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    dispatch(fetchGamesAction(`?title_like=${value}`));
  };

  const debouncedOnChange = debounce(updateQuery, 300);

  return (
    <>
      <div className="searchBar__container">
        <div className="searchBar__icon-container">
          {games.loading ? (
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
export default SearchBar;
