import initialFilterState from "./initalStateFilter";
import {
  fetchGamesRequest,
  fetchGamesSuccess,
  filterByRatingDecsending,
  filterByRatingAscending,
  filterByPriceDecsending,
  filterByPriceAscending,
} from "./actionTypesFilter";
import { Game, FilterState } from "../../types/types";

const FilterReducer = (state = initialFilterState, action: { type: string; payload: Array<Game> }): FilterState => {
  switch (action.type) {
    case fetchGamesRequest:
      return {
        ...state,
        loading: true,
      };
    case fetchGamesSuccess:
      return {
        ...state,
        loading: false,
        gamesList: action.payload,
      };
    case filterByRatingDecsending:
      return {
        ...state,
        loading: false,
        gamesList: [...action.payload].sort((a, b) => b.rating - a.rating),
      };
    case filterByRatingAscending:
      return {
        ...state,
        loading: false,
        gamesList: [...action.payload].sort((a, b) => a.rating - b.rating),
      };
    case filterByPriceDecsending:
      return {
        ...state,
        loading: false,
        gamesList: [...action.payload].sort((a, b) => b.price - a.price),
      };
    case filterByPriceAscending:
      return {
        ...state,
        loading: false,
        gamesList: [...action.payload].sort((a, b) => a.price - b.price),
      };
    default:
      return state;
  }
};

export default FilterReducer;
