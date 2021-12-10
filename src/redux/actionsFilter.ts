import {
  fetchGamesRequest,
  fetchGamesSuccess,
  fetchGamesFilure,
  filterByRatingDecsending,
  filterByRatingAscending,
  filterByPriceDecsending,
  filterByPriceAscending,
} from "./actionTypesFilter";

export const fetchGamesRequestAction = () => ({
  type: fetchGamesRequest,
});

export const fetchGamesSuccessAction = (games) => ({
  type: fetchGamesSuccess,
  payload: games,
});

export const fetchGamesFilureAction = (error) => ({
  type: fetchGamesFilure,
  payload: error,
});

export const fetchGamesAction = (partOfUrl) => async (dispatch) => {
  dispatch(fetchGamesRequestAction());
  try {
    const response = await fetch(`http://localhost:3000/games${partOfUrl}`, { method: "GET" });
    const games = await response.json();
    dispatch(fetchGamesSuccessAction(games));
  } catch (error) {
    const errorMsg = error.message;
    dispatch(fetchGamesFilureAction(errorMsg));
  }
};

export const filterByPriceDecsendingAction = (games) => ({
  type: filterByPriceDecsending,
  payload: games,
});

export const filterByRatingDecsendingAction = (games) => ({
  type: filterByRatingDecsending,
  payload: games,
});

export const filterByPriceAscendingAction = (games) => ({
  type: filterByPriceAscending,
  payload: games,
});

export const filterByRatingAscendingAction = (games) => ({
  type: filterByRatingAscending,
  payload: games,
});
