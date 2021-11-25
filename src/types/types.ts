export interface Game {
  id: number;
  title: string;
  developer: string;
  date: string;
  category: string;
}

export interface productItemProps {
  title: string;
  developer: string;
  date: string;
  category?: string;
}

export interface CategoryProp {
  icon: string;
  title: string;
  path: string;
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
