import React from "react";
import { useSelector } from "react-redux";
import "./mainproductoutput.css";
import { ReducerState } from "../../redux/reducerRoot";
// import GameCard from "../gameCard";

const GameCard = React.lazy(() => import("../gameCard"));

const MainProductOutput: React.FC = () => {
  const games = useSelector((state: ReducerState) => state.filter);

  return (
    <>
      <div className="mainOutput__container">
        <div className="mainOutput__title-container">
          <h1 className="mainOutput__title">Products</h1>
        </div>
        <div className="mainOutput__content-container">
          <React.Suspense fallback={<p>loading...</p>}>
            {games.gamesList.map(({ title, category, description, rating, price }) => (
              <GameCard
                key={title}
                title={title}
                category={category}
                description={description}
                rating={rating}
                price={price}
              />
            ))}
          </React.Suspense>
          {/* {games.loading ? (
            <p>loading...</p>
          ) : games.error ? (
            <p>{games.error}</p>
          ) : (
            <>
              {games.gamesList.map(({ title, category, description, rating, price }) => (
                <GameCard
                  key={title}
                  title={title}
                  category={category}
                  description={description}
                  rating={rating}
                  price={price}
                />
              ))}
            </>
          )} */}
        </div>
      </div>
    </>
  );
};

export default MainProductOutput;
