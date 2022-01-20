/* eslint-disable no-lone-blocks */
import React from "react";
import { useSelector } from "react-redux";
import "./mainproductoutput.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons/faSpinner";
import { ReducerState } from "../../redux/reducerRoot";
import { FilterState } from "../../types/types";
import GameCard from "../elements/gameCard"; // 1) SOLUTION WITH STATE.LOADING PART I; 3) SOLUTION WITH CUSTOM HOOK PART I
import useLoadSpin from "../elements/useLoadSpin"; // 3) SOLUTION WITH CUSTOM HOOK PART II

{
  /* 2) SOLUTION WITH REACT.SUSPENSE PART I */
}
// const GameCard = React.lazy(() => new Promise((resolve) => setTimeout(() => resolve(import("../elements/gameCard")), 500)));
{
  /* 2) SOLUTION WITH REACT.SUSPENSE PART I */
}

const MainProductOutput: React.FC = () => {
  const games: FilterState = useSelector((state: ReducerState) => state.filter);
  {
    /* 3) SOLUTION WITH CUSTOM HOOK PART III */
  }
  const status = useLoadSpin();
  {
    /* 3) SOLUTION WITH CUSTOM HOOK PART III */
  }

  return (
    <>
      <div className="mainOutput__container">
        <div className="mainOutput__title-container">
          <h1 className="mainOutput__title">Products</h1>
        </div>
        <div className="mainOutput__content-container">
          {/* 1) SOLUTION WITH STATE.LOADING PART II */}
          {/* {games.loading ? (
            <FontAwesomeIcon icon={faSpinner} className="mainOutput__loadingSpinner" />
          ) : (
            <>
              {games.gamesList.map(({ title, category, description, rating, price, imgUrl, id, genre, age }) => (
              <GameCard
                key={title}
                title={title}
                category={category}
                description={description}
                rating={rating}
                price={price}
                imgUrl={imgUrl}
                id={id}
                genre={genre}
                age={age}
              />
              ))}
            </>
          )} */}
          {/* 1) SOLUTION WITH STATE.LOADING PART II */}

          {/* 2) SOLUTION WITH REACT.SUSPENSE PART II */}
          {/* {games.gamesList.map(({ title, category, description, rating, price, imgUrl, id, genre, age }) => (
            <React.Suspense
              fallback={<FontAwesomeIcon icon={faSpinner} className="mainOutput__loadingSpinner" />}
              key={title}
            >
              <GameCard
                key={title}
                title={title}
                category={category}
                description={description}
                rating={rating}
                price={price}
                imgUrl={imgUrl}
                id={id}
                genre={genre}
                age={age}
              />
            </React.Suspense>
          ))} */}
          {/* 2) SOLUTION WITH REACT.SUSPENSE PART II */}

          {/* 3) SOLUTION WITH CUSTOM HOOK PART IV */}
          {status ? (
            <FontAwesomeIcon icon={faSpinner} className="mainOutput__loadingSpinner" />
          ) : (
            games.gamesList.map(({ title, category, description, rating, price, imgUrl, id, genre, age }) => (
              <GameCard
                key={title}
                title={title}
                category={category}
                description={description}
                rating={rating as number}
                price={price}
                imgUrl={imgUrl as string}
                id={id}
                genre={genre as string}
                age={age as number}
              />
            ))
          )}
          {/* 3) SOLUTION WITH CUSTOM HOOK PART IV */}
        </div>
      </div>
    </>
  );
};

export default MainProductOutput;
