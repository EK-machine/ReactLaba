import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./mainproductoutput.css";
import GameCard from "../gameCard";
import { ReducerState } from "../../redux/reducerRoot";

const MainProductOutput: React.FC = () => {
  const [gamesList, setGamesList] = useState([]);
  const output = useSelector((state: ReducerState) => state.filter.finalList);

  useEffect(() => {
    setGamesList(output);
  }, [output]);

  return (
    <>
      <div className="mainOutput__container">
        <div className="mainOutput__title-container">
          <h1 className="mainOutput__title">Products</h1>
        </div>
        <div className="mainOutput__content-container">
          {gamesList.map(({ title, category, description, rating, price }) => (
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

export default MainProductOutput;
