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
import facebook from './images/icons/facebook.svg';
import twitter from './images/icons/twitter.svg';
import instagram from './images/icons/instagram.svg';
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
            <li><a href="https://classic.letsplaybingo.io">Classic</a></li>
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

    <section className="white-text dark-blue-bg no-print">
      <TellYourFriends />
    </section>

    <Route exact path="/">
      <section className="pale-gray-bg">
        <div className="row">
          {/* ----------- Updates ---------------- */}
          <div className="col shrink padding-xxlg">
            <h3>Let's Get Social!</h3>
            <a href="https://facebook.com/letsplaybingo.io" target="_blank" rel="noopener noreferrer"><img src={facebook} alt="Facebook" className="social-icon" /></a>
            <a href="https://twitter.com/Lets_Play_Bingo" target="_blank" rel="noopener noreferrer"><img src={twitter} alt="Twitter" className="social-icon" /></a>
            <a href="https://www.instagram.com/letsplaybingo.io/" target="_blank" rel="noopener noreferrer"><img src={instagram} alt="Instagram" className="social-icon" /></a>
          </div>
        
          <div className="col grow padding-xxlg wrap-text">
            <h3 className="margin-bottom-lg"><span className="date">5/17/2020</span> | Quick updates!</h3>
            <ul>
              <li>Added last 5 numbers display below the game play buttons</li>
              <li>Added an evens/odds game mode - in order to play this mode wild bingo mode must be on.</li>
              <li>Fixed a typo within the code that would sometimes break the reset button</li>
              <li>Fixed an issue where the bingo board was writing out the numbers with letters for certain languages.</li>
            </ul>
            <p className="medium-text"><strong>Reminder:</strong> if you run into bugs that break gameplay or you prefer the original version you can always play the stable <a href="https://classic.letsplaybingo.io">Let's Play Bingo Classic</a>!</p>
            
            <h5 className="margin-bottom-lg">Questions, Suggestions, Comments, Reporting Issues</h5>
            <p>Please feel free to reach out via email, on Facebook, Instagram, Twitter, etc with any questions, comments, concerns, etc! I love hearing from players!
            I'm just one developer, but I do my best to respond to everyone who emails me and help them however I can!</p>
            <p className="small-text">If you come across any issues with the game, please submit a detailed report either via email to <a href="mailto:hello@letsplaybingo.io">hello@letsplaybingo.io</a> or
             via <a href="https://github.com/karolbrennan/letsplaybingo/issues" target="_blank" rel="noopener noreferrer">GitHub</a>. When making a bug report please include how you came across the bug,
             what device you are using, PC/Mac/Laptop/Desktop/Tablet/Mobile/etc and which browser (Chrome, Safari, Edge, Firefox). If it's a stylistic issue please also include what size screen you are viewing on.</p>
             <p className="small-text">This site is still undergoing some stylistic updates to make it mobile friendly, so watch for that. I wanted to get the desktop version released as quickly as possible.</p>
          </div>
        </div>
      </section>
    </Route>
    
    <footer>
      <div className="row three-cols">
        <div className="col">
          For entertainment purposes only.
        </div>
        <div className="col text-center">&copy; 2017 - {new Date().getFullYear()} <a href="mailto:hello@letsplaybingo.io">Let's Play Bingo</a></div>
        <div className="col text-right">
          <Link to="/terms">Terms of Use</Link> | <Link to="/privacy">Cookies &amp; Privacy Policy</Link>
        </div>
      </div>
    </footer>
  </Router>
)
ReactDOM.render(routing, document.getElementById('root'));