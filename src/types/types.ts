import { IconProp } from "@fortawesome/fontawesome-svg-core";

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
