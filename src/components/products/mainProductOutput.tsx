import React, { useState, useEffect, Suspense } from "react";
import { useSelector } from "react-redux";
import "./mainproductoutput.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { ReducerState } from "../../redux/reducerRoot";

const GameCard = React.lazy(() => import("../gameCard"));

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
          <Suspense fallback={<FontAwesomeIcon icon={faSpinner} className="gameCard__loading-icon" />}>
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
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default MainProductOutput;
