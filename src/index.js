import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
// Styles
import './sass/core.scss';
import './sass/grid.scss';
import './sass/main.scss';
import './sass/utilities.scss';
import './sass/print.scss';
import logo from './images/logo.svg';
// Custom Components
import BingoGame from './components/BingoGame.js';
import About from './components/About.js';
import Donate from './components/Donate.js';
import CardGenerator from './components/CardGenerator.js';
import Terms from './components/Terms.js';
import Privacy from './components/Privacy.js';
import TellYourFriends from './components/TellYourFriends';
import ReleaseNotes from './components/ReleaseNotes';

const routing = (
  <Router>
    <header>
      <div className="row align-center">
        <div className="col shrink">
          <Link to="/"><img src={logo} alt="Let's Play Bingo!" className="logo" /></Link>
        </div>
        <div className="col grow padding-md no-text-wrap text-right">
          <ul className="menu">
            <li><Link to="/">Play</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/donate">Donate</Link></li>
            <li><Link to="/generator">Card Generator</Link></li>
          </ul>
        </div>
        <div className="col shrink text-right margin-left-lg">
          <div id="google_translate_element"></div>
        </div>
      </div>
    </header>
    <div>
      <Route exact path="/" component={BingoGame} />
      <Route path="/about" component={About} />
      <Route path="/donate" component={Donate} />
      <Route path="/generator" component={CardGenerator} />
      <Route path="/terms" component={Terms} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/releases" component={ReleaseNotes} />
    </div>

    <section className="white-text dark-blue-bg">
      <TellYourFriends />
    </section>

    <Route exact path="/">
      <section className="pale-gray-bg">
        <div className="row">
          {/* ----------- Text ---------------- */}
          <div className="col grow padding-xxlg wrap-text">
            <h3><span className="date">4/25/2020</span> | The Pandemic Update!</h3>
            <p>Welcome to the pandemic update! As you can see there have been some major improvements and changes to Let's Play Bingo! See what's new in the <a href="/releases">Release Notes</a>!</p>
            <p>If you prefer the original version you can always play it at <a href="https://classic.letsplaybingo.io">Let's Play Bingo Classic</a>!</p>
            <p>The site is still undergoing some stylistic updates to make it mobile friendly, so watch for that. I wanted to get the desktop version released as quickly as possible.</p>
            <p>Thanks to everyone who reached out and offered suggestions for how to make the site better! I love hearing from y'all.</p>
            <p>If you have ideas you'd like to share on how I can improve Let's Play Bingo please send them to <a href="mailto:hello@letsplaybingo.io">hello@letsplaybingo.io</a></p>
            <h4>Report Issues</h4>
            <p className="small-text">If you come across any issues with the game, please submit a detailed report either via email to <a href="mailto:hello@letsplaybingo.io">hello@letsplaybingo.io</a> or
             via <a href="https://github.com/karolbrennan/letsplaybingo/issues" target="_blank" rel="noopener noreferrer">GitHub</a></p>
          </div>
        </div>
      </section>
    </Route>
    
    <footer>
      <div className="row three-cols">
        <div className="col">
          For entertainment purposes only.
        </div>
        <div className="col text-center">&copy; {new Date().getFullYear()} <a href="mailto:hello@letsplaybingo.io">Let's Play Bingo</a></div>
        <div className="col text-right">
          <Link to="/terms">Terms of Use</Link> | <Link to="/privacy">Cookies &amp; Privacy Policy</Link>
        </div>
      </div>
    </footer>
  </Router>
)
ReactDOM.render(routing, document.getElementById('root'));