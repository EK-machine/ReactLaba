import React, { Dispatch } from "react";
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

export interface CartAction {
  type: string;
  payload: GameCart | GameCart[] | number;
}

export interface UsualAction {
  type: string;
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

export interface LogInUserDataType {
  userName: string;
  userRole: string;
  userPic: string;
}

export interface InitialLogInState extends LogInUserDataType {
  loggedIn: boolean;
}

export interface LogInActionType {
  type: string;
  payload: LogInUserDataType;
}

export interface LogOutActionType {
  type: string;
}

export interface EditModalProps {
  gameData: {
    title: string;
    price: number;
    imgUrl: string;
    description: string;
    age: number;
    genre: string;
    category: string;
    id: number;
    rating: number;
  };
  location: { pathname: string };
  closeModal: () => void;
  showDelConfModal: () => void;
  doNotWantDelEditGame: () => void;
  wantDelGame: (delGameObj: EditGame) => void;
  getGameData: (editGameObj: EditGame) => void;
  editGame: (editGameObj: EditGame, partOfUrl: string) => void;
  createGame: (createGameObj: EditGame, partOfUrl: string) => void;
}

export interface EditModalState {
  titleInp: string;
  priceInp: number;
  imgUrlInp: string;
  descriptionInp: string;
  ageInp: number;
  categoryInp: string;
  pcCheckedInp: boolean;
  psCheckedInp: boolean;
  xbxCheckedInp: boolean;
}

export interface gameBase {
  title: string;
  imgUrl: string;
  price: number;
  description: string;
  age: number;
  genre: string;
  category: string;
}

export interface BtnProps {
  title: string;
  disabled?: boolean;
  onClick: () => void;
}

export interface delGameBase extends gameBase {
  id: number;
}

export interface closeBtnProps {
  title: string;
  closeHandler: () => void;
}

export interface editGameBase extends delGameBase {
  rating: number;
}

export interface createGameBase extends gameBase {
  rating: number;
}

export interface OptSelProps {
  name: string;
  id: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  arr: string[] | number[];
}

export interface CheckboxProps {
  name: string;
  checked: boolean;
  onChange: () => void;
  onKeyUp: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

interface LocatType {
  pathname: string;
}

export interface HelpTypes {
  getPath: (location: LocatType) => string;
  formValidSignUp: (logMess: string, passMess: string, repPassMess: string) => boolean;
  formValidSignIn: (logMess: string, passMess: string) => boolean;
  formValidEdit: (title: string, img: string, price: number, desc: string, finCat: string) => boolean;
  formValidPic: (pic: string) => boolean;
  formValidPass: (pass: string, repPass: string) => boolean;
  formValidProfile: (name: string) => boolean;
  formValidEditClass: (
    pc: boolean,
    ps: boolean,
    xbx: boolean,
    title: string,
    img: string,
    price: number,
    desc: string
  ) => boolean;
  verifyName: (log: string, marker: string) => string;
  verifyPassword: (pass: string, marker: string) => string;
  comparePass: (pass: string, repPass: string, marker: string) => string;
}

export interface EditModalContentProps {
  closeHandler: () => void;
  imgUrlInp: string;
  titleInp: string;
  titleGetter: (nameData: string) => void;
  categoryInp: string;
  setCategory: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  ageArr: number[];
  genreArr: string[];
  priceGetter: (priceData: number) => void;
  priceInp: number;
  imgUrlGetter: (imgUrlData: string) => void;
  descriptionGetter: (inputName: string) => void;
  descriptionInp: string;
  ageInp: number;
  setAge: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  pcCheckedInp: boolean;
  pcCheckHandler: () => void;
  onKeyUpPc: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  psCheckedInp: boolean;
  psCheckHandler: () => void;
  onKeyUpPs: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  xbxCheckedInp: boolean;
  xbxCheckHandler: () => void;
  onKeyUpXbx: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  gameData: string;
  formValid: boolean;
  submitHandlerEdit: () => void;
  deleteHandler: () => void;
  submitHandlerCreate: () => void;
}
