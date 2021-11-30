import "./styles/main.css";
import "./styles/main.scss";
// watch: native intellisense and file-peek for aliases from jsconfig.json and with none-js files doesn't work: https://github.com/microsoft/TypeScript/issues/29334
import { Component, StrictMode } from "react";
import ReactDom from "react-dom";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Header from "./components/header";
import HomePage from "./components/homePage";
import ProductsPage from "./components/products/productsPage";
import AboutPage from "./components/aboutPage";
import LogInPage from "./components/logInPage";
import Footer from "./components/products/footer";
import routesData from "./components/routesData";
import ErrorBoundary from "./components/errorBoundary";
import ProtectedRoute from "./components/protectedRoute";
import { AppProps, AppState } from "./types/types";

class AppContainer extends Component<AppProps, AppState> {
  ["constructor"]: typeof AppContainer;

  constructor(props: AppProps) {
    super(props);
    this.state = { loggedIn: false, userName: "", showModal: false };

    const goExlcude = true;
    if (!goExlcude) {
      console.warn("class-dead-code doesn't work");
    }
  }

  logInFunc = (status: boolean, name: string) => {
    this.setState({ loggedIn: status, userName: name });
  };

  logOutFunc = () => {
    this.setState({ loggedIn: false });
  };

  showModalFunc = () => {
    this.setState({ showModal: true });
  };

  closeModalFunc = () => {
    this.setState({ showModal: false });
  };

  render() {
    return (
      <StrictMode>
        <BrowserRouter>
          <ErrorBoundary>
            <Header
              logInFunc={this.logInFunc}
              logOutFunc={this.logOutFunc}
              showModalFunc={this.showModalFunc}
              closeModalFunc={this.closeModalFunc}
              userName={this.state.userName}
              logInState={this.state.loggedIn}
              showModal={this.state.showModal}
            />
            <Switch>
              <Route path="/login">
                <LogInPage
                  logInFunc={this.logInFunc}
                  closeModalFunc={this.closeModalFunc}
                  showModalFunc={this.showModalFunc}
                  logInState={this.state.loggedIn}
                  showModal={this.state.showModal}
                />
              </Route>
              <Route exact path={routesData[0].path} component={HomePage} />
              <ProtectedRoute loggedIn={this.state.loggedIn} logInFunc={this.logInFunc} path="/products/:id">
                <ProductsPage />
              </ProtectedRoute>
              <ProtectedRoute
                loggedIn={this.state.loggedIn}
                logInFunc={this.logInFunc}
                path={routesData[2].path}
                component={AboutPage}
              />
              <Route path="*">
                <Redirect to={routesData[0].path} />
              </Route>
              <Route path="*" component={HomePage} />
            </Switch>
            <Footer />
          </ErrorBoundary>
        </BrowserRouter>
      </StrictMode>
    );
  }
}

ReactDom.render(<AppContainer nothing={false} />, document.getElementById("app"));
