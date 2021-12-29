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

const FilterReducer = (state = initialFilterState, action: { type: string; payload: Game[] }): FilterState => {
  switch (action.type) {
    case fetchGamesRequest:
      return {
        ...state,
        loading: true,
        gamesList: initialFilterState.gamesList,
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
        gamesList: [...action.payload].sort((a, b) => (b.rating as number) - (a.rating as number)),
      };
    case filterByRatingAscending:
      return {
        ...state,
        loading: false,
        gamesList: [...action.payload].sort((a, b) => (a.rating as number) - (b.rating as number)),
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
