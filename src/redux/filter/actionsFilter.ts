import { Dispatch } from "react";
import { FilterAction, Game } from "../../types/types";

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

export const fetchGamesSuccessAction = (games: Game[]): FilterAction => ({
  type: fetchGamesSuccess,
  payload: games,
});

export const fetchGamesAction =
  (partOfUrl: string) =>
  async (dispatch: Dispatch<{ type: string } | FilterAction>): Promise<Game[]> => {
    dispatch(fetchGamesRequestAction());
    const response = await fetch(`http://localhost:3000/games${partOfUrl}`, { method: "GET" });
    const games: Game[] = await response.json();
    dispatch(fetchGamesSuccessAction(games));
    return games;
  };

export const fetchLastThreeGamesAction =
  (partOfUrl: string) =>
  async (dispatch: Dispatch<{ type: string } | FilterAction>): Promise<Game[]> => {
    dispatch(fetchGamesRequestAction());
    const response = await fetch(`http://localhost:3000/games${partOfUrl}`, { method: "GET" });
    const games: Game[] = await response.json();
    const lastThreeGames = games.slice(0, 3);
    dispatch(fetchGamesSuccessAction(lastThreeGames));
    return games;
  };

export const filterByPriceDecsendingAction = (games: Game[]): FilterAction => ({
  type: filterByPriceDecsending,
  payload: games,
});

export const filterByRatingDecsendingAction = (games: Game[]): FilterAction => ({
  type: filterByRatingDecsending,
  payload: games,
});

export const filterByPriceAscendingAction = (games: Game[]): FilterAction => ({
  type: filterByPriceAscending,
  payload: games,
});

export const filterByRatingAscendingAction = (games: Game[]): FilterAction => ({
  type: filterByRatingAscending,
  payload: games,
});
