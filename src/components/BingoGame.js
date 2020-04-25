/*
 * Let's Play Bingo
 * App written by Karol Brennan
 * https://karol.dev
 * http://github.com/karolbrennan
 */
// Dependencies
import React, {Component} from 'react';
import Slider from 'rc-slider';
import Select from 'react-select';

// Custom Components
import BingoBoard from './BingoBoard.js';
import Pattern from './Pattern.js';

// Utilities
import { generateBingoBalls, getRandomBingoNumber, getPresetPatterns, getBallDisplay, getLogoBallDisplay, getLanguageText} from '../utils.js';

class BingoGame extends Component {
  constructor(props) {
    super(props);
    // Set initial state
    // Generate bingo balls
    this.patternPlaceholder = "Choose a pattern";
    this.state = {
      board: generateBingoBalls(),
      previousBall: null,
      currentBall: null,
      totalBallsCalled: 0,
      running: false,
      interval: null,
      delay: 6000,
      presets: getPresetPatterns(),
      selectedPattern: {
        value: this.patternPlaceholder,
        label: this.patternPlaceholder,
        pattern: {
          B: [false, false, false, false, false],
          I: [false, false, false, false, false],
          N: [false, false, false, false, false],
          G: [false, false, false, false, false],
          O: [false, false, false, false, false]
        }
      },
      // Speech synthesis
      speechEnabled: window.hasOwnProperty('speechSynthesis'),
      synth: window.speechSynthesis,
      selectedCaller: null,
      // Checkbox values
      skipUnused: true,
      wildBingo: false,
      muteCaller: false,
      displayBoardOnly: false
    }
    // if speech is enabled, initialize other speech properties
    if (this.state.speechEnabled) {
      this.state.synth.onvoiceschanged = this.loadVoices;
      this.state.voices = this.state.synth.getVoices();
    }
  }

  initializeFromLocalStorage = () => {
    let skipUnused, muteCaller, displayBoardOnly = false;

    if(localStorage.getItem('lpb-skipUnused')){
      skipUnused = localStorage.getItem('lpb-skipUnused') === "true";
    }
    if(localStorage.getItem('lpb-muteCaller')){
      muteCaller = localStorage.getItem('lpb-muteCaller') === "true";
    }
    if(localStorage.getItem('lpb-displayBoardOnly')){
      displayBoardOnly = localStorage.getItem('lpb-displayBoardOnly') === "true";
    }

    this.setState({
      skipUnused: skipUnused, muteCaller: muteCaller, displayBoardOnly: displayBoardOnly
    })
  }

  /**
   * In case of going from one page to another, when we return
   * and the component has mounted reinitialize the game from
   * local storage.
   *
   */
  componentDidMount(){
    this.initializeFromLocalStorage();
    this.loadVoices();
  }

  /* ------------------- Speech Synthesis Functions */
  /*
   *  Load Voices Function
   *  Will load voices as they change within the browser
   */
  loadVoices = () => {
    let voices = this.state.synth.getVoices();
    let caller = null;
    if(localStorage.getItem('lpb-selectedCaller')){
      let selectedCaller = JSON.parse(localStorage.getItem('lpb-selectedCaller'));
      voices.forEach(voice => {
        if(voice.name === selectedCaller.value){
          caller = voice;
        }
      })
    }
    this.setState({voices: voices, selectedCaller: caller});
  };

  /*
   *  Say Function
   *  Will speak any string that is passed in
   */
  say = (text) => {
    if (this.state.speechEnabled && !this.state.muteCaller) {
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

  /**
   * Cancel speech function
   * Will cancel any existing speech
   */
  cancelSpeech = () => {
    if(window.speechSynthesis.speaking){
      window.speechSynthesis.cancel();
    }
  };

  voiceCall = (ball) => {
    // call the new ball, first call it all together, then call each character individually
    let ballstring = ball.number.toString();
    this.say([ball.letter, ball.number, ' ', ' ', ball.letter, ' ',
      (ballstring.length === 2 ? [ballstring.charAt(0), ' ', ballstring.charAt(1)] : ball.number)]);
  }


  /* ------------------- Gameplay Functions */

  startNewGame = () => {
    // Start with the Let's Play Bingo call out 
    // (the .say method will mute if caller is muted)
    this.say("Let's Play Bingo!");
    if(this.state.wildBingo){
      // Variables used for wild bingo
      let randomBingoNumber = getRandomBingoNumber();
      let wildNumber = randomBingoNumber.toString().substr(-1);
      let wildBall = null;
      let lastBall = null;
      let board = this.state.board;
      let totalBallsCalled = this.state.totalBallsCalled;

      Object.keys(board).forEach(letter => {
        board[letter].forEach(number => {
          if(number.number === randomBingoNumber){
            number.called = true;
            number.active = true;
            wildBall = number;
            totalBallsCalled++;
            this.voiceCall(number);
          }
          if(number.number.toString().substr(-1) === wildNumber){
            lastBall = number;
            number.called = true;
            totalBallsCalled++;
          }
          return number;
        })
        return letter;
      });
      this.setState({
        board: board,
        previousBall: lastBall,
        currentBall: wildBall,
        totalBallsCalled: totalBallsCalled
      });
    } else {
      this.toggleGame();
    }

  }

  toggleGame = () => {
    let running = this.state.running;
    let interval = null;
    if(running){
      clearInterval(this.state.interval);
    } else {
      this.callBingoNumber();
      interval = setInterval(this.callBingoNumber, this.state.delay);
    }
    this.setState({
      running: !running,
      interval: interval
    });
  }

  resetGame = () => {
    clearInterval(this.state.interval);
    this.setState({
      board: generateBingoBalls(),
      previousBall: null,
      currentBall: null,
      totalBallsCalled: 0,
      running: false,
      interval: null
    })
  }

  callBingoNumber = () => {
    let board = this.state.board;
    let currentBall = null;
    let previousBall = this.state.currentBall;
    let updateState = false;
    let totalBallsCalled = this.state.totalBallsCalled;
    let selectedPattern = this.state.selectedPattern;
    let randomBingoNumber = getRandomBingoNumber();
    let callAgain = false;

    if(totalBallsCalled < 75){
      Object.keys(board).map(letter => {
        board[letter].map((number)=>{
          number.active = false;
          if(number.number === randomBingoNumber){
            if(number.called){
              callAgain = true;
            } else {
              updateState = true;
              number.called = true;
              currentBall = number;
              if(this.state.skipUnused && selectedPattern.value !== this.patternPlaceholder && selectedPattern.pattern[letter].indexOf(true) < 0){
                callAgain = true;
              } else {
                number.active = true;
                this.voiceCall(number);
              }
              totalBallsCalled++;
            }
          }
          return number;
        })
        return letter;
      })
    }
    if(updateState){
      this.setState({
        board: board,
        currentBall: currentBall,
        previousBall: previousBall,
        totalBallsCalled: totalBallsCalled
      });
    }
    if(callAgain){
      this.callBingoNumber();
    }
  }


  /* ------------------ Handlers */
  handleDelayChange = (e) => {
    if(this.state.interval !== null){
      clearInterval(this.state.interval);
      this.setState({delay: e, interval: setInterval(this.callBingoNumber, e)});
    } else {
      this.setState({delay: e});
    }
  }

  handleCheckbox = (e) => {
    let gamemode = e.currentTarget.dataset.gamemode;
    switch(gamemode){
      case 'skip-unused':
        this.setState({skipUnused: e.currentTarget.checked});
        localStorage.setItem('lpb-skipUnused', e.currentTarget.checked);
        break;
      case 'wild-bingo':
        this.setState({wildBingo: e.currentTarget.checked});
        break;
      case 'mute-caller':
        if(this.state.synth.speaking){
          this.cancelSpeech();
        }
        this.setState({muteCaller: e.currentTarget.checked});
        localStorage.setItem('lpb-muteCaller', e.currentTarget.checked);
        break;
      case 'display-board':
        if(e.currentTarget.checked && this.state.running){
          clearInterval(this.state.interval);
        }
        this.setState({displayBoardOnly: e.currentTarget.checked, running: false});
        localStorage.setItem('lpb-displayBoardOnly', e.currentTarget.checked);
        break;
      default:
        break;
    }
  }

  handleUpdatePattern = (pattern, letter, index, slot) => {
    pattern[letter][index] = !slot;
    let customPattern = {value: "Custom", label: "Custom", pattern: pattern};
    this.setState({selectedPattern: customPattern});
  };

  handleChoosePattern = (e) => {
    this.setState({
      selectedPattern: e
    })
  };

  /* ------------------- JSX Display Functions */
  
  /**
   * Returns a JSX element to display the current ball
   *
   * @return  {JSX}  JSX Element
   */
  get currentBallDisplay(){
    return this.state.currentBall !== null ? getBallDisplay(this.state.currentBall) : getLogoBallDisplay();
  }

  /**
   * Returns a JSX element to display the previous ball
   *
   * @return  {JSX}  JSX Element
   */
  get previousBallDisplay(){
    return this.state.previousBall !== null ? getBallDisplay(this.state.previousBall) : getLogoBallDisplay();
  }

  /**
   * Get Number Display shown above the pattern display
   *
   * @return  {JSX}  html element
   */
  get numberDisplay() {
    let numbers = this.state.totalBallsCalled.toString().split('');
    if(numbers.length === 1){
      return <div><span>&nbsp;</span><span>{numbers[0]}</span></div>
    } else {
      return numbers.map((number, index) => (
        <span key={"numDisplay" + number + index}>{number}</span>
      ))
    }
  }

  /**
   * Get the current call display
   *
   * @return  {JSX}  html element
   */
  get currentCallDisplay() {
    const currentCall = this.state.currentBall;
    if(currentCall){
      let numbers = ["0"];
      if(currentCall.hasOwnProperty('number')){
        numbers = currentCall.number.toString().split('');
      }
      if(numbers.length === 1){
        return <div><span>&nbsp;</span><span>{numbers[0]}</span></div>
      } else {
        return numbers.map((number, index) => (
          <span key={"call" + number + index}>{number}</span>
        ))
      }
    } else {
      return <div><span>&nbsp;</span><span>&nbsp;</span></div>
    }
  }

  /**
   * Get the previous call display
   *
   * @return  {JSX}  html element
   */
  get previousCallDisplay() {
    const previousCall = this.state.previousBall;
    if(previousCall){
      let numbers = ["0"];
      if(previousCall.hasOwnProperty('number')){
        numbers = previousCall.number.toString().split('');
      }
      if(numbers.length === 1){
        return <div><span>&nbsp;</span><span>{numbers[0]}</span></div>
      } else {
        return numbers.map((number, index) => (
          <span key={"call" + number + index}>{number}</span>
        ))
      }
    } else {
      return <div><span>&nbsp;</span><span>&nbsp;</span></div>
    }
  }

  /* ------------------- Voice Synthesis */
  
  /**
   * Returns the options for the voice selection menu
   *
   * @return  {Array}  Options array
   */
  get voiceOptions(){
    let voiceOptions = [];
    if(this.state.speechEnabled){
      this.state.voices.forEach(voice => {
        let voiceObj = voice;
        voiceObj.value = voice.name;
        voiceObj.label = voice.name + ' / ' + getLanguageText(voice.lang);
        voiceOptions.push(voiceObj);
      })
    }
    return voiceOptions;
  }

  /*
  *  Choose Caller Function
  *  This sets the selected caller
  */
  handleChooseCaller = (e) => {
    this.setState({
      selectedCaller: e
    })
    localStorage.setItem('lpb-selectedCaller', JSON.stringify(e));
  };

  /* ------------------- Display Board Only */
  manualCall = (ball) => {
    let board = this.state.board;
    let currentBall = null;
    let previousBall = this.state.currentBall;
    let totalBallsCalled = this.state.totalBallsCalled;
    Object.keys(board).forEach(letter => {
      board[letter].forEach(number => {
        number.active = false;
        if(ball.number === number.number){
          number.called = true;
          number.active = true;
          currentBall = number;
          totalBallsCalled++;
        }
        return number;
      })
      return letter;
    })
    this.setState({board: board, currentBall: currentBall, previousBall: previousBall, totalBallsCalled: totalBallsCalled});
  }


  /* ------------------- Render */
  render(){
    return(
      <div>
        <section className="dark-blue-bg padding-sm"></section>
        {/* ----------- Bingo Board ------------- */}
        <section className="board-block dark-bg">
          <div className="row no-wrap vertical-center">
            <div className="col shrink">
              <div className="padding-vertical-md padding-horizontal-xlg">
                <div className="ball-row row vertical">
                  <div className="col">
                    {this.currentBallDisplay}
                  </div>
                </div>
                <div className="row no-wrap margin-vertical-lg white-text uppercase small-text">
                  <div className="col text-center">
                    <div className="callNumber">{this.numberDisplay}</div>
                    <strong>Total Calls</strong>
                  </div>
                  <div className="col text-center">
                    <div className="callNumber">{this.previousCallDisplay}</div>
                    <strong>Previous Call</strong>
                  </div>
                </div>
                <Pattern pattern={this.state.selectedPattern} update={this.handleUpdatePattern} />
              </div>
            </div>
            <div className="col">
              <BingoBoard board={this.state.board} manualMode={this.state.displayBoardOnly} manualCall={this.manualCall} />
            </div>
          </div>
        </section>
        
        {/* ----------- Game Controls ------------- */}
        <section className="game-controls dark-blue-bg padding-md">
          <div className="row no-wrap vertical-center horizontal-start">
            <div className="col shrink padding-horizontal-sm">
              <Select 
                className="pattern-select"
                placeholder="Choose Pattern"
                value={this.state.selectedPattern}
                onChange={this.handleChoosePattern}
                options={this.state.presets}
              />
            </div>
            <div className="col shrink padding-horizontal-sm">
              <button onClick={this.resetGame} disabled={this.state.running}>New Game</button>
            </div>
            <div data-visibility={this.state.displayBoardOnly ? "hide" : "show"} className="col shrink padding-horizontal-sm">
              <button onClick={this.state.totalBallsCalled === 0 ? this.startNewGame : this.toggleGame}>{this.state.running ? "Pause" : this.state.totalBallsCalled === 0 ? "Start" : "Resume"}</button>
            </div>
            <div data-visibility={this.state.displayBoardOnly ? "hide" : "show"} className="col shrink padding-horizontal-sm">
              <button onClick={this.callBingoNumber} disabled={this.state.running}>Next Number</button>
            </div>
            <div data-visibility={this.state.displayBoardOnly ? "hide" : "show"} className="col shrink text-center padding-horizontal-sm">
              <div className="row no-wrap vertical-center">
                <div className="col shrink padding-right-lg small-text">SLOW</div>
                <div className="col"><Slider min={1500} max={10000} step={500} value={this.state.delay} onChange={this.handleDelayChange} reverse={true} /></div>
                <div className="col shrink padding-left-lg small-text">FAST</div>
              </div>
            </div>
            <div data-visibility={this.state.displayBoardOnly ? "hide" : "show"} className="col shrink padding-horizontal-md">
              <label className={this.state.muteCaller ? 'toggle checked' : 'toggle'}>
                <input type="checkbox" data-gamemode="mute-caller" onChange={this.handleCheckbox} checked={this.state.muteCaller}></input>
                <span>Mute Caller</span>
                <span className="toggle-span"></span>
              </label>
            </div>
            <div data-visibility={this.state.displayBoardOnly ? "hide" : "show"} className="col shrink padding-horizontal-sm">
              <Select 
                className="voice-select"
                placeholder="Choose Caller"
                value={this.state.selectedCaller}
                onChange={this.handleChooseCaller}
                options={this.voiceOptions}
              />
            </div>
          </div>
        </section>

        {/* ----------- Game Settings ------------- */}

        <section className="game-settings pale-gray-bg padding-md">
          <div className="row no-wrap vertical-center horizontal-start">
            <div className="col padding-horizontal-sm">
              <h4 className="no-margin">GAME MODES:</h4>
            </div>
            <div className="col shrink padding-horizontal-md">
              <label className={this.state.displayBoardOnly ? 'toggle checked' : 'toggle'}>
                <input type="checkbox" data-gamemode="display-board" onChange={this.handleCheckbox} checked={this.state.displayBoardOnly}></input>
                <span>Display Board Only</span>
                <span className="toggle-span"></span>
              </label>
            </div>
            <div className="col shrink padding-horizontal-md">
              <label data-visibility={this.state.displayBoardOnly ? "hide" : "show"} className={this.state.skipUnused ? 'toggle checked' : 'toggle'}>
                <input type="checkbox" data-gamemode="skip-unused" onChange={this.handleCheckbox} checked={this.state.skipUnused}></input>
                <span>Skip Unused Numbers</span>
                <span className="toggle-span"></span>
              </label>
            </div>
            <div className="col shink padding-horizontal-md">
              <label data-visibility={this.state.displayBoardOnly ? "hide" : "show"} className={this.state.wildBingo ? 'toggle checked' : 'toggle'}>
                <input type="checkbox" data-gamemode="wild-bingo" onChange={this.handleCheckbox} checked={this.state.wildBingo}></input>
                <span>Wild Bingo</span>
                <span className="toggle-span"></span>
              </label>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default BingoGame;