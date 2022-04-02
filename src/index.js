import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
// Styles
import './sass/dependencies.scss';
import logo from './images/logo.svg';
// import facebook from './images/icons/facebook.svg';
// import twitter from './images/icons/twitter.svg';
// import instagram from './images/icons/instagram.svg';
// Custom Components
import BingoGame from './components/BingoGame.js';
import About from './components/pages/About.js';
import Donate from './components/pages/Donate.js';
import CardGenerator from './components/pages/CardGenerator.js';
import Terms from './components/pages/Terms.js';
import Privacy from './components/pages/Privacy.js';
import TellYourFriends from './components/subcomponents/TellYourFriends.js';
import ReleaseNotes from './components/pages/ReleaseNotes.js';

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
          {/* <div className="social col shrink padding-xxlg">
            <h3>Let's Get Social!</h3>
            <a href="https://facebook.com/letsplaybingo.io" target="_blank" rel="noopener noreferrer"><img src={facebook} alt="Facebook" className="social-icon" /></a>
            <a href="https://twitter.com/Lets_Play_Bingo" target="_blank" rel="noopener noreferrer"><img src={twitter} alt="Twitter" className="social-icon" /></a>
            <a href="https://www.instagram.com/letsplaybingo.io/" target="_blank" rel="noopener noreferrer"><img src={instagram} alt="Instagram" className="social-icon" /></a>
          </div> */}
        
          <div className="updates col grow padding-xxlg wrap-text">
            <h3 className="margin-bottom-lg"><span className="date">4/1/2022</span> | This isn't an April Fool's Joke!</h3>
            <ul>
              <li>Added a way to show the full history of balls called (see show full history link below the last 5 calls).</li>
              <li>Added a confirmation alert before games are reset to prevent accidental resets on click.</li>
              <li>Added a way for games to be stored locally so if you accidentally refresh or navigate away from the game your game will be stored. Games now can ONLY reset if you explicitly click reset game and confirm.</li>
              <li>Improved the mobile view so it doesn't look so horrible. This still needs some more work.</li>
              <li>Added a small reminder of what the Wild Ball is for Wild Bingo game mode (shown below the current ball graphic).</li>
              <li>Added a new subtle chime option that can be played when balls are called along with 10 chime options! This can also be used in conjunction with the vocal caller as a heads up that a new ball is coming!</li>
              <li>Upgraded the core technology behind the game and fixed some bugs such as voice failing to set on vocal calls randomly.</li>
            </ul>
            <p>I know I haven't updated this in an incredibly long time and this is long over due. The pandemic was rough for my mental health and then I went through 2 pregnancy losses. September of 2021 brought us our little rainbow baby so we have been enjoying watching him grow and discover the world around him! :)</p>
            <p>Thanks to everyone who has continued to play and reach out to me via email. I never expected this site to end up with so many users. I am so glad it was able to bring people together during the uncertainty in the last 2 years. Thanks for playing, stay safe and healthy!</p>

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
        <Link to="/releases">Release Notes</Link> | <Link to="/terms">Terms of Use</Link> | <Link to="/privacy">Cookies &amp; Privacy Policy</Link>
        </div>
      </div>
    </footer>
  </Router>
)
ReactDOM.render(routing, document.getElementById('root'));