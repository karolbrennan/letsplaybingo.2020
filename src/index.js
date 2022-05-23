import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// Styles
import "./sass/main.scss";
// Images
import logo from "./images/logo.svg";
// Custom Components
import About from "./components/pages/About.js";
import BingoGame from "./components/BingoGame.js";
import CardGenerator from "./components/pages/CardGenerator.js";
import Help from "./components/pages/Help.js";
import Privacy from "./components/pages/Privacy.js";
import ReleaseNotes from "./components/pages/ReleaseNotes.js";
import Terms from "./components/pages/Terms.js";
import Patterns from "./components/pages/Patterns.js";

const routing = (
  <Router>
    <header>
      <div className="container row align-center">
        <div className="col shrink">
          <Link to="/">
            <img
              src={logo}
              alt="Let's Play Bingo!"
              className="logo"
            />
          </Link>
        </div>
        <div className="col grow padding-md no-text-wrap text-right">
          <ul className="menu">
            <li>
              <Link to="/">Play</Link>
            </li>
            <li>
              <Link to="/generator">Card Generator</Link>
            </li>
            <li>
              <Link to="/help">Help</Link>
            </li>
            <li>
              <Link to="/about">About / Donate</Link>
            </li>
            <li>
              <a
                href="https://90ball.letsplaybingo.io"
                target="_blank"
                rel="noreferrer">
                90 Ball
              </a>
            </li>
            <li>
              <a
                href="https://classic.letsplaybingo.io"
                target="_blank"
                rel="noreferrer">
                Classic
              </a>
            </li>
          </ul>
        </div>
        <div className="col shrink text-right margin-left-lg">
          <div id="google_translate_element"></div>
        </div>
      </div>
    </header>

    <Route
      exact
      path="/"
      component={BingoGame}
    />
    <Route
      path="/about"
      component={About}
    />
    <Route
      path="/generator"
      component={CardGenerator}
    />
    <Route
      path="/terms"
      component={Terms}
    />
    <Route
      path="/patterns"
      component={Patterns}
    />
    <Route
      path="/privacy"
      component={Privacy}
    />
    <Route
      path="/releases"
      component={ReleaseNotes}
    />
    <Route
      path="/help"
      component={Help}
    />

    <footer>
      <div className="container row three-cols align-center">
        <div className="col">
          <div className="addthis_inline_share_toolbox"></div>
        </div>
        <div className="col text-center">
          &copy; 2017 - {new Date().getFullYear()}{" "}
          <a href="mailto:hello@letsplaybingo.io">Let's Play Bingo</a>
        </div>
        <div className="col text-right">
          For entertainment purposes only.
          <br />
          <Link to="/releases">Release Notes</Link> |{" "}
          <Link to="/terms">Terms of Use</Link> |{" "}
          <Link to="/privacy">Cookies &amp; Privacy Policy</Link>
        </div>
      </div>
    </footer>
  </Router>
);
ReactDOM.render(routing, document.getElementById("root"));
