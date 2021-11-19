import React, { ErrorInfo } from "react";
import { withRouter } from "react-router-dom";
import routesData from "./routesData";

interface ErrorBoundaryProps {
  children?: React.ReactElement[];
}
interface ErrorBoundaryState {
  thereIsError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      thereIsError: false,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    alert("Oups! there is an Error!");
    console.error(errorInfo);
    console.error(error);
    this.props.history.push(routesData[0].path);
    window.location.reload();
  }

  static getDerivedStateFromError(): Partial<ErrorBoundaryState> {
    return { thereIsError: true };
  }

  render(): React.ReactNode {
    if (this.state.thereIsError) {
      return <h1>Oups! there is an Error!</h1>;
    }
    return this.props.children;
  }
}

export default withRouter(ErrorBoundary);
