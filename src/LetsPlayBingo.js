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
      selectedPattern: null,
      pattern: {
        B: [false, false, false, false, false],
        I: [false, false, false, false, false],
        N: [false, false, false, false, false],
        G: [false, false, false, false, false],
        O: [false, false, false, false, false]
      },
      presets: {
        "Custom": {
          B: [false, false, false, false, false],
          I: [false, false, false, false, false],
          N: [false, false, false, false, false],
          G: [false, false, false, false, false],
          O: [false, false, false, false, false]
        },
        "Regular or 4 Corners": {
          B: [true, false, false, false, true],
          I: [false, true, false, false, false],
          N: [false, false, true, false, false],
          G: [false, false, false, true, false],
          O: [true, false, false, false, true]
        },
        "Brackets": {
          B: [true, true, false, true, true],
          I: [true, false, false, false, true],
          N: [false, false, false, false, false],
          G: [true, false, false, false, true],
          O: [true, true, false, true, true]
        },
        "Letter X": {
          B: [true, false, false, false, true],
          I: [false, true, false, true, false],
          N: [false, false, true, false, false],
          G: [false, true, false, true, false],
          O: [true, false, false, false, true]
        },
        "Layer Cake": {
          B: [true, false, true, false, true],
          I: [true, false, true, false, true],
          N: [true, false, true, false, true],
          G: [true, false, true, false, true],
          O: [true, false, true, false, true]
        },
        "Postage Stamps": {
          B: [true, true, false, false, false],
          I: [true, true, false, false, false],
          N: [false, false, false, false, false],
          G: [false, false, false, true, true],
          O: [false, false, false, true, true]
        },
        "Sputnik": {
          B: [true, false, false, false, true],
          I: [false, true, true, true, false],
          N: [false, true, true, true, false],
          G: [false, true, true, true, false],
          O: [true, false, false, false, true]
        },
        "Diamond": {
          B: [false, false, true, false, false],
          I: [false, true, false, true, false],
          N: [true, false, false, false, true],
          G: [false, true, false, true, false],
          O: [false, false, true, false, false]
        },
        "Filled in Diamond": {
          B: [false, false, true, false, false],
          I: [false, true, true, true, false],
          N: [true, true, true, true, true],
          G: [false, true, true, true, false],
          O: [false, false, true, false, false]
        },
        "Blackout": {
          B: [true, true, true, true, true],
          I: [true, true, true, true, true],
          N: [true, true, true, true, true],
          G: [true, true, true, true, true],
          O: [true, true, true, true, true]
        }
      },
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
    let patternN = this.state.pattern.N;
    let patternIsSelected = this.state.selectedPattern;
    // Need to check if the pattern contains any N's (except for the free space)
    let callNBalls = (patternN[0] === false && patternN[1] === false && patternN[3] === false && patternN[4] === false);
    // get all balls
    let balls = this.state.balls;
    // get active bll and reset
    let active = _.filter(balls, {active: true});
    active.forEach(ball => {ball.active = false;});
    // get all uncalled balls
    // also check if pattern needs N balls called or not
    let uncalled = []
    if (callNBalls && patternIsSelected) {
      uncalled = _.filter(balls,function(obj) {
        return (!obj.called && obj.letter !== 'N')
      });
    } else {
      uncalled = _.filter(balls, {called: false});
    }
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

    /*
   *  Choose Pattern Function
   *  This sets the selected pattern
   *  Sets to default if no pattern is selected or selection is cleared.
   */
  choosePattern = (e) => {
    if (e === null) {
      this.setState({
        selectedPattern: null,
        pattern: {
          B: [false, false, false, false, false],
          I: [false, false, false, false, false],
          N: [false, false, false, false, false],
          G: [false, false, false, false, false],
          O: [false, false, false, false, false]
        }
      });
    } else {
      this.setState({
        selectedPattern: e.value,
        pattern: this.state.presets[e.value]
      });
    }
  };

  /*
   *  Update Pattern Function
   *  As user clicks on slots for the pattern, update the pattern in the state
   */
  updatePattern = (letter, index, slot) => {
    let pattern = this.state.pattern;
    pattern[letter][index] = !slot;
    this.setState({selectedPattern: "Custom", pattern: pattern});
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
    // For the pattern dropdown
    let pattern = this.state.pattern;
    let patternArray = [_.map(this.state.presets, (preset, value) => (
      {value: value, label: value}
    ))];

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
            <div id="bingopattern" className="notranslate">
                {_.map(pattern, (column, letter) => (
                  <div key={letter} className="pattern-col">
                    <div className="pattern-letter">{letter}</div>
                    {_.map(column, (slot, index) => (
                      <div key={letter + index}
                          className={slot ? "selected pattern-slot" : "pattern-slot"}
                          onClick={(e) => this.updatePattern(letter, index, slot)}>&nbsp;
                      </div>
                    ))}
                  </div>
                ))}
                <Select
                  name="patternselect"
                  placeholder="Choose Pattern"
                  value={this.state.selectedPattern}
                  searchable
                  onBlurResetsInput={true}
                  clearable
                  onChange={this.choosePattern}
                  options={patternArray[0]}
                />
              </div>
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