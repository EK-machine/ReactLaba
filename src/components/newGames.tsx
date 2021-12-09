import React, { useState, useEffect } from "react";
import "./newGames.css";
import GameCard from "./gameCard";

const startFetchUrl = "http://localhost:3000/games?_sort=timestamp&_order=desc";

const NewGames: React.FC = () => {
  const [newGamesList, setNewGamesList] = useState([]);

  useEffect(() => {
    let cancel = false;
    async function newGameFetching() {
      const newGameFetch = await fetch(startFetchUrl);
      const newGameJson = await newGameFetch.json();
      if (!cancel) {
        setNewGamesList(newGameJson.slice(0, 3));
      }
    }
    newGameFetching();
    return () => {
      cancel = true;
    };
  }, []);

  return (
    <>
      <div className="newGame__container">
        <div className="newGame__title-container">
          <h1 className="newGame__title">New games</h1>
        </div>
        <div className="newGame__content-container">
          {newGamesList.map(({ title, category, description, rating, price }) => (
            <GameCard
              key={title}
              title={title}
              category={category}
              description={description}
              rating={rating}
              price={price}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default NewGames;
