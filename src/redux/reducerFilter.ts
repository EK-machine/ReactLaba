import { initialFilterState } from "./initalStateFilter";
import {
  fetchGamesRequest,
  fetchGamesSuccess,
  fetchGamesFilure,
  filterByRatingDecsending,
  filterByRatingAscending,
  filterByPriceDecsending,
  filterByPriceAscending,
} from "./actionTypesFilter";

const FilterReducer = (state = initialFilterState, action) => {
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
        error: "",
      };
    case filterByRatingDecsending:
      return {
        ...state,
        loading: false,
        gamesList: [...action.payload].sort((a, b) => b.rating - a.rating),
        error: "",
      };
    case filterByRatingAscending:
      return {
        ...state,
        loading: false,
        gamesList: [...action.payload].sort((a, b) => a.rating - b.rating),
        error: "",
      };
    case filterByPriceDecsending:
      return {
        ...state,
        loading: false,
        gamesList: [...action.payload].sort((a, b) => b.price - a.price),
        error: "",
      };
    case filterByPriceAscending:
      return {
        ...state,
        loading: false,
        gamesList: [...action.payload].sort((a, b) => a.price - b.price),
        error: "",
      };
    case fetchGamesFilure:
      return {
        ...state,
        loading: false,
        gamesList: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default FilterReducer;

// import { initialFilterState } from "./initalStateFilter";
// import { filter } from "./actionTypesFilter";

// const FilterReducer = (state = initialFilterState, action: { type: string; payload: [] }): { finalList: [] } => {
//   switch (action.type) {
//     case filter:
//       return {
//         ...state,
//         finalList: action.payload,
//       };
//     default:
//       return state;
//   }
// };

// export default FilterReducer;
