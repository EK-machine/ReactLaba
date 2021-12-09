import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./genreradiobuttons.css";
import { ProductItemProps } from "@/types/types";
import { filterByCategoryAction } from "../../redux/actionsFilter";

const genreArr = [
  "all genres",
  "action-adventure",
  "first-person shooter",
  "fighting game",
  "survival game",
  "nonlinear gameplay",
];

const GenreRadioButtons: React.FC = () => {
  const [genre, setGenre] = useState<string>("all genres");
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchOnGenre() {
      const startFetch = await fetch(`http://localhost:3000/games?genre_like=${genre}`, { method: "GET" });
      const startFetchJson: Array<ProductItemProps> = await startFetch.json();
      dispatch(filterByCategoryAction(startFetchJson));
    }

    async function fetchAllGenres() {
      const startFetch = await fetch("http://localhost:3000/games", { method: "GET" });
      const startFetchJson: Array<ProductItemProps> = await startFetch.json();
      dispatch(filterByCategoryAction(startFetchJson));
    }
    if (genre === "all genres") {
      fetchAllGenres();
    } else {
      fetchOnGenre();
    }
  }, [genre]);

  return (
    <div className="genreSelector__container">
      {genreArr.map((item) => (
        <div className="genreSelector__input_container" key={item}>
          <input
            className="genreSelector__input_radioButton"
            type="radio"
            id={item}
            name="fav_language"
            value={item}
            onChange={(e) => {
              setGenre(e.target.value);
            }}
            checked={genre === item}
          />
          <label htmlFor={item}>{item.charAt(0).toUpperCase() + item.slice(1)}</label>
        </div>
      ))}
    </div>
  );
};

export default GenreRadioButtons;
