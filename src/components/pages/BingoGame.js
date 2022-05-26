/*
 * Let's Play Bingo
 * Version 3.0
 * App written by Karol Brennan
 * https://karol.dev
 * http://github.com/karolbrennan
 */
// Dependencies
import React, { Component } from "react";
import Select from "react-select";

// Custom Components
import BingoBoard from "../subcomponents/BingoBoard.js";
import Pattern from "../subcomponents/Pattern.js";
import CallHistory from "../subcomponents/CallHistory.js";
import Settings from "../subcomponents/Settings.js";

// Utilities
import Utilities from "../helpers/Utilities";

// Constants
const chimes = Utilities.getChimeOptions();
const sounds = Utilities.getSoundFiles();
const presetPatterns = Utilities.getPresetPatterns();
const patternPlaceholder = "Choose a pattern";

const _speechEnabled = Object.prototype.hasOwnProperty.call(
  window,
  "speechSynthesis"
);
let _synth = window.speechSynthesis;

class BingoGame extends Component {
  constructor(props) {
    super(props);
    // -------------------------- Set properties ----- //
    // Settings Panel Update Control
    this.settingsPanelControl = props.settingsPanelControl;

    // Balls display pieces
    this.totalBallsCalled = 0;
    this.previousBall = null;
    this.currentBall = null;
    this.interval = null;

    // Game State
    // let gameData = JSON.parse(localStorage.getItem("lpb-gameData"));
    // let gameState = JSON.parse(localStorage.getItem("lpb-gameState"));
    this.state = this.getInitialStateData(props);

    // if (gameData && gameState) {
    //   for (let key in gameData) {
    //     this[key] = gameData[key];
    //   }
    //   this.state = gameState;
    // } else {
    //   // Set initial state if no state data exists already from localStorage
    //   this.state = this.getInitialStateData(props);
    // }
  }

  getInitialStateData(props) {
    return {
      settingsPanelOpen: props.settingsPanelOpen,
      board: Utilities.generateBingoBoard(),
      previousCallList: [],
      manualMode: false,
      delay: 6000,
      running: false,
      enableCaller: false,
      skipUnused: false,
      wildBingo: false,
      evensOdds: false,
      doubleCall: false,
      chattyCaller: false,
      chime: false,
      selectedChime: chimes[0],
      selectedCaller: null,
      selectedPattern: {
        value: patternPlaceholder,
        label: patternPlaceholder,
        pattern: {
          B: [false, false, false, false, false],
          I: [false, false, false, false, false],
          N: [false, false, false, false, false],
          G: [false, false, false, false, false],
          O: [false, false, false, false, false],
        },
      },
      showResetModal: false,
    };
  }

  /**
   * In case of going from one page to another, when we return
   * and the component has mounted reinitialize the game from
   * local storage.
   *
   */
  componentDidMount() {
    // ensure the reset modal doesn't show at initial load
    this.setState({ showResetModal: false });
  }

  /**
   * [componentDidUpdate description]
   *
   * @param   {[type]}  prevProps  [prevProps description]
   * @param   {[type]}  state      [state description]
   *
   * @return  {[type]}             [return description]
   */
  componentDidUpdate(prevProps, state) {
    console.log("BingoGame did update", prevProps, state);

    // let gameData = {
    //   totalBallsCalled: this.totalBallsCalled,
    //   previousBall: this.previousBall,
    //   currentBall: this.currentBall,
    //   interval: this.interval,
    // };
    // localStorage.setItem("lpb-gameData", JSON.stringify(gameData));
    // localStorage.setItem("lpb-gameState", JSON.stringify(this.state));
  }

  /**
   * [initializeFromLocalStorage description]
   *
   * @return  {[type]}  [return description]
   */
  initializeFromLocalStorage = () => {
    let gameData = JSON.parse(localStorage.getItem("lpb-gameData"));
    let gameState = JSON.parse(localStorage.getItem("lpb-gameState"));
    if (gameData && gameState) {
      for (let key in gameData) {
        this[key] = gameData[key];
      }
      this.setState(...gameState);
    }
  };

  /* ------------------- Speech Synthesis Functions */

  /*
   *  Say Function
   *  Will speak any string that is passed in
   */
  say = (text) => {
    if (_speechEnabled === true && this.state.enableCaller === true) {
      // Create a new instance of SpeechSynthesisUtterance.
      let msg = new SpeechSynthesisUtterance();
      msg.text = text;
      msg.volume = 1;
      if (Object.prototype.hasOwnProperty.call(this.state, "selectedCaller")) {
        msg.voice = this.state.selectedCaller;
      }
      this.cancelSpeech();
      _synth.speak(msg);
    }
  };

  /**
   * Cancel speech function
   * Will cancel any existing speech
   */
  cancelSpeech = () => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
  };

  /**
   * Handles the audible call of the ball
   *
   * @param   {Object}  ball  Object representing a ball
   */
  voiceCall = (ball) => {
    // call the new ball, first call it all together, then call each character individually
    let ballstring = ball.number.toString();
    if (this.state.doubleCall) {
      this.say([
        ball.letter,
        ball.number,
        " ",
        " ",
        ball.letter,
        " ",
        ballstring.length === 2
          ? [ballstring.charAt(0), " ", ballstring.charAt(1)]
          : ball.number,
      ]);
    } else {
      this.say([ball.letter, ball.number]);
    }
  };

  /**
   * Handles a wild ball call when the wild bingo game mode is active
   *
   * @param   {Object}  ball  Object representing a ball
   */
  wildBallCall = (ball) => {
    // call the wild ball,
    let ballstring = ball.number.toString();
    if (this.state.chattyCaller) {
      if (this.state.evensOdds) {
        window.setTimeout(() => {
          this.say([
            "The wild number ",
            " ",
            ball.letter,
            " ",
            ball.number,
            " ",
            " ",
            ` mark every ${
              ball.number % 2 === 1 ? "odd number" : "even number"
            }`,
          ]);
        }, 2000);
      } else {
        window.setTimeout(() => {
          this.say([
            "The wild number ",
            " ",
            ball.letter,
            " ",
            ball.number,
            " ",
            " ",
            ` mark every number ending in ${ballstring.substr(-1)}`,
          ]);
        }, 2000);
      }
    } else {
      if (this.state.doubleCall) {
        this.say([
          ball.letter,
          ball.number,
          " ",
          " ",
          ball.letter,
          " ",
          ballstring.length === 2
            ? [ballstring.charAt(0), " ", ballstring.charAt(1)]
            : ball.number,
        ]);
      } else {
        this.say([ball.letter, " ", ball.number]);
      }
    }
  };

  /* ------------------- Gameplay Functions */

  startNewGame = () => {
    // Start with the Let's Play Bingo call out
    // (the .say method will not run if caller is not enabled)
    if (this.state.wildBingo) {
      if (this.state.enableCaller && this.state.chattyCaller) {
        this.say("Let's Play Wild Bingo!");
        window.setTimeout(() => {
          this.startWildBingo();
        }, 2000);
      } else {
        this.startWildBingo();
      }
    } else {
      if (this.state.enableCaller) {
        if (this.state.chattyCaller) {
          this.say("Let's Play Bingo!");
          window.setTimeout(() => {
            this.callBingoNumber();
          }, 2000);
        } else {
          this.callBingoNumber();
        }
      } else {
        this.callBingoNumber();
      }
    }
  };

  startNewAutoplayGame = () => {
    if (this.state.wildBingo) {
      this.startNewGame();
    } else {
      if (this.state.enableCaller) {
        if (this.state.chattyCaller) {
          this.say("Let's Play Bingo!");
          window.setTimeout(() => {
            this.toggleGame();
          }, 2000);
        } else {
          this.toggleGame();
        }
      } else {
        this.toggleGame();
      }
    }
  };

  startWildBingo = () => {
    // Variables used for wild bingo
    let randomBingoNumber = Utilities.getRandomBingoNumber();
    let wildNumber = randomBingoNumber.toString().slice(-1);
    let odd = wildNumber % 2 === 1;
    let wildBall = null;
    let lastBall = null;
    let board = this.state.board;
    let totalBallsCalled = this.totalBallsCalled;
    let previousCallList =
      this.state.previousCallList.length > 0
        ? [...this.state.previousCallList]
        : [];

    Object.keys(board).forEach((letter) => {
      board[letter].forEach((number) => {
        if (!number.called) {
          if (number.number === randomBingoNumber) {
            this.setState({ wildBall: letter + " " + randomBingoNumber });
            number.called = true;
            number.active = true;
            wildBall = number;
            if (this.state.enableCaller) {
              this.wildBallCall(number);
            }
            totalBallsCalled++;
            previousCallList.push(number);
          } else if (
            !this.state.evensOdds &&
            number.number.toString().slice(-1) === wildNumber
          ) {
            lastBall = number;
            number.called = true;
            totalBallsCalled++;
            previousCallList.push(number);
          } else if (
            this.state.evensOdds &&
            (number.number % 2 === 1) === odd
          ) {
            lastBall = number;
            number.called = true;
            totalBallsCalled++;
            previousCallList.push(number);
          }
        }
        return number;
      });
      return letter;
    });

    this.totalBallsCalled = totalBallsCalled;
    this.previousBall = lastBall;
    this.currentBall = wildBall;
    this.setState({ board: board, previousCallList: [...previousCallList] });
  };

  toggleGame = () => {
    let running = this.state.running;
    if (running === true) {
      clearInterval(this.interval);
    } else {
      this.callBingoNumber();
      this.interval = setInterval(this.callBingoNumber, this.state.delay);
    }
    this.setState({ running: !running });
  };

  toggleResetModal = () => {
    const currentState = this.state.showResetModal;
    this.setState({ showResetModal: !currentState });
  };

  confirmResetGame = () => {
    // Clear out local storage
    localStorage.removeItem("lpb-gameData");
    localStorage.removeItem("lpb-gameState");
    // reset everything with the board
    clearInterval(this.interval);
    this.cancelSpeech();
    this.totalBallsCalled = 0;
    this.previousBall = null;
    this.currentBall = null;
    this.setState({
      board: Utilities.generateBingoBoard(),
      wildBall: null,
      running: false,
      showResetModal: false,
      previousCallList: [],
    });
  };

  callBingoNumber = () => {
    let totalBallsCalled = this.totalBallsCalled;
    if (totalBallsCalled < 75) {
      let board = this.state.board;
      let currentBall = null;
      let previousBall = this.currentBall;
      let selectedPattern = this.state.selectedPattern;
      let randomBingoNumber = Utilities.getRandomBingoNumber();
      let callAgain = false;
      let updateState = false;
      let previousCallList = [...this.state.previousCallList];

      // Map through the letters on the board
      Object.keys(board).map((letter) => {
        // Map through each number 1-15 under each letter on the board
        board[letter].map((number) => {
          // automatically set the number as not active (this will clear any previously active numbers)
          number.active = false;
          // If this is the match to the random number we called, do logic
          if (number.number === randomBingoNumber) {
            // if the number was not called, do logic. Else call again
            if (!number.called) {
              // increment the total balls called.
              totalBallsCalled++;
              // set to called and add to previously called numbers
              number.called = true;
              previousCallList.push(number);

              currentBall = number;
              // if we are skipping unused numbers, a pattern has been selected, and this letter is not in use, we want to call a new number when
              // we are done here.
              if (
                this.state.skipUnused &&
                selectedPattern.value !== patternPlaceholder &&
                selectedPattern.unusedLetters.indexOf(letter) >= 0
              ) {
                callAgain = true;
              } else {
                // set ball to active since we won't be calling again
                number.active = true;

                //If chime is enabled, play the chime
                if (this.state.chime) {
                  let chime = new Audio(this.state.selectedChime.value);
                  chime.play();
                }
                // if caller is enabled AND chimes are enabled, wait a sec to trigger the voice
                // else just call the voice right away
                if (this.state.chime && this.state.enableCaller) {
                  setTimeout(() => {
                    this.voiceCall(number);
                  }, 1000);
                } else {
                  this.voiceCall(number);
                }
              }
              updateState = true;
              this.totalBallsCalled = totalBallsCalled;
            } else {
              // call again cause we got a ball we already called
              callAgain = true;
            }
          }
          return number;
        });
        return letter;
      });

      if (updateState) {
        this.previousBall = previousBall;
        this.currentBall = currentBall;
        this.setState({ board: board, previousCallList: previousCallList });
      }
      if (callAgain && totalBallsCalled < 75) {
        this.callBingoNumber();
      }
    } else {
      clearInterval(this.interval);
      this.totalBallsCalled = 75;
      this.say(
        "Someone better have a bingo because we have run out of balls to call!"
      );
      this.previousBall = this.currentBall;
      this.currentBall = null;
      this.setState({ running: false });
    }
  };

  shuffleBalls = () => {
    let balls = Utilities.generateBingoBoard();
    let letters = ["B", "I", "N", "G", "O"];
    let sound = new Audio(sounds.shuffle);
    let duration = 1500;
    for (let i = 0; i <= duration; i++) {
      window.setTimeout(() => {
        if (i === 0) {
          sound.play();
        }
        if (i > 0 && i <= duration) {
          flashRandomBall();
          this.setState({ board: balls });
        }
        if (i === duration) {
          sound.pause();
          this.confirmResetGame();
        }
      }, duration);
    }

    function flashRandomBall() {
      let randomLetter = letters[Math.floor(Math.random() * 5)];
      let randomNumber = Math.floor(Math.random() * 15);
      Object.keys(balls).forEach((letter) => {
        Object.values(balls[letter]).forEach((ball) => {
          if (ball.letter === randomLetter) {
            balls[randomLetter][randomNumber].active =
              !balls[randomLetter][randomNumber].active;
            balls[randomLetter][randomNumber].called =
              !balls[randomLetter][randomNumber].called;
          }
          return ball;
        });
      });
    }
  };

  /* ------------------ Handlers */
  handleUpdatePattern = (pattern, letter, index, slot) => {
    pattern[letter][index] = !slot;
    let unusedLetters = [];
    Object.keys(pattern).map((letter) => {
      // Check for free space ONLY first. If it's not the letter N, check for any used spaces.
      if (letter === "N") {
        let markedSpaces = [];
        // loop through each space in the pattern for the letter N
        pattern[letter].forEach((space, index) => {
          // if the space is marked, push the index of the space into markedSpaces array
          if (space) {
            markedSpaces.push(index);
          }
        });
        // if no spaces are marked, OR ONLY the free space is marked - push N to unused letters.
        if (
          markedSpaces.length === 0 ||
          (markedSpaces.length === 1 && markedSpaces[0] === 2)
        ) {
          unusedLetters.push(letter);
        }
      } else {
        if (pattern[letter].indexOf(true) < 0) {
          unusedLetters.push(letter);
        }
      }
      return letter;
    });
    let customPattern = {
      value: "Custom",
      label: "Custom",
      unusedLetters: unusedLetters,
      pattern: pattern,
    };
    this.setState({ selectedPattern: customPattern });
  };

  handleSettingsPanel = (state) => {
    this.setState({ settingsPanelOpen: state });
  };

  handleSettingsUpdate = (values) => {
    let newState = { ...this.state };
    values.forEach((setting) => {
      newState[setting.property] = setting.value;
      switch (setting.property) {
        case "delay":
          if (this.state.running === true) {
            clearInterval(this.interval);
            this.interval = setInterval(this.callBingoNumber, setting.value);
          }
          break;
        case "enableCaller":
          if (_synth.speaking) {
            this.cancelSpeech();
          }
          break;
        case "manualMode":
          if (setting.value === true && this.state.running) {
            clearInterval(this.interval);
          }
          this.setState({
            gameSettings: { running: false },
          });
          break;
        default:
          break;
      }
    });
    this.setState({ ...newState });
  };

  /* ------------------- JSX Display Functions */

  /**
   * Returns a JSX element to display the current ball
   *
   * @return  {JSX}  JSX Element
   */
  get currentBallDisplay() {
    return this.currentBall !== null
      ? Utilities.getBallDisplay(this.currentBall)
      : Utilities.getLogoBallDisplay();
  }

  /**
   * Get Number Display shown above the pattern display
   *
   * @return  {JSX}  html element
   */
  get numberDisplay() {
    let numbers = this.totalBallsCalled.toString().split("");
    if (numbers.length === 1) {
      return (
        <div>
          <span>&nbsp;</span>
          <span>{numbers[0]}</span>
        </div>
      );
    } else {
      return numbers.map((number, index) => (
        <span key={"numDisplay" + number + index}>{number}</span>
      ));
    }
  }

  /**
   * Get the current call display
   *
   * @return  {JSX}  html element
   */
  get currentCallDisplay() {
    const currentCall = this.currentBall;
    if (currentCall) {
      let numbers = ["0"];
      if (Object.prototype.hasOwnProperty.call(currentCall, "number")) {
        numbers = currentCall.number.toString().split("");
      }
      if (numbers.length === 1) {
        return (
          <div>
            <span>&nbsp;</span>
            <span>{numbers[0]}</span>
          </div>
        );
      } else {
        return numbers.map((number, index) => (
          <span key={"call" + number + index}>{number}</span>
        ));
      }
    } else {
      return (
        <div>
          <span>&nbsp;</span>
          <span>&nbsp;</span>
        </div>
      );
    }
  }

  /**
   * Get the previous call display
   *
   * @return  {JSX}  html element
   */
  get previousCallDisplay() {
    const previousCall = this.previousBall;
    if (previousCall) {
      let numbers = ["0"];
      if (Object.prototype.hasOwnProperty.call(previousCall, "number")) {
        numbers = previousCall.number.toString().split("");
      }
      if (numbers.length === 1) {
        return (
          <div>
            <span>&nbsp;</span>
            <span>{numbers[0]}</span>
          </div>
        );
      } else {
        return numbers.map((number, index) => (
          <span key={"call" + number + index}>{number}</span>
        ));
      }
    } else {
      return (
        <div>
          <span>&nbsp;</span>
          <span>&nbsp;</span>
        </div>
      );
    }
  }

  /**
   * Reset confirmation modal display
   *
   * @return  {[JSX]}  Return modal or empty div
   */
  get resetConfirmationModalDisplay() {
    if (this.state.showResetModal === true) {
      return (
        <div>
          <div className="modal">
            <h4>Reset Game</h4>
            <p>Are you sure you want to reset the game?</p>
            <p className="red-text">
              This action <strong>cannot</strong> be undone.
            </p>
            <p>
              <button onClick={this.toggleResetModal}>Cancel</button>
              <button
                className="primaryBtn"
                onClick={this.confirmResetGame}>
                Confirm
              </button>
            </p>
          </div>
          <div
            className="modal-backdrop"
            onClick={(e) => {
              e.preventDefault();
            }}></div>
        </div>
      );
    } else {
      return null;
    }
  }

  /* ------------------- Display Board Only Mode */
  manualCall = (ball) => {
    let board = this.state.board;
    let currentBall = null;
    let previousBall = this.currentBall;
    let totalBallsCalled = this.totalBallsCalled;
    let previousCallList = [...this.state.previousCallList];
    Object.keys(board).forEach((letter) => {
      board[letter].forEach((number) => {
        number.active = false;
        if (ball.number === number.number) {
          if (number.called) {
            number.called = false;
            totalBallsCalled--;
            previousCallList = previousCallList.map((previousBall) => {
              return previousBall !== ball;
            });
            previousBall = previousCallList[previousCallList.length - 1];
          } else {
            previousCallList.push(number);
            number.called = true;
            number.active = true;
            totalBallsCalled++;
            currentBall = number;
          }
        }
        return number;
      });
      return letter;
    });
    this.totalBallsCalled = totalBallsCalled;
    this.previousBall = previousBall;
    this.currentBall = currentBall;
    this.setState({ board: board, previousCallList });
  };

  /**
   * Sends an email that contains game
   * settings and device info to help with
   * replicating user issues
   */
  handleBugReport = () => {
    let subject = "Let's Play Bingo bug report";
    let body = `Thank you for playing let's play bingo and for taking the time to report a bug! Please describe what is happening to you so I may fix it ASAP.`;
    body += `%0D%0A%0D%0A%0D%0A -------------------------------- PLEASE LEAVE EVERYTHING BELOW THIS LINE IN TACT --------------------------------`;
    body += `%0D%0A%0D%0A The data below includes information about your device and your game settings. This information will help me replicate your issue so I can fix it.`;
    body += `%0D%0A%0D%0A----- Browser/Device Info ------ %0D%0A`;
    const { userAgent } = navigator;
    body += JSON.stringify(userAgent);
    body += `%0D%0A%0D%0A----- Game State ------ %0D%0A`;
    let gameData = this.state;
    body += JSON.stringify(gameData);
    window.open(
      `mailto:hello@letsplaybingo.io?subject=${subject}&body=${body}`
    );
  };

  /* ------------------- Render */
  render() {
    return (
      <div className="dark-bg light-links">
        {/* ------ Settings Panel ------ */}
        <Settings
          gameSettings={this.state}
          settingsUpdate={this.handleSettingsUpdate}
          settingsPanelOpen={this.state.settingsPanelOpen}
          settingsPanelControl={this.handleSettingsPanel}></Settings>

        {/* ----------- Bingo Board ------------- */}
        <section className="board-block">
          <div className="container row no-wrap align-stretch">
            {/* ------ Board ------- */}
            <div className="col pattern-side shrink padding-xlg">
              {/* -------- Digital Displays --------- */}
              <div className="row no-wrap margin-bottom-lg justify-space-between white-text">
                <div className="col text-center margin-sm">
                  <div className="callNumber notranslate">
                    {this.numberDisplay}
                  </div>
                  <div className="callNumber-text uppercase">Total Calls</div>
                </div>
                <div className="col text-center margin-sm">
                  <div className="callNumber notranslate">
                    {this.previousCallDisplay}
                  </div>
                  <div className="callNumber-text uppercase">Previous Call</div>
                </div>
              </div>

              {/* -------- Pattern --------- */}
              <Pattern
                pattern={this.state.selectedPattern}
                update={this.handleUpdatePattern}
              />
              <div className="padding-vertical-lg">
                <Select
                  className="pattern-select"
                  placeholder="Choose Pattern"
                  value={this.state.selectedPattern}
                  onChange={(e) => {
                    this.setState({ selectedPattern: e });
                  }}
                  options={presetPatterns}
                />
              </div>
            </div>
            <div className="col board-side">
              <BingoBoard
                board={this.state.board}
                manualMode={this.state.manualMode}
                manualCall={this.manualCall}
              />
            </div>
          </div>
        </section>

        {/* ----------- BOTTOM SECTION ------------- */}
        <section className="game-controls dark-bg">
          <div className="container row justify-start align-start">
            {/* ----------- Current Ball Display ------------- */}
            <div className="col min-size-250 padding-vertical-xxlg padding-horizontal-md notranslate">
              {this.currentBallDisplay}

              <CallHistory
                calledBalls={this.state.previousCallList}></CallHistory>

              <div
                data-visibility={this.state.wildBingo ? "show" : "hide"}
                className="white-text text-center margin-top-lg">
                <strong>Wild Ball: </strong> {this.state.wildBall}
              </div>
            </div>

            {/* ----------- Gameplay Controls ------------- */}
            <div className="col shrink padding-vertical-xxlg padding-horizontal-md">
              <section className="gameplay-controls">
                <div data-disabled={this.totalBallsCalled >= 75}>
                  <button
                    data-disabled={this.state.manualMode}
                    onClick={
                      this.totalBallsCalled === 0
                        ? this.startNewGame
                        : this.callBingoNumber
                    }
                    disabled={this.state.running}>
                    {this.totalBallsCalled === 0
                      ? "Start New Game"
                      : "Call Next Number"}
                  </button>

                  <button
                    data-disabled={this.state.manualMode}
                    data-newgame={this.totalBallsCalled === 0}
                    onClick={
                      this.totalBallsCalled === 0
                        ? this.startNewAutoplayGame
                        : this.toggleGame
                    }>
                    {this.state.running ? "Pause Autoplay" : "Start Autoplay"}
                  </button>
                </div>

                <button
                  onClick={this.toggleResetModal}
                  disabled={this.state.running || this.totalBallsCalled === 0}>
                  Reset Board
                </button>

                <button
                  onClick={this.shuffleBalls}
                  disabled={this.state.running || this.totalBallsCalled > 0}>
                  Shuffle Board
                </button>
              </section>
              {this.resetConfirmationModalDisplay}
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default BingoGame;
