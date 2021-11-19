import React from "react";
import "./footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlaystation, faSteam, faXbox } from "@fortawesome/free-brands-svg-icons";

const gameCompaniesIcons = [
  {
    title: "Playstation",
    icon: faPlaystation,
    href: "https://www.playstation.com/en-us/",
  },
  {
    title: "Steam",
    icon: faSteam,
    href: "https://store.steampowered.com/",
  },
  {
    title: "Xbox",
    icon: faXbox,
    href: "https://www.xbox.com/en-US/",
  },
];

const Footer: React.FC = () => (
  <footer className="footer__container">
    <div className="footer__title-container">
      <h1 className="footer__title">Incredible convenient</h1>
    </div>
    <div className="footer__links-container">
      {gameCompaniesIcons.map(({ title, icon, href }) => (
        <a key={title} href={href} className="footer__link">
          <FontAwesomeIcon icon={icon} className="footer__link-icon" />
        </a>
      ))}
    </div>
  </footer>
);

export default Footer;
