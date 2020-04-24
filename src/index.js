import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
// Styles
import './sass/grid.scss';
import './sass/main.scss';
import './sass/utilities.scss';
import './sass/print.scss';
import logo from './images/logo.svg';
// Custom Components
import BingoGame from './components/BingoGame.js';
import About from './components/About.js';
import Donate from './components/Donate.js';
import Disclaimer from './components/Disclaimer.js';
import CardGenerator from './components/CardGenerator.js';
import Footer from './components/Footer.js';

const routing = (
  <Router>
    <header>
      <div className="row vertical-center">
        <div className="col">
          <Link to="/"><img src={logo} alt="Let's Play Bingo!" className="logo" /></Link>
        </div>
        <div className="col shrink padding-md no-text-wrap text-right">
          <ul className="menu">
            <li><Link to="/about">About</Link></li>
            <li><Link to="/donate">Donate</Link></li>
            <li><Link to="/disclaimer">Disclaimer</Link></li>
            <li><Link to="/generator">Card Generator</Link></li>
          </ul>
        </div>
        <div className="col shrink text-right">
          <div id="google_translate_element"></div>
        </div>
      </div>
    </header>
    <div>
      <Route exact path="/" component={BingoGame} />
      <Route path="/about" component={About} />
      <Route path="/donate" component={Donate} />
      <Route path="/disclaimer" component={Disclaimer} />
      <Route path="/generator" component={CardGenerator} />
    </div>
    <Footer />
  </Router>
)
ReactDOM.render(routing, document.getElementById('root'));