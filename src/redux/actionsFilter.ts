import { filter } from "./actionTypesFilter";

// eslint-disable-next-line import/prefer-default-export
export const filterByCategoryAction = (data: []): { type: string; payload: [] } => ({
  type: filter,
  payload: data,
});
