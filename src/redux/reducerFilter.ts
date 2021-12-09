import { initialFilterState } from "./initalStateFilter";
import { filter } from "./actionTypesFilter";

const FilterReducer = (state = initialFilterState, action: { type: string; payload: [] }): { finalList: [] } => {
  switch (action.type) {
    case filter:
      return {
        ...state,
        finalList: action.payload,
      };
    default:
      return state;
  }
};

export default FilterReducer;
