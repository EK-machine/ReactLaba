import React, { useState, useEffect } from "react";
import debounce from "lodash.debounce";
import "./searchBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSpinner } from "@fortawesome/free-solid-svg-icons";
import GameCard from "../gameCard";

interface Game {
  id: number;
  title: string;
  developer: string;
  date: string;
}

const startFetchUrl = "http://localhost:3000/games";

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const [list, setList] = useState<Array<Game>>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function startingFetch() {
      const startFetch = await fetch(startFetchUrl);
      const startFetchJson = await startFetch.json();
      setList(startFetchJson);
    }
    startingFetch();
  }, []);

  const updateQuery = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    const { value } = e.target;
    const resp = await fetch(`http://localhost:3000/games?title_like=${value}`, { method: "GET" });
    setQuery(value);
    const respJson = await resp.json();
    setList(respJson);
    setIsLoading(false);
  };

  const debouncedOnChange = debounce(updateQuery, 300);

  const mockDataFiltered = list.filter(({ title }) => title.toLocaleLowerCase().includes(query.toLocaleLowerCase()));

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
      <div className="searchBar__results-container">
        {mockDataFiltered.length === 0 ? (
          <p>no results...</p>
        ) : (
          mockDataFiltered.map(({ id, title, developer, date }) => (
            <GameCard key={id} title={title} developer={developer} date={date} />
          ))
        )}
      </div>
    </>
  );
};

export default SearchBar;
