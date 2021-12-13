import { Dispatch } from "react";
import { FilterAction, Game } from "../types/types";

import {
  fetchGamesRequest,
  fetchGamesSuccess,
  filterByRatingDecsending,
  filterByRatingAscending,
  filterByPriceDecsending,
  filterByPriceAscending,
} from "./actionTypesFilter";

export const fetchGamesRequestAction = (): { type: string } => ({
  type: fetchGamesRequest,
});

export const fetchGamesSuccessAction = (games: Array<Game>): FilterAction => ({
  type: fetchGamesSuccess,
  payload: games,
});

export const fetchGamesAction =
  (partOfUrl: string) =>
  async (dispatch: Dispatch<FilterAction>): Promise<Array<Game>> => {
    dispatch(fetchGamesRequestAction());
    const response = await fetch(`http://localhost:3000/games${partOfUrl}`, { method: "GET" });
    const games: Array<Game> = await response.json();
    dispatch(fetchGamesSuccessAction(games));
    return games;
  };

export const filterByPriceDecsendingAction = (games: Array<Game>): FilterAction => ({
  type: filterByPriceDecsending,
  payload: games,
});

export const filterByRatingDecsendingAction = (games: Array<Game>): FilterAction => ({
  type: filterByRatingDecsending,
  payload: games,
});

export const filterByPriceAscendingAction = (games: Array<Game>): FilterAction => ({
  type: filterByPriceAscending,
  payload: games,
});

export const filterByRatingAscendingAction = (games: Array<Game>): FilterAction => ({
  type: filterByRatingAscending,
  payload: games,
});
