import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./criteriaselector.css";
import { ReducerState } from "../../redux/reducerRoot";
import { filterByCategoryAction } from "../../redux/actionsFilter";

const CriteriaSelector: React.FC = () => {
  const [criteria, setCriteria] = useState<string>("rating");
  const [type, setType] = useState<string>("ascending");
  const games = useSelector((state: ReducerState) => state.filter.finalList);
  const dispatch = useDispatch();

  useEffect(() => {
    const ratingAscendingSort = [...games].sort((a, b) => a.rating - b.rating);
    const ratingDescendingSort = [...games].sort((a, b) => b.rating - a.rating);
    const priceAscendingSort = [...games].sort((a, b) => a.price - b.price);
    const priceDescendingSort = [...games].sort((a, b) => b.price - a.price);

    if (criteria === "rating" && type === "ascending") {
      dispatch(filterByCategoryAction(ratingAscendingSort));
      console.log(ratingAscendingSort);
    } else if (criteria === "rating" && type === "descending") {
      dispatch(filterByCategoryAction(ratingDescendingSort));
      console.log(ratingDescendingSort);
    } else if (criteria === "price" && type === "ascending") {
      dispatch(filterByCategoryAction(priceAscendingSort));
    } else if (criteria === "price" && type === "descending") {
      dispatch(filterByCategoryAction(priceDescendingSort));
    }
  }, [criteria, type]);

  return (
    <div className="criteriaSelector__container">
      <label htmlFor="criteria" className="criteriaSelector__label">
        Criteria
        <select
          className="criteriaSelector__selector"
          id="criteria"
          name="cars"
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
          name="cars"
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
