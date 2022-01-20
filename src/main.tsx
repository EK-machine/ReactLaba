import "./styles/main.css";
import "./styles/main.scss";
// watch: native intellisense and file-peek for aliases from jsconfig.json and with none-js files doesn't work: https://github.com/microsoft/TypeScript/issues/29334
import React, { Component, StrictMode } from "react";
import { Provider } from "react-redux";
import ReactDom from "react-dom";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import store from "./redux/store";
import Header from "./components/header/header";
import HomePage from "./components/homePage/homePage";
import Footer from "./components/footer/footer";
import routesData from "./components/routesData";
import ErrorBoundary from "./components/errorBoundary";
import ProtectedRoute from "./components/protectedRoute";
import { AppProps, AppState } from "./types/types";
import ModalContainer from "./components/modal/modalContainer";

const ProductsPage = React.lazy(() => import("./components/products/productsPage"));
const AboutPage = React.lazy(() => import("./components/aboutPage/aboutPage"));
const LogInPage = React.lazy(() => import("./components/loginPage/logInPage"));
const ProfilePage = React.lazy(() => import("./components/profilePage/profilePage"));
const CartPage = React.lazy(() => import("./components/cartPage/cartPage"));

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
              <div className="main__content_container">
                <Switch>
                  <Route path="/login">
                    <React.Suspense
                      fallback={
                        <div className="main__fallback_div">
                          <p className="main__fallback_p">Loading...</p>
                        </div>
                      }
                    >
                      <LogInPage />
                    </React.Suspense>
                  </Route>

                  <Route exact path={routesData[0].path} component={HomePage} />
                  <ProtectedRoute path="/products/:id">
                    <React.Suspense
                      fallback={
                        <div className="main__fallback_div">
                          <p className="main__fallback_p">Loading...</p>
                        </div>
                      }
                    >
                      <ProductsPage />
                    </React.Suspense>
                  </ProtectedRoute>
                  <ProtectedRoute path={routesData[2].path}>
                    <React.Suspense
                      fallback={
                        <div className="main__fallback_div">
                          <p className="main__fallback_p">Loading...</p>
                        </div>
                      }
                    >
                      <AboutPage />
                    </React.Suspense>
                  </ProtectedRoute>
                  <ProtectedRoute path={routesData[3].path}>
                    <React.Suspense
                      fallback={
                        <div className="main__fallback_div">
                          <p className="main__fallback_p">Loading...</p>
                        </div>
                      }
                    >
                      <ProfilePage />
                    </React.Suspense>
                  </ProtectedRoute>

                  <ProtectedRoute path={routesData[4].path}>
                    <React.Suspense
                      fallback={
                        <div className="main__fallback_div">
                          <p className="main__fallback_p">Loading...</p>
                        </div>
                      }
                    >
                      <CartPage />
                    </React.Suspense>
                  </ProtectedRoute>

                  <Route path="*">
                    <Redirect to={routesData[0].path} />
                  </Route>
                </Switch>
              </div>
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
