/*
 * Let's Play Bingo
 * Version 3.0
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
    // -------------------------- Set properties ----- //
    // Balls display pieces
    this.totalBallsCalled = 0;
    this.previousBall = null;
    this.currentBall = null;
    this.interval = null;
    this.previousCallList = [];

    // Patterns
    this.patternPlaceholder = "Choose a pattern";
    this.presets = getPresetPatterns();

    // Speech Synthesis
    this.speechEnabled = window.hasOwnProperty('speechSynthesis');
    this.synth = window.speechSynthesis;

    // if speech is enabled, initialize other speech properties
    if (this.speechEnabled === true) {
      this.synth.onvoiceschanged = this.loadVoices;
      this.voices = this.synth.getVoices();
    }

    // Set initial state
    this.state = {
      board: generateBingoBalls(),
      displayBoardOnly: false,
      delay: 6000,
      running: false,
      enableCaller: false,
      skipUnused: true,
      wildBingo: false,
      evensOdds: false,
      doubleCall: false,
      extraTalk: true,
      selectedCaller: null,
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
      }
    }
  }

  initializeFromLocalStorage = () => {
    let skipUnused = localStorage.getItem('lpb-skipUnused');
    let enableCaller = localStorage.getItem('lpb-enableCaller');
    let wildBingo = localStorage.getItem('lpb-wildBingo');
    let evensOdds = localStorage.getItem('lpb-evensOdds');
    let doubleCall = localStorage.getItem('lpb-doubleCall');
    let extraTalk = localStorage.getItem('lpb-extraTalk');
    let callDelay = localStorage.getItem('lpb-callDelay');
    let displayBoardOnly = localStorage.getItem('lpb-displayBoardOnly');
    let selectedCaller = localStorage.getItem('lpb-selectedCaller');
    
    this.setState({
      displayBoardOnly: displayBoardOnly !== undefined ? displayBoardOnly === "true" : false,
      skipUnused: skipUnused !== undefined ? skipUnused === "true" : true,
      enableCaller: enableCaller !== undefined ? enableCaller === "true" : false,
      wildBingo: wildBingo !== undefined ? wildBingo === "true" : false,
      evensOdds: evensOdds !== undefined ? evensOdds === "true" : false,
      doubleCall: doubleCall !== undefined ? doubleCall === "true" : false,
      extraTalk: extraTalk !== undefined ? extraTalk === "true" : false,
      callDelay: callDelay !== undefined ? parseInt(callDelay) : 6000,
      selectedCaller: selectedCaller !== undefined ? JSON.parse(selectedCaller) : null
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
    this.voices = this.synth.getVoices();
    if(this.state.selectedCaller !== null){
      this.voices.forEach(voice => {
        if(voice.name === this.state.selectedCaller.value){
          this.setState({selectedCaller: voice});
        }
      })
    }
  };

  /*
   *  Say Function
   *  Will speak any string that is passed in
   */
  say = (text) => {
    if (this.speechEnabled === true && this.state.enableCaller === true) {
      // Create a new instance of SpeechSynthesisUtterance.
      let msg = new SpeechSynthesisUtterance();
      msg.text = text;
      msg.volume = 1;
      if (this.state.hasOwnProperty('selectedCaller')) {
        msg.voice = this.state.selectedCaller;
      }
      this.cancelSpeech();
      this.synth.speak(msg);
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
    if(this.state.doubleCall){
      this.say([ball.letter, ball.number, ' ', ' ', ball.letter, ' ',
        (ballstring.length === 2 ? [ballstring.charAt(0), ' ', ballstring.charAt(1)] : ball.number)]);
    } else {
      this.say([ball.letter, ball.number]);
    }
  }

  wildBallCall = (ball) => {
    // call the wild ball, 
    let ballstring = ball.number.toString();
    if(this.state.extraTalk){
      if(this.state.evensOdds){
        window.setTimeout(() => {
          this.say(['The wild number ', ' ', ball.letter, ' ', ball.number, ' ', ' ', ` mark every ${(ball.number % 2) === 1 ? 'odd number' : 'even number'}`])
        },2000);
      } else {
        window.setTimeout(() => {
          this.say(['The wild number ', ' ', ball.letter, ' ', ball.number, ' ', ' ', ` mark every number ending in ${ballstring.substr(-1)}`])
        },2000);
      }
    } else {
      if(this.state.doubleCall){
        this.say([ball.letter, ball.number, ' ', ' ', ball.letter, ' ',
        (ballstring.length === 2 ? [ballstring.charAt(0), ' ', ballstring.charAt(1)] : ball.number)]);
      } else {
        this.say([ball.letter, ' ', ball.number]);
      }
    }
  }


  /* ------------------- Gameplay Functions */

  startNewGame = () => {
    // Start with the Let's Play Bingo call out 
    // (the .say method will not run if caller is not enabled)
    if(this.state.wildBingo){
      if(this.state.enableCaller && this.state.extraTalk){
        this.say("Let's Play Wild Bingo!");
        window.setTimeout(() => {
          this.startWildBingo();
        }, 2000)
      } else {
        this.startWildBingo();
      }
    } else {
      if(this.state.enableCaller){
        if(this.state.extraTalk){
          this.say("Let's Play Bingo!");
          window.setTimeout(() => {this.callBingoNumber();},2000);
        } else {
          this.callBingoNumber();
        }
      } else {
        this.callBingoNumber();
      }
    }
  }

  startNewAutoplayGame = () => {
    if(this.state.wildBingo){
      this.startNewGame();
    } else {
      if(this.state.enableCaller){
        if(this.state.extraTalk){
          this.say("Let's Play Bingo!");
          window.setTimeout(()=> {
            this.toggleGame();
          },2000);
        } else {
          this.toggleGame();
        }
      } else {
        this.toggleGame();
      }
    }
  }

  startWildBingo = () => {
    // Variables used for wild bingo
    let randomBingoNumber = getRandomBingoNumber();
    let wildNumber = randomBingoNumber.toString().substr(-1);
    let odd = (wildNumber % 2) === 1;
    let wildBall = null;
    let lastBall = null;
    let board = this.state.board;
    let totalBallsCalled = this.totalBallsCalled;

    Object.keys(board).forEach(letter => {
      board[letter].forEach(number => {
        if(!number.called){
          if(number.number === randomBingoNumber){
            number.called = true;
            number.active = true;
            wildBall = number;
            if(this.state.enableCaller){
              this.wildBallCall(number);
            }
            totalBallsCalled++;
            this.previousCallList.push(number);
          } else if(!this.state.evensOdds && number.number.toString().substr(-1) === wildNumber){
            lastBall = number;
            number.called = true;
            totalBallsCalled++;
            this.previousCallList.push(number);
          } else if(this.state.evensOdds && ((number.number % 2 === 1) === odd)){
            lastBall = number;
            number.called = true;
            totalBallsCalled++;
            this.previousCallList.push(number);
          }
        }
        return number;
      });
      return letter;
    });
    this.totalBallsCalled = totalBallsCalled;
    this.previousBall = lastBall;
    this.currentBall = wildBall;
    this.setState({board: board});
  }

  toggleGame = () => {
    let running = this.state.running;
    if(running === true){
      clearInterval(this.interval);
    } else {
      this.callBingoNumber();
      this.interval = setInterval(this.callBingoNumber, this.state.delay);
    }
    this.setState({running: !running});
  }

  resetGame = () => {
    clearInterval(this.interval);
    this.cancelSpeech();
    this.previousCallList = [];
    this.totalBallsCalled = 0;
    this.previousBall = null;
    this.currentBall = null;
    this.setState({board: generateBingoBalls(), running: false})
  }

  callBingoNumber = () => {
    let totalBallsCalled = this.totalBallsCalled;
    if(totalBallsCalled < 75){
      let board = this.state.board;
      let currentBall = null;
      let previousBall = this.currentBall;
      let selectedPattern = this.state.selectedPattern;
      let randomBingoNumber = getRandomBingoNumber();
      let callAgain = false;
      let updateState = false;
  
      // Map through the letters on the board
      Object.keys(board).map(letter => {
        // Map through each number 1-15 under each letter on the board
        board[letter].map((number)=>{
          // automatically set the number as not active (this will clear any previously active numbers)
          number.active = false;
          // If this is the match to the random number we called, do logic
          if(number.number === randomBingoNumber){
            // if the number was not called, do logic. Else call again
            if(!number.called){
              // increment the total balls called.
              totalBallsCalled++;
              // set to called and add to previously called numbers
              number.called = true;
              this.previousCallList.push(number);

              currentBall = number;
              // if we are skipping unused numbers, a pattern has been selected, and this letter is not in use, we want to call a new number when 
              // we are done here.
              if(this.state.skipUnused && selectedPattern.value !== this.patternPlaceholder && selectedPattern.unusedLetters.indexOf(letter) >= 0){
                callAgain = true;
              } else {
                // set ball to active since we won't be calling again
                this.voiceCall(number);
                number.active = true;
              }
              updateState = true;
              this.totalBallsCalled = totalBallsCalled;
            } else {
              // call again cause we got a ball we already called
              callAgain = true;
            }
          }
          return number;
        })
        return letter;
      })

      if(updateState){
        this.previousBall = previousBall;
        this.currentBall = currentBall;
        this.setState({board: board});
      }
      if(callAgain && totalBallsCalled < 75){
        this.callBingoNumber();
      }
    } else {
      clearInterval(this.interval);
      this.totalBallsCalled = 75;
      this.say("Someone better have a bingo because we have run out of balls to call!");
      this.previousBall = this.currentBall;
      this.currentBall = null;
      this.setState({running: false});
    }
  }


  /* ------------------ Handlers */
  handleDelayChange = (e) => {
    if(this.state.running === true){
      clearInterval(this.interval);
      this.interval = setInterval(this.callBingoNumber, e);
    }
    this.setState({delay: e});
    localStorage.setItem('lpb-callDelay', e);
  }

  handleCheckbox = (e) => {
    let gamemode = e.currentTarget.dataset.gamemode;
    switch(gamemode){
      case 'skip-unused':
        this.setState({skipUnused: e.currentTarget.checked});
        localStorage.setItem('lpb-skipUnused', e.currentTarget.checked);
        break;
      case 'enable-doublecall':
        this.setState({doubleCall: e.currentTarget.checked});
        localStorage.setItem('lpb-doubleCall', e.currentTarget.checked);
        break;
      case 'enable-extratalk':
        this.setState({extraTalk: e.currentTarget.checked});
        localStorage.setItem('lpb-extraTalk', e.currentTarget.checked);
        break;
      case 'wild-bingo':
        this.setState({wildBingo: e.currentTarget.checked});
        localStorage.setItem('lpb-wildBingo', e.currentTarget.checked);
        break;
        case 'evens-odds':
          this.setState({evensOdds: e.currentTarget.checked});
          localStorage.setItem('lpb-evensOdds', e.currentTarget.checked);
          break;
      case 'enable-caller':
        if(this.synth.speaking){
          this.cancelSpeech();
        }
        this.setState({enableCaller: e.currentTarget.checked});
        localStorage.setItem('lpb-enableCaller', e.currentTarget.checked);
        break;
      case 'display-board':
        if(e.currentTarget.checked && this.state.running){
          clearInterval(this.interval);
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
    let unusedLetters = [];
    Object.keys(pattern).map(letter => {
      if(pattern[letter].indexOf(true) < 0){
        unusedLetters.push(letter);
      }
      return letter;
    })
    let customPattern = {value: "Custom", label: "Custom", unusedLetters: unusedLetters, pattern: pattern};
    this.setState({selectedPattern: customPattern});
  };

  /* ------------------- JSX Display Functions */
  
  /**
   * Returns a JSX element to display the current ball
   *
   * @return  {JSX}  JSX Element
   */
  get currentBallDisplay(){
    return this.currentBall !== null ? getBallDisplay(this.currentBall) : getLogoBallDisplay();
  }

  /**
   * Get Number Display shown above the pattern display
   *
   * @return  {JSX}  html element
   */
  get numberDisplay() {
    let numbers = this.totalBallsCalled.toString().split('');
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
    const currentCall = this.currentBall;
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
    const previousCall = this.previousBall;
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

  /**
   * [previousCallList description]
   *
   * @return  {[JSX]}  [return description]
   */
  get previousCallListDisplay() {
    const previousCallList = JSON.parse(JSON.stringify(this.previousCallList));
    let last5Calls = previousCallList.reverse().slice(1,6);
    if(last5Calls.length > 0){
      return (
        <div>
          <h6 className="blue-text text-center margin-top-xlg margin-bottom-md">Last 5 Calls</h6>
          <div className="previous-calls notranslate">
            {last5Calls.map(call => {
              return (
                <div className={call.color}><span>{call.number}</span></div>
              )
            })}
          </div>
        </div>
      );
    } else {
      return <div></div>
    }
  }

  /* ------------------- Speech Synthesis */
  
  /**
   * Returns the options for the voice selection menu
   *
   * @return  {Array}  Options array
   */
  get voiceOptions(){
    let voiceOptions = [];
    if(this.speechEnabled === true){
      this.voices.forEach(voice => {
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
    this.setState({selectedCaller: e})
    localStorage.setItem('lpb-selectedCaller', JSON.stringify(e));
  };

  /* ------------------- Display Board Only Mode */
  manualCall = (ball) => {
    let board = this.state.board;
    let currentBall = null;
    let previousBall = this.currentBall;
    let totalBallsCalled = this.totalBallsCalled;
    Object.keys(board).forEach(letter => {
      board[letter].forEach(number => {
        number.active = false;
        if(ball.number === number.number){
          if(number.called){
            number.called = false;
            totalBallsCalled--;
            this.previousCallList = this.previousCallList.filter((previousBall) => {return previousBall !== ball});
            previousBall = this.previousCallList[this.previousCallList.length - 1];
          } else {
            this.previousCallList.push(number);
            number.called = true;
            number.active = true;
            totalBallsCalled++;
            currentBall = number;
          }
        }
        return number;
      })
      return letter;
    })
    this.totalBallsCalled = totalBallsCalled;
    this.previousBall = previousBall;
    this.currentBall = currentBall;
    this.setState({board: board});
  }


  /* ------------------- Render */
  render(){
    return(
      <div className="dark-bg light-links">
        <section className="dark-blue-bg padding-sm"></section>
        {/* ----------- Bingo Board ------------- */}
        <section className="board-block">
          <div className="row no-wrap align-stretch">
            {/* ------ Board ------- */}
            <div className="col pattern-side shrink min-size-200 padding-xlg">
              {/* -------- Digital Displays --------- */}
              <div className="row no-wrap margin-bottom-lg justify-space-between white-text">
                <div className="col text-center margin-sm">
                  <div className="callNumber notranslate">{this.numberDisplay}</div>
                  <div className="callNumber-text uppercase">Total Calls</div>
                </div>
                <div className="col text-center margin-sm">
                  <div className="callNumber notranslate">{this.previousCallDisplay}</div>
                  <div className="callNumber-text uppercase">Previous Call</div>
                </div>
              </div>

              {/* -------- Pattern --------- */}
                <Pattern pattern={this.state.selectedPattern} update={this.handleUpdatePattern} />
                <div className="padding-vertical-lg">
                  <Select 
                    className="pattern-select"
                    placeholder="Choose Pattern"
                    value={this.state.selectedPattern}
                    onChange={(e) => {this.setState({selectedPattern: e})}}
                    options={this.presets}
                  />
                </div>
            </div>
            <div className="col board-side">
              <BingoBoard board={this.state.board} manualMode={this.state.displayBoardOnly} manualCall={this.manualCall} />
            </div>

          </div>
        </section>

        <section className="dark-blue-bg padding-sm"></section>


        {/* ----------- BOTTOM SECTION ------------- */}
        
        <section className="game-controls dark-bg">
          <div className="row justify-start align-start">

            {/* ----------- Current Ball Display ------------- */}
            <div className="col min-size-250 padding-vertical-xxlg padding-horizontal-md notranslate">
              {this.currentBallDisplay}
            </div>

            {/* ----------- Gameplay Controls ------------- */}
            <div className="col shrink padding-vertical-xxlg padding-horizontal-md">
              <section className="gameplay-controls">

                <div data-disabled={this.totalBallsCalled >= 75}>
                  <button data-disabled={this.state.displayBoardOnly} onClick={this.totalBallsCalled === 0 ? this.startNewGame : this.callBingoNumber} disabled={this.state.running}>
                    {this.totalBallsCalled === 0 ? "Start New Game" : "Call Next Number"}
                  </button>

                  <button data-disabled={this.state.displayBoardOnly} data-newgame={this.totalBallsCalled === 0}
                    onClick={this.totalBallsCalled === 0 ? this.startNewAutoplayGame : this.toggleGame}>
                      {this.state.running ? "Pause Autoplay" : "Start Autoplay"}
                  </button>
                </div>

                <button onClick={this.resetGame} disabled={this.state.running || this.totalBallsCalled === 0}>
                  Reset Board
                </button>
              </section>

              {this.previousCallListDisplay}
            </div>

            {/* ----------- Game Settings ------------- */}
            <div className="col grow no-wrap padding-vertical-xxlg padding-horizontal-md white-text">
              <section className="game-settings">

                {/* ----------- Autoplay Settings ---------- */}
                <div className="row no-wrap align-center justify-start">
                  <div className="col shrink min-size-150 padding-horizontal-lg">
                    <h6 className="no-margin blue-text">Autoplay Speed:</h6>
                  </div>
                  <div className="col shrink text-center padding-vertical-lg padding-horizontal-lg">
                    <div className="row no-wrap align-center" data-disabled={this.state.displayBoardOnly}>
                      <div className="col shrink padding-right-lg white-text">Slower</div>
                      <div className="col"><Slider min={3500} max={30000} step={500} value={this.state.delay} onChange={this.handleDelayChange} reverse={true} /></div>
                      <div className="col shrink padding-left-lg white-text">Faster</div>
                    </div>
                  </div>
                </div>
              
                {/* ----------- Gameplay Settings ---------- */}
                <div className="row align-top justify-start">
                  <div className="col shrink min-size-150 padding-horizontal-lg padding-vertical-md">
                    <h6 className="no-margin blue-text">Gameplay Settings:</h6>
                  </div>
                  <div className="col grow min-size-150 padding-horizontal-lg">
                    <div className="row">
                      <div className="col padding-right-lg grow" data-disabled={this.totalBallsCalled > 0}>
                        <label className={this.state.displayBoardOnly ? 'toggle checked' : 'toggle'}>
                          <span className="toggle-span"></span>
                          <span>Manual Calling Mode</span>
                          <input type="checkbox" data-gamemode="display-board" onChange={this.handleCheckbox} checked={this.state.displayBoardOnly}></input>
                        </label>
                      </div>
                      <div className="col" data-disabled={this.state.displayBoardOnly}>
                        <label className={this.state.skipUnused ? 'toggle checked' : 'toggle'}>
                          <span className="toggle-span"></span>
                          <span>Skip Unused Numbers</span>
                          <input type="checkbox" data-gamemode="skip-unused" onChange={this.handleCheckbox} checked={this.state.skipUnused}></input>
                        </label>
                      </div>
                    </div>
                    <div className="row justify-start">
                      <div className="col padding-right-lg" data-disabled={this.state.displayBoardOnly || this.totalBallsCalled > 0}>
                        <label className={this.state.wildBingo ? 'toggle checked' : 'toggle'}>
                          <span className="toggle-span"></span>
                          <span>Wild Bingo</span>
                          <input type="checkbox" data-gamemode="wild-bingo" onChange={this.handleCheckbox} checked={this.state.wildBingo}></input>
                        </label>
                      </div>
                      <div className="col" data-disabled={!this.state.wildBingo || this.state.displayBoardOnly || this.totalBallsCalled > 0}>
                        <label className={this.state.evensOdds ? 'toggle checked' : 'toggle'}>
                          <span className="toggle-span"></span>
                          <span>Evens/Odds</span>
                          <input type="checkbox" data-gamemode="evens-odds" onChange={this.handleCheckbox} checked={this.state.evensOdds}></input>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>


                {/* ----------- Caller Settings ---------- */}
                <div className="row no-wrap align-start justify-start margin-top-sm">
                  
                  <div className="col shrink min-size-150 padding-vertical-md padding-horizontal-lg">
                    <h6 className="no-margin blue-text">Bingo Caller:</h6>
                  </div>

                  <div className="col grow padding-horizontal-lg" data-disabled={this.state.displayBoardOnly}>
                    {/* Disabled if manual calling mode is on */}

                    <div className="row no-wrap justify-start" data-visibility={this.speechEnabled === true ? "show" : "hide"}>
                      {/* Only shown if speech is enabled by the browser */}
                      <div className="col shrink">
                        <label className={this.state.enableCaller ? 'toggle checked' : 'toggle'}>
                          <span className="toggle-span"></span>
                          <span>Enable</span>
                          <input type="checkbox" data-gamemode="enable-caller" onChange={this.handleCheckbox} checked={this.state.enableCaller}></input>
                        </label>
                      </div>
                      <div className="col shrink padding-horizontal-lg" data-visibility={this.state.enableCaller ? "show" : "hide"}>
                        <label className={this.state.doubleCall ? 'toggle checked' : 'toggle'}>
                          <span className="toggle-span"></span>
                          <span>Double Call</span>
                          <input type="checkbox" data-gamemode="enable-doublecall" onChange={this.handleCheckbox} checked={this.state.doubleCall}></input>
                        </label>
                      </div>
                      <div className="col shrink padding-horizontal-lg" data-visibility={this.state.enableCaller ? "show" : "hide"}>
                        <label className={this.state.extraTalk ? 'toggle checked' : 'toggle'}>
                          <span className="toggle-span"></span>
                          <span>Chatty</span>
                          <input type="checkbox" data-gamemode="enable-extratalk" onChange={this.handleCheckbox} checked={this.state.extraTalk}></input>
                        </label>
                      </div>
                    </div>

                    <div className="row no-wrap" data-visibility={this.speechEnabled === true ? "hide" : "show"}>
                      {/* Only shown if speech is DISABLED by the browser */}
                      <div className="col grow">Sorry, but your browser does not support the audible bingo caller.</div>
                    </div>

                    <div className="row no-wrap" data-visibility={this.speechEnabled === true && this.state.enableCaller === true ? "show" : "hide"}>
                      {/* Only shown if speech is enabled by the browser AND caller is enabled by the user */}
                      <div className="col grow margin-top-sm" data-disabled={this.state.displayBoardOnly}>
                        <Select 
                          className="voice-select"
                          placeholder="Choose Caller"
                          value={this.state.selectedCaller}
                          onChange={this.handleChooseCaller}
                          options={this.voiceOptions}
                        />
                      </div>
                    </div>

                  </div>
                </div>
                
              </section>
            </div>

            {/* ----------- Donation ------------- */}
            <div className="col min-size-300 grow padding-vertical-xxlg padding-horizontal-lg white-text">
              <h4 className="no-margin">Donate to Let's Play Bingo!</h4>
              <p className="wrap-text small-text">
                <strong>Let's Play Bingo is the #1 Bingo Caller on Google!</strong><br/>
                Requiring no downloads, and with no ads, it is completely <strong>free</strong> and always will be.
                If you'd like to contribute toward operating costs we are accepting <a href="/donate">donations</a> of any amount 
                via <a href="https://venmo.com/karolbrennan" target="_blank" rel="noopener noreferrer">Venmo</a> or <a href="https://paypal.me/karolbrennan" target="_blank" rel="noopener noreferrer">Paypal</a>!
              </p>
              <p><a href="/donate" className="button">Donate Now</a></p>
            </div>

          </div>
        </section>
      </div>
    )
  }
}

export default BingoGame;