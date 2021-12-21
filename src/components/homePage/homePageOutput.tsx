import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./homePageOutput.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons/faSpinner";
import GameCard from "../elements/gameCard";
import { FilterState, Game } from "../../types/types";
import { ReducerState } from "../../redux/reducerRoot";
import { fetchLastThreeGamesAction } from "../../redux/filter/actionsFilter";

const HomePageOutput: React.FC = () => {
  const games: FilterState = useSelector((state: ReducerState) => state.filter);
  const [output, setOutput] = useState<Array<Game>>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const partOfUrl = "?_sort=timestamp&_order=desc";
    dispatch(fetchLastThreeGamesAction(partOfUrl));
  }, []);

  useEffect(() => {
    setOutput(games.gamesList);
  }, [games]);

  return (
    <>
      <div className="newGame__container">
        <div className="newGame__title-container">
          <h1 className="newGame__title">New games</h1>
        </div>
        <div className="newGame__content-container">
          {games.loading ? (
            <FontAwesomeIcon icon={faSpinner} className="searchBar__loading-icon" />
          ) : (
            output.map(({ title, category, description, rating, price, imgUrl, age, genre, id }) => (
              <GameCard
                key={title}
                title={title}
                category={category}
                description={description}
                rating={rating}
                price={price}
                imgUrl={imgUrl as string}
                age={age as number}
                genre={genre as string}
                id={id}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default HomePageOutput;
