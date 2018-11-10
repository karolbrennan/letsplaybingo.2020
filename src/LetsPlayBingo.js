/*
 * Let's Play Bingo
 * App written by Karol Brennan
 * http://karolbrennan.com
 * http://github.com/karolbrennan
 */
import React, {Component} from 'react';
import _ from 'underscore';
import Select from 'react-select';
// Styles and Images
import logo from './logo.svg';
import 'react-select/dist/react-select.css';
// Components
import BingoBoard from './components/BingoBoard.js';
import Pattern from './components/Pattern.js';
import BallDisplay from './components/BallDisplay.js';
// Helpers
import {getLanguageText} from './helpers.js';


class LetsPlayBingo extends Component {

  /*
   * Constructor
   * State Variables
   * balls: balls object, holds letter, number, called and active statues
   * running: determines if the game is presently running
   * interval & delay: how often the balls are generated
   */
  constructor(props) {
    super(props);
    this.state = {
      balls: {},
      newGame: true,
      running: false,
      interval: 0,
      delay: 10000,
      selectedCaller: null,
      speechEnabled: window.hasOwnProperty('speechSynthesis'),
      synth: window.speechSynthesis,
      voices: [],
      selectedBallCount: 75,
      ballCounts: [{
        text: '50',
        value: 50
      },{
        text: '75',
        value: 75
      },{
        text: '90',
        value: 90
      }]
    };
    // if speech is enabled, set up a method to load voices if they change
    if (this.state.speechEnabled) {
      this.state.synth.onvoiceschanged = this.loadVoices;
    }
  };


  /* 
   *  Component mounted
   *  set up ball count dynamically
   */
  componentDidMount() {
    this.setBalls();
  }

  /* 
   *  Component unmounting
   *  cleaning out values
   */
  componentWillUnmount() {
    this.setState({balls: {}})
  }

  /* 
   *  Component updated
   *  Using it to watch for state changes
   */
  componentDidUpdate(prevProps, prevState) {
    if (this.state.selectedBallCount !== prevState.selectedBallCount) {
      this.setBalls();
    }
  }

  /*
   *  Load Voices Function
   *  Will load voices as they change within the browser
   */
  loadVoices = () => {
    this.setState({voices: this.state.synth.getVoices()})
  };

  /*
   *  Say Function
   *  Will speak any string that is passed in
   */
  say = (text) => {
    if (this.state.speechEnabled) {
      // Create a new instance of SpeechSynthesisUtterance.
      let msg = new SpeechSynthesisUtterance();
      msg.text = text;
      if (this.state.hasOwnProperty('selectedCaller')) {
        msg.voice = this.state.selectedCaller;
      }
      this.cancelSpeech();
      this.state.synth.speak(msg);
    }
  };

  cancelSpeech = () => {
    if(window.speechSynthesis.speaking){
      window.speechSynthesis.cancel();
    }
  };

  /*
   *  Reset Game Function
   *  Map out the original balls array and update
   *  active and called statuses to false
   */
  resetGame = () => {
    this.cancelSpeech();
    if(this.state.running === true){
      clearInterval(this.state.interval);
    }
    let resetBalls = this.state.balls;
    _.map(resetBalls, (ball, index) => {
      resetBalls[index].active = false;
      resetBalls[index].called = false;
    });
    this.setState({balls: resetBalls, newGame: true, running: false});
  };

  startGame = () => {
    if(this.state.newGame) {
      this.say("Let's Play Bingo!");
    }
    setTimeout(this.toggleGame, 1500);
  };

  /*
   *  Toggle Game Function
   *  Check the opposite of the current running state, this will determine our new state
   *  If the game is now running, call a number right away then set a new interval
   *  Otherwise, clear the interval
   *  Set the current running state
   */
  toggleGame = () => {
    if (!this.state.running === true) {
      this.callNumber();
      this.setState({interval: setInterval(this.callNumber, this.state.delay)});
    } else {
      clearInterval(this.state.interval);
    }
    this.setState({newGame: false, running: !this.state.running});
  };

  /*
   *  Set Delay Function
   *  Fires when the user uses the delay slider
   *  If the game is running it'll clear the existing interval and set a new one
   *  Otherwise it will just update the delay
   */
  setDelay = (e) => {
    if (this.state.running) {
      clearInterval(this.state.interval);
      this.setState({delay: e.target.value, interval: setInterval(this.callNumber, e.target.value)});
    } else {
      this.setState({delay: e.target.value});
    }
  };


  /*
   *  Choose Caller Function
   */
  chooseCaller = (e) => {
    if (e === null) {
      // default
      this.setState({selectedCaller: this.state.voices[0]});
    } else {
      let voice = this.state.voices[e.value];
      voice.value = e.value;
      this.setState({selectedCaller: voice});
    }
  };

  /*
   *  Call Number Function
   *  Will get all of the balls, find the active one and reset it
   *  Grabs uncalled balls and determines if there are still uncalled balls
   *  Otherwise, it'll generate a random ball, set it to called and active
   */
  callNumber = () => {
    // get all balls
    let balls = this.state.balls;
    // get active bll and reset
    let active = _.where(balls, {active: true});
    active.forEach(ball => {ball.active = false;});
    // get all uncalled balls
    let uncalled = _.where(balls, {called: false});
    if (uncalled.length === 0) {
      alert("I've given you all I've got captain! I haven't got any more balls!");
    } else {
      // choose a random ball
      let randomball = uncalled[Math.floor(Math.random() * uncalled.length)];
      let newBall = balls[randomball.number];
      // set status of ball as called and active
      newBall.called = true;
      newBall.active = true;
      // call the new ball, first call it all together, then call each character individually
      let ballstring = newBall.number.toString();
      this.say([newBall.letter, newBall.number, ' ', ' ', newBall.letter, ' ',
        (ballstring.length === 2 ? [ballstring.charAt(0), ' ', ballstring.charAt(1)] : newBall.number)]);
      // update the state to re-render the board
      this.setState({balls: balls});
    }
  };

  setBalls = () => {
    let newBalls = {};
    let bingoLetter = '';
    for (let i = 1; i <= this.state.selectedBallCount; i++) {
      if (i/this.state.selectedBallCount <= 0.2) {
        bingoLetter = 'B';
      } else if (i/this.state.selectedBallCount <= 0.4) {
        bingoLetter = 'I';
      } else if (i/this.state.selectedBallCount <= 0.6) {
        bingoLetter = 'N';
      } else if (i/this.state.selectedBallCount <= 0.8) {
        bingoLetter = 'G';
      } else {
        bingoLetter = 'O';
      }
      newBalls[i] = {
        letter: bingoLetter,
        number: i,
        called: false,
        active: false
      };
    }
    this.setState({balls: newBalls});
  };

  /*
   *  Render Method
   *  Displays the bingo page
   */
  render() {
    return (
      <div className="App">

        <section id="board">
          <div className="row flex">
            <div className="col c85">
              <BingoBoard balls={this.state.balls}  ballCount={this.state.selectedBallCount}/>
            </div>
            <div className="col c15 padding">
              <BallDisplay balls={this.state.balls}/>
            </div>
          </div>
        </section>

        <section id="buttons">
          <div className="row">
            <div className="col c40">
              <div className="row">
                <div className="col c100">
                  <div className="row">
                    <div className="col col30">
                      <button onClick={this.state.newGame ? this.startGame : this.toggleGame}>
                        {this.state.newGame ? 'Start' : this.state.running ? 'Pause' : 'Resume'}
                      </button>
                    </div>
                    <div className="col col70">
                      <div className="btn-group">
                        {_.map(this.state.ballCounts, (ball, index) => (
                          <button 
                            key={index} 
                            onClick={() => this.setState({selectedBallCount: ball.value})} 
                            disabled={!this.state.newGame || this.state.running}
                            className={this.state.selectedBallCount === ball.value ? 'selected' : ''}
                          >
                            {ball.text}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col c100">
                  <button onClick={this.callNumber} disabled={this.state.running ? 'disabled' : ''}>Next Number</button>
                  <button onClick={this.resetGame}>Reset</button>
                </div>
              </div>
            </div>
            <div className="col c40 text-center">
              <div id="speed">
                <span>Slow</span><input onChange={(e) => this.setDelay(e)} type="range" value={this.state.delay}  min="5000" max="16000" step="1000"/><span>Fast</span>
              </div>
            </div>
            <div className="col c20 text-right">
              {this.state.speechEnabled ?
                <Select name="voiceselect" placeholder="Choose Caller" searchable
                        onBlurResetsInput={true}
                        value={this.state.selectedCaller ? this.state.selectedCaller.value : ''}
                        onChange={this.chooseCaller}
                        options={_.map(this.state.voices, (voice, index) => (
                          {value: index, label: (voice.name + ' / ' + getLanguageText(voice.lang))}
                        ))}
                />
              : "Sorry, your browser doesn't support our vocal caller! Try Chrome!"}
            </div>
          </div>
        </section>

        <section>
          <div className="row">
            <div className="col c20 padding text-center">
              <Pattern />
            </div>
            <div className="col c60 padding">
              <p className="description">Use this free bingo caller to host your own bingo games at home! You
              provide the cards, we generate the bingo numbers! Completely free bingo app - no downloads necessary!
              </p>
              <p className="disclaimer">
                LetsPlayBingo.io does not intend for the bingo caller contained on this website to be used for illegal or gambling purposes. The information and bingo caller contained on this website is for entertainment purposes only. This website, its owners and associates do not have any control over the use of this bingo caller and cannot be held liable for any monetary or other losses incurred by unapproved use of this bingo caller or generated bingo cards.
              </p>
              <div className="top-bottom-padding">
                <div className="addthis_inline_share_toolbox"></div>
              </div>
            </div>
            <div className="col c20 text-center padding">
              <img className="logo" src={logo} alt="Let's Play Bingo Logo"/>
              <p className="intl">We're now international!</p>
              <div id="google_translate_element"></div>
            </div>
          </div>
        </section>

        <footer>
          <div className="row">
            <div className="col c25 text-left">
              <p>For entertainment purposes only.</p>
            </div>
            <div className="col c50 text-center">
              <p>Let's Play Bingo! © 2018 <a href="http://karolbrennan.com" target="_blank">Karol Brennan</a></p>
            </div>
            <div className="col c25 text-right">
              <p>Check out this project on <a href="http://github.com/karolbrennan/letsplaybingo" target="_blank">GitHub</a></p>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default LetsPlayBingo;