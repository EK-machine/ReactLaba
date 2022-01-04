import React from "react";
import "./aboutpage.css";
import CounterForErrorCatch from "../counterForErrorCatch";

const AboutPage: React.FC = () => (
  <div className="about__container">
    <p>About Page</p>
    <p>For now about page is empty and is used to test error boundary functionality using button below.</p>
    <CounterForErrorCatch />
  </div>
);

export default AboutPage;
