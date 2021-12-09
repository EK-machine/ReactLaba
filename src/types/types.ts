import { IconProp } from "@fortawesome/fontawesome-svg-core";

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
  developer?: string;
  date?: string;
  category: string;
  description: string;
  genre?: string;
  age?: number;
  rating: number;
  price: number;
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
  value: string;
  onChange: (value: string) => void;
}

export interface ProfileTextAreaProps {
  name: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
}

export type LogInFunctionType = (userName: string) => void;
export type LogOutFunctionType = () => void;

export interface HeaderProps {
  dispatchedLogOutAction: LogOutFunctionType;
  dispatchedLogInAction: LogInFunctionType;
  userName?: string;
  loggedIn?: boolean;
}

export interface SignInBtnProps {
  dispatchedLogInAction: LogInFunctionType;
}

export interface SignUpBtnProps {
  dispatchedLogInAction: LogInFunctionType;
}

export interface UserNameBtnProps {
  userName: string | undefined;
}

export interface SignOutBtnProps {
  dispatchedLogOutAction: LogOutFunctionType;
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
