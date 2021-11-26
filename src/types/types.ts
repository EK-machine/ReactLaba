import { IconProp } from "@fortawesome/fontawesome-svg-core";

export interface AppProps {
  nothing: boolean;
}

export interface AppState {
  loggedIn: boolean;
}

export interface ProductItemProps {
  id?: number;
  title: string;
  developer?: string;
  date: string;
  category: string;
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
  htmlFor: string;
  id: string;
  type: string;
}

export type LogInFunctionType = () => void;
export type LogOutFunctionType = () => void;

export interface HeaderProps {
  logOutFunc: LogOutFunctionType;
  logInFunc: LogInFunctionType;
  logInState: boolean;
}

export interface SignInBtnProps {
  logInFunc: LogInFunctionType;
}

export interface SignOutBtnProps {
  logOutFunc: LogOutFunctionType;
}
