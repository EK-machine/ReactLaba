import React, { useState } from "react";
import debounce from "lodash.debounce";
import "./searchBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import GameCard from "../gameCard";

interface Game {
  id: number;
  title: string;
  developer: string;
  date: string;
}

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const [list, setList] = useState<Array<Game>>([]);
  const [isLoading, setIsLoading] = useState(false);

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
          {isLoading ? <h1>loading...</h1> : <FontAwesomeIcon icon={faSearch} className="searchBar__icon" />}
        </div>
        <input type="text" placeholder="Search" className="searchBar" onChange={debouncedOnChange} />
      </div>
      {mockDataFiltered.length === 0 ? (
        <p>no results...</p>
      ) : (
        mockDataFiltered.map(({ id, title, developer, date }) => (
          <GameCard key={id} title={title} developer={developer} date={date} />
        ))
      )}
    </>
  );
};

export default SearchBar;
