import { Dispatch } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

// eslint-disable-next-line no-shadow
export const enum Criteria {
  RAT = "rating",
  PRI = "price",
  ASC = "ascending",
  DESC = "descending",
}

export interface AppProps {
  nothing: boolean;
}

export interface AppState {
  loggedIn?: boolean;
  userName?: string;
  showSignInModal: boolean;
  showSignUpModal: boolean;
}

export interface ProductItemProps {
  id?: number;
  title: string;
  date?: string;
  category: string;
  description: string;
  genre: string;
  age: number;
  rating: number;
  price: number;
  imgUrl: string;
}

export interface CategoryProp {
  title: string;
  path: string;
  icon: IconProp;
}

export interface ErrorBoundaryProps {
  children?: React.ReactElement[];
}

export interface ErrorBoundaryState {
  thereIsError: boolean;
}

export interface RouteParams {
  id: string;
}

export interface InputProps {
  name: string;
  id: string;
  type: string;
  value: string | number;
  onChange: (value: string) => void;
}

export interface InputTextAdminProps {
  name: string;
  id: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
}

export interface InputNumberAdminProps {
  name: string;
  id: string;
  type: string;
  value: number;
  onChange: (value: number) => void;
}

export interface FilterState {
  loading: boolean;
  gamesList: Game[];
}

export interface TextAreaProps {
  name: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
}

export interface UserNameBtnProps {
  userName: string | undefined;
}

export interface LocationState {
  from: {
    pathname: string;
  };
}

export interface UserNameProps {
  userName: string | undefined;
}

export interface StarProps {
  rating: number;
}

export interface ModalState {
  signInModalVisible: boolean;
  signUpModalVisible: boolean;
  changePassModalVisible: boolean;
  changeUserPicModalVisible: boolean;
  buyModalVisible: boolean;
  editModalVisible: boolean;
  delConfModalVisible: boolean;
}

export interface initialGameStateType {
  gameWantToDelete: EditGame;
  gameWantToEdit: EditGame;
  gameToPostPut: EditGame;
}

export interface CartGameProps {
  title: string;
  category: string;
  price: number;
}

export interface LogInFunctionType {
  (userName: string): void;
}

export interface LogOutFunctionType {
  (): void;
}

export interface FetchFunctionFilterAction {
  (dispatch: Dispatch<FilterAction>): Promise<Game[]>;
}

export interface InitialLogInState {
  loggedIn: boolean;
  userName: string;
  userRole: string;
  userPic: string;
}

export interface CartAction {
  type: string;
  payload: GameCart | GameCart[] | number;
}

export interface GameAction {
  type: string;
  payload: EditGame;
}

export interface FilterAction {
  type: string;
  payload: Game[];
}

export interface GameCart {
  title: string;
  category: string;
  price: number;
  check: boolean;
  amount: number;
}

export interface EditGame {
  title: string;
  category: string;
  price: number;
  imgUrl: string;
  description: string;
  genre: string;
  age: number;
  rating?: number;
  id?: number;
}

export interface Game extends EditGame {
  date?: string;
}

export interface InitialCartStateType {
  gamesList: GameCart[];
  totalPurchase: number;
  userBalance: number;
}
