import "./styles/main.css";
import "./styles/main.scss";
// watch: native intellisense and file-peek for aliases from jsconfig.json and with none-js files doesn't work: https://github.com/microsoft/TypeScript/issues/29334
import { Component, StrictMode } from "react";
import ReactDom from "react-dom";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import someTypeScript from "./someTypeScript";
import Header from "./components/header";
import HomePage from "./components/homePage";
import PCProductsPage from "./components/pCProductsPage";
import PSProductsPage from "./components/pSProductsPage";
import XBXProductsPage from "./components/xBXProductsPage";
import AboutPage from "./components/aboutPage";
import Footer from "./components/footer";
import routesData from "./components/routesData";
import productsRoutesData from "./components/productsRoutesData";
import ErrorBoundary from "./components/errorBoundary";

interface AppProps {
  nothing: boolean;
}
interface AppState {
  title: string;
}

class AppContainer extends Component<AppProps, AppState> {
  ["constructor"]: typeof AppContainer;

  constructor(props: AppProps) {
    super(props);
    this.state = {
      title: someTypeScript("Test-block for css-modules"),
    };
    // test class-dead-code
    const goExlcude = true;
    if (!goExlcude) {
      console.warn("class-dead-code doesn't work");
    }
  }

  render() {
    return (
      <StrictMode>
        <BrowserRouter>
          <ErrorBoundary>
            <Header />
            <Switch>
              <Route exact path={routesData[0].path} component={HomePage} />
              <Route path={productsRoutesData[0].path} component={PCProductsPage} />
              <Route path={productsRoutesData[1].path} component={PSProductsPage} />
              <Route path={productsRoutesData[2].path} component={XBXProductsPage} />
              <Route path={routesData[2].path} component={AboutPage} />
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
