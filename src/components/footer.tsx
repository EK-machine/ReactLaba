import React from "react";
import "./footer.css";

const gameCompaniesIcons = [
  {
    title: "company 1",
    icon: "company 1",
  },
  {
    title: "company 2",
    icon: "company 2",
  },
  {
    title: "company 3",
    icon: "company 3",
  },
  {
    title: "company 4",
    icon: "company 4",
  },
];

const Footer: React.FC = () => (
  <footer className="footer__container">
    <div>
      <h1>Incredible convenient</h1>
    </div>
    <ul>
      {gameCompaniesIcons.map(({ title, icon }) => (
        <li key={title}>{icon}</li>
      ))}
    </ul>
  </footer>
);

export default Footer;
