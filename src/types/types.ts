import { IconProp } from "@fortawesome/fontawesome-svg-core";

export interface AppProps {
  nothing: boolean;
}

export interface AppState {
  loggedIn: boolean;
  userName: string;
  showSignInModal: boolean;
  showSignUpModal: boolean;
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
  showSignInModalFunc: () => void;
  showSignUpModalFunc: () => void;
  closeModalFunc: () => void;
  logInState?: boolean;
  showSignInModal: boolean;
  showSignUpModal: boolean;
  userName?: string;
}

export interface SignInBtnProps {
  logInFunc: LogInFunctionType;
  showSignInModalFunc: () => void;
  closeModalFunc: () => void;
  showSignInModal: boolean;
}

export interface LogInPageProps {
  logInFunc: LogInFunctionType;
  closeModalFunc: () => void;
  showSignInModalFunc: () => void;
  showSignInModal: boolean;
  logInState: boolean;
}

export interface SignInModalBodyProps {
  logInFunc: LogInFunctionType;
  closeModalFunc: () => void;
}

export interface SignUpBtnProps {
  logInFunc: LogInFunctionType;
  showSignUpModalFunc: () => void;
  closeModalFunc: () => void;
  showSignUpModal: boolean;
}

export interface SignUpModalBodyProps {
  logInFunc: LogInFunctionType;
  closeModalFunc: () => void;
}

export interface SignOutBtnProps {
  logOutFunc: LogOutFunctionType;
}

export interface LocationState {
  from: {
    pathname: string;
  };
}

export interface UsaerNameProps {
  userName: string;
}
