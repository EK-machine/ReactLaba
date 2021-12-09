import "./styles/main.css";
import "./styles/main.scss";
// watch: native intellisense and file-peek for aliases from jsconfig.json and with none-js files doesn't work: https://github.com/microsoft/TypeScript/issues/29334
import { Component, StrictMode } from "react";
import { Provider } from "react-redux";
import ReactDom from "react-dom";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import store from "./redux/store";
import Header from "./components/header/header";
import HomePage from "./components/homePage";
import ProductsPage from "./components/products/productsPage";
import AboutPage from "./components/aboutPage";
import LogInPage from "./components/logInPage";
import ProfilePage from "./components/profilePage";
import Footer from "./components/products/footer";
import routesData from "./components/routesData";
import ErrorBoundary from "./components/errorBoundary";
import ProtectedRoute from "./components/protectedRoute";
import { AppProps, AppState } from "./types/types";
import ModalContainer from "./components/elements/modalContainer";

class AppContainer extends Component<AppProps, AppState> {
  ["constructor"]: typeof AppContainer;

  constructor(props: AppProps) {
    super(props);

    const goExlcude = true;
    if (!goExlcude) {
      console.warn("class-dead-code doesn't work");
    }
  }

  render() {
    return (
      <Provider store={store}>
        <StrictMode>
          <BrowserRouter>
            <ErrorBoundary>
              <Header />

              <Switch>
                <Route path="/login">
                  <LogInPage />
                </Route>

                <Route exact path={routesData[0].path} component={HomePage} />

                {/* just for purpose of development I made protected route to a usual one
              <Route exact path="/products/:id" component={ProductsPage} /> */}
                <ProtectedRoute path="/products/:id">
                  <ProductsPage />
                </ProtectedRoute>

                <ProtectedRoute path={routesData[2].path}>
                  <AboutPage />
                </ProtectedRoute>

                <ProtectedRoute path={routesData[3].path}>
                  <ProfilePage />
                </ProtectedRoute>

                <Route path="*">
                  <Redirect to={routesData[0].path} />
                </Route>
              </Switch>

              <Footer />

              <ModalContainer />
            </ErrorBoundary>
          </BrowserRouter>
        </StrictMode>
      </Provider>
    );
  }
}

ReactDom.render(<AppContainer nothing={false} />, document.getElementById("app"));
