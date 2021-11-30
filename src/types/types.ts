import { IconProp } from "@fortawesome/fontawesome-svg-core";

export interface AppProps {
  nothing: boolean;
}

export interface AppState {
  loggedIn: boolean;
  userName: string;
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
  id: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
}

export type LogInFunctionType = (status: boolean, userName: string) => void;
export type LogOutFunctionType = () => void;

export interface HeaderProps {
  logOutFunc: LogOutFunctionType;
  logInFunc: LogInFunctionType;
  logInState: boolean;
  userName: string;
}

export interface SignInBtnProps {
  logInFunc: LogInFunctionType;
}

export interface SignInModalBodyProps {
  logInFunc: LogInFunctionType;
  closeModalFunc: () => void;
}

export interface SignUpBtnProps {
  logInFunc: LogInFunctionType;
}

export interface SignUpModalBodyProps {
  logInFunc: LogInFunctionType;
  closeModalFunc: () => void;
}

export interface SignOutBtnProps {
  logOutFunc: LogOutFunctionType;
}
