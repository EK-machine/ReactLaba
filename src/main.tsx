import "./styles/main.css";
import "./styles/main.scss";
// watch: native intellisense and file-peek for aliases from jsconfig.json and with none-js files doesn't work: https://github.com/microsoft/TypeScript/issues/29334
import { Component, StrictMode } from "react";
import ReactDom from "react-dom";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import someTypeScript from "./someTypeScript";
import Header from "./components/header";
import HomePage from "./components/homePage";
import ProductsPage from "./components/productsPage";
import AboutPage from "./components/aboutPage";
import Footer from "./components/footer";
import routesData from "./components/routesData";

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
          <Header />
          <Routes>
            <Route path={routesData[0].path} element={<HomePage />} />
            <Route path={routesData[1].path} element={<ProductsPage />} />
            <Route path={routesData[2].path} element={<AboutPage />} />
            <Route path="*" element={<Navigate to={routesData[0].path} />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </StrictMode>
    );
  }
}

ReactDom.render(<AppContainer nothing={false} />, document.getElementById("app"));
