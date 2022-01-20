import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./criteriaselector.scss";
import { ReducerState } from "../../redux/reducerRoot";
import {
  filterByRatingDecsendingAction,
  filterByRatingAscendingAction,
  filterByPriceDecsendingAction,
  filterByPriceAscendingAction,
} from "../../redux/filter/actionsFilter";
import { FilterState, Criteria } from "../../types/types";

const CriteriaSelector: React.FC = () => {
  const [criteria, setCriteria] = useState<Criteria>(Criteria.RAT);
  const [type, setType] = useState<Criteria>(Criteria.ASC);
  const [firstUpdate, setFirstUpdate] = useState<boolean>(true);
  const games: FilterState = useSelector((state: ReducerState) => state.filter);
  const dispatch = useDispatch();

  useEffect(() => {
    if (firstUpdate) {
      setFirstUpdate(!firstUpdate);
      return;
    }
    if (criteria === Criteria.RAT && type === Criteria.ASC) {
      dispatch(filterByRatingAscendingAction(games.gamesList));
    } else if (criteria === Criteria.RAT && type === Criteria.DESC) {
      dispatch(filterByRatingDecsendingAction(games.gamesList));
    } else if (criteria === Criteria.PRI && type === Criteria.ASC) {
      dispatch(filterByPriceAscendingAction(games.gamesList));
    } else if (criteria === Criteria.PRI && type === Criteria.DESC) {
      dispatch(filterByPriceDecsendingAction(games.gamesList));
    }
  }, [criteria, type]);

  return (
    <div className="criteriaSelector__container">
      <label htmlFor="criteria" className="criteriaSelector__label">
        <p className="criteriaSelector__item_title">Criteria</p>
        <select
          className="criteriaSelector__selector"
          id="criteria"
          onChange={(e) => {
            setCriteria(e.target.value as Criteria);
          }}
          value={criteria}
        >
          <option value="rating">Rating</option>
          <option value="price">Price</option>
        </select>
      </label>
      <label htmlFor="type" className="criteriaSelector__label">
        <p className="criteriaSelector__item_title">Type</p>
        <select
          className="criteriaSelector__selector"
          id="type"
          onChange={(e) => {
            setType(e.target.value as Criteria);
          }}
          value={type}
        >
          <option value={Criteria.ASC}>Ascending</option>
          <option value={Criteria.DESC}>Descending</option>
        </select>
      </label>
    </div>
  );
};

export default CriteriaSelector;
