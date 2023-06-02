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
import Donate from "./components/pages/Donate.js";
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
						<img src={logo} alt="Let's Play Bingo!" className="logo" />
					</Link>
				</div>
				<div className="col grow padding-md no-text-wrap text-right">
					<ul className="menu">
						<li>
							<Link to="/">Play</Link>
						</li>
						<li>
							<Link to="/generator">Cards</Link>
						</li>
						<li>
							<Link to="/help">Help</Link>
						</li>
						<li>
							<Link to="/about">About / Donate</Link>
						</li>
						<li>
							<a href="https://letsplaybingo.io" target="_blank" rel="noreferrer">
								Latest Edition
							</a>
						</li>
					</ul>
				</div>
				<div className="col shrink text-right margin-left-lg">
					<div id="google_translate_element"></div>
				</div>
			</div>
		</header>

		<Route exact path="/" component={BingoGame} />
		<Route path="/about" component={About} />
		<Route path="/donate" component={Donate} />
		<Route path="/generator" component={CardGenerator} />
		<Route path="/terms" component={Terms} />
		<Route path="/patterns" component={Patterns} />
		<Route path="/privacy" component={Privacy} />
		<Route path="/releases" component={ReleaseNotes} />
		<Route path="/help" component={Help} />

		<footer>
			<div className="container row three-cols align-center">
				<div className="col">For entertainment purposes only.</div>
				<div className="col text-center">
					&copy; 2017 - {new Date().getFullYear()} <a href="mailto:hello@letsplaybingo.io">Let's Play Bingo</a>
				</div>
				<div className="col text-right">
					<Link to="/releases">Release Notes</Link> | <Link to="/terms">Terms of Use</Link> |{" "}
					<Link to="/privacy">Cookies &amp; Privacy Policy</Link>
				</div>
			</div>
		</footer>
	</Router>
);
ReactDOM.render(routing, document.getElementById("root"));
