import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./criteriaselector.css";
import { ReducerState } from "../../redux/reducerRoot";
import {
  filterByRatingDecsendingAction,
  filterByRatingAscendingAction,
  filterByPriceDecsendingAction,
  filterByPriceAscendingAction,
} from "../../redux/actionsFilter";

const CriteriaSelector: React.FC = () => {
  const [criteria, setCriteria] = useState<string>("rating");
  const [type, setType] = useState<string>("ascending");
  const [firstUpdate, setFirstUpdate] = useState<boolean>(true);
  const games = useSelector((state: ReducerState) => state.filter.gamesList);
  const dispatch = useDispatch();

  useEffect(() => {
    if (firstUpdate) {
      setFirstUpdate(!firstUpdate);
      return;
    }
    if (criteria === "rating" && type === "ascending") {
      dispatch(filterByRatingAscendingAction(games));
    } else if (criteria === "rating" && type === "descending") {
      dispatch(filterByRatingDecsendingAction(games));
    } else if (criteria === "price" && type === "ascending") {
      dispatch(filterByPriceAscendingAction(games));
    } else if (criteria === "price" && type === "descending") {
      dispatch(filterByPriceDecsendingAction(games));
    }
  }, [criteria, type]);

  return (
    <div className="criteriaSelector__container">
      <label htmlFor="criteria" className="criteriaSelector__label">
        Criteria
        <select
          className="criteriaSelector__selector"
          id="criteria"
          onChange={(e) => {
            setCriteria(e.target.value);
          }}
        >
          <option value="rating">Rating</option>
          <option value="price">Price</option>
        </select>
      </label>
      <label htmlFor="type" className="criteriaSelector__label">
        Type
        <select
          className="criteriaSelector__selector"
          id="type"
          onChange={(e) => {
            setType(e.target.value);
          }}
        >
          <option value="ascending">Ascending</option>
          <option value="descending">Descending</option>
        </select>
      </label>
    </div>
  );
};

export default CriteriaSelector;
