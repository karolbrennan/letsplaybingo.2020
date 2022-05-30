import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// Styles & Images
import "./sass/core.scss";
import logo from "./images/logo.svg";

// Pages
import About from "./components/pages/About.js";
import BingoGame from "./components/pages/BingoGame.js";
import CardGenerator from "./components/pages/CardGenerator.js";
import Help from "./components/pages/Help.js";
import Patterns from "./components/pages/Patterns.js";
import Privacy from "./components/pages/Privacy.js";
import ReleaseNotes from "./components/pages/ReleaseNotes.js";
import Terms from "./components/pages/Terms.js";

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
              <Link to="/patterns">Patterns</Link>
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
            <li className="final-element">
              <div id="google_translate_element"></div>
            </li>
          </ul>
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

    <footer className="light-links">
      <div className="container row three-cols align-start">
        <div className="col">
          <p>Love Let's Play Bingo? Tell your friends!</p>
          <div className="addthis_inline_share_toolbox margin-top-sm"></div>
        </div>
        <div className="col text-center">
          <p>&copy; 2017 - {new Date().getFullYear()}&nbsp;</p>
          <p>
            <a
              href="mailto:hello@letsplaybingo.io"
              className="plain">
              Let's Play Bingo
            </a>
          </p>
        </div>
        <div className="col text-right">
          <p>For entertainment purposes only.</p>
          <p>
            <Link
              to="/releases"
              className="plain">
              Release Notes
            </Link>{" "}
            |{" "}
            <Link
              to="/terms"
              className="plain">
              Terms of Use
            </Link>{" "}
            |{" "}
            <Link
              to="/privacy"
              className="plain">
              Cookies &amp; Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </footer>
  </Router>
);
ReactDOM.render(routing, document.getElementById("root"));
