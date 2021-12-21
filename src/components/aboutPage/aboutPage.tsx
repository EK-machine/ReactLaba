import React from "react";
import "./aboutpage.css";
import CounterForErrorCatch from "../counterForErrorCatch";

const AboutPage: React.FC = () => (
  <div className="about__container">
    <p>About Page</p>
    <CounterForErrorCatch />
  </div>
);

export default AboutPage;
