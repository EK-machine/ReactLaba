import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./genreradiobuttons.scss";
import { fetchGamesAction } from "../../redux/filter/actionsFilter";

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
  const [firstUpdate, setFirstUpdate] = useState<boolean>(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (firstUpdate) {
      setFirstUpdate(!firstUpdate);
      return;
    }
    const fetchOnGenre = () => {
      const partOfUrl = `?genre_like=${genre}`;
      dispatch(fetchGamesAction(partOfUrl));
    };

    const fetchAllGenres = () => {
      const partOfUrl = "";
      dispatch(fetchGamesAction(partOfUrl));
    };

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
            value={item}
            onChange={(e) => {
              setGenre(e.target.value);
            }}
            checked={genre === item}
          />
          <label htmlFor={item} className="genreSelector__label_radioButton">
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </label>
        </div>
      ))}
    </div>
  );
};

export default GenreRadioButtons;
