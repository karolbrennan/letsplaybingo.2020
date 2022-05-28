import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";

// Styles
import "./sass/core.scss";

// Header & Footer
import Header from "./components/subcomponents/Header.js";
import Footer from "./components/subcomponents/Footer.js";

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
    <Header />
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
    <Footer />
  </Router>
);
ReactDOM.render(routing, document.getElementById("root"));
