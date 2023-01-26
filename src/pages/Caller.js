import React from "react";
import Settings from "../components/Settings";
// Helper Functions
import {
  dispatchCustomEvent,
  getLanguageLabel,
  generateBingoBoard,
  getDefaultSettings,
  getRandomNumberInRange,
  toggleFullScreen,
} from "../helpers/Utilities";
import {
  getCache,
  updateCache,
  updateCacheValue,
} from "../helpers/CacheManagement";
import { getPatternInfo } from "../helpers/PresetPatterns";
// Layouts
import ClassicReversed from "../layouts/ClassicReversed";
import Classic from "../layouts/Classic";
import Stacked from "../layouts/Stacked";
import Vertical from "../layouts/Vertical";

class Caller extends React.Component {
  // Constructor ----------------------------------------
  constructor(props) {
    super(props);
    this.mainCallerList = [];
    let cache = getCache();
    if (cache) {
      if (cache.settings.fullscreen) {
        cache.settings.fullscreen = false;
        updateCacheValue("settings", cache.settings);
      }
      this.state = cache;
    } else {
      this.state = {
        board: generateBingoBoard(),
        called: [],
        currentCall: null,
        interval: null,
        layout: "classic",
        previousCall: null,
        settings: getDefaultSettings(),
        speech: {},
      };
      updateCache(this.state); // Set the cache for the initial time
    }
  }

  // Lifecycle Hooks ----------------------------------------

  componentDidUpdate() {
    // anytime the component updates, lets save the cache
    updateCache(this.state);
  }

  componentDidMount() {
    document.title = "Let's Play Bingo! | The #1 free bingo caller application";
    this.initializeSpeech();
    document.addEventListener("game-control", this.handleGameControl);
    document.addEventListener("mark-number", this.handleManualCall);
    document.addEventListener("pause-game", this.handleGameControl);
    document.addEventListener("settingssaved", this.handleSettingsSaved);
    document.addEventListener("test-speech", this.handleSpeech);
    document.addEventListener("fullscreenchange", this.handleFullscreenChange);
  }

  componentWillUnmount() {
    document.removeEventListener("game-control", this.handleGameControl);
    document.removeEventListener("mark-number", this.handleManualCall);
    document.removeEventListener("pause-game", this.handleGameControl);
    document.removeEventListener("settingssaved", this.handleSettingsSaved);
    document.removeEventListener("test-speech", this.handleSpeech);
    document.removeEventListener(
      "fullscreenchange",
      this.handleFullscreenChange
    );
  }

  // Speech Synthesis ----------------------------------------

  initializeSpeech = () => {
    const this2 = this;
    let speechSettings = {
      callers: [],
    };
    speechSettings.supported = Object.prototype.hasOwnProperty.call(
      window,
      "speechSynthesis"
    );

    let synth = window.speechSynthesis;
    if (speechSettings.supported) {
      synth.onvoiceschanged = handleLoadVoices;
      speechSettings.callers = synth.getVoices();
    }

    function handleLoadVoices() {
      let voices = synth.getVoices();
      window.setTimeout(() => {
        this2.mainCallerList = [...voices];
        let callerOptions = [];
        voices.forEach((voice) => {
          let voiceObj = {};
          voiceObj.label = voice.name + " / " + getLanguageLabel(voice.lang);
          voiceObj.value = voice.name;
          voiceObj.voice = voice;
          callerOptions.push(voiceObj);
        });
        speechSettings.callers = callerOptions;
        dispatchCustomEvent("loadcallers", callerOptions);
      });
    }
    this.setState(speechSettings);
  };

  handleSpeech = (event) => {
    if (!Object.prototype.hasOwnProperty.call(event.detail, "voice")) {
      event.detail.voice = this.state.settings.caller;
    }
    this.speak(event.detail.message, event.detail.voice);
  };

  speak = (message, voice) => {
    if (!voice) {
      voice = this.state.settings.caller;
    }
    let synth = window.speechSynthesis;
    let msg = new SpeechSynthesisUtterance();
    msg.text = message;
    msg.volume = 1;
    if (typeof voice === "string") {
      this.mainCallerList.forEach((caller) => {
        if (caller.name === voice) {
          msg.voice = caller;
        }
      });
    } else {
      msg.voice = voice;
    }
    if (synth.speaking) {
      synth.cancel();
    }
    synth.speak(msg);
  };

  // Handlers --------------------------------------------------------

  handleAudibleCall = (call) => {
    const numString = call.number.toString();
    // call the new ball, first call it all together, then call each character individually
    let ballString = `${call.letter}, ${numString}`;
    if (this.state.settings.doubleCall) {
      ballString += `, ${call.letter} ,`;
      if (numString.length === 2) {
        ballString += `${numString.charAt(0)}, ${numString.charAt(1)}`;
      } else {
        ballString += call.number;
      }
    }
    this.handleSpeech({
      detail: {
        message: ballString,
      },
    });
  };

  /**
   * Handles calling a new random number
   */
  handleCall = () => {
    const called = this.state.called;
    const pattern = this.state.settings.pattern;
    try {
      // Get the new call.
      const randomBall = getRandomNumberInRange(1, 75, called);
      let board = { ...this.state.board };
      let newCall = {};
      // Traverse through the board object to find the selected number
      Object.keys(board).forEach((row) => {
        Object.values(board[row]).forEach((number, index) => {
          // Normal Bingo Start ------------------
          if (number.number === randomBall) {
            board[row][index].called = true;
            board[row][index].active = true;
            newCall = board[row][index];
            called.push(newCall);
            if (
              this.state.settings.skipUnusedNumbers === true &&
              pattern.unusedLetters.length > 0 &&
              pattern.unusedLetters.includes(number.letter)
            ) {
              // Call again
              window.setTimeout(() => {
                this.handleCall();
              }, 0);
            } else {
              // since we don't have to call again, handle any audibles
              // If audibleChime AND audibleCaller are enabled,
              // use a timeout to delay the audible call until after the chime plays.
              if (this.state.settings.audibleChime) {
                let chime = new Audio(this.state.settings.chime);
                chime.play();
                if (this.state.settings.audibleCaller) {
                  window.setTimeout(() => {
                    this.handleAudibleCall(newCall);
                  }, 700);
                }
              } else {
                if (this.state.settings.audibleCaller) {
                  this.handleAudibleCall(newCall);
                }
              }
            }
          } else {
            if (number.active) {
              board[row][index].active = false;
            }
          }
        });
      });

      // Update the state with the new info
      this.setState({
        board: board,
        called: called,
        previousCall: this.state.currentCall,
        currentCall: newCall,
      });
    } catch (error) {
      if (error.message === "max has been reached") {
        if (
          this.state.settings.chattyCaller &&
          this.state.settings.audibleCaller
        ) {
          this.handleSpeech({
            detail: {
              message: "Bingo!",
            },
          });
        }
      }
    }
  };

  handleFullscreenChange = (event) => {
    if (document.fullscreenElement === null) {
      let settings = { ...this.state.settings };
      settings.fullscreen = false;
      this.setState({ settings: settings });
    }
  };

  handleGameControl = (event) => {
    const type = event.detail;
    switch (type) {
      case "new-game":
        this.handleStartGame();
        break;
      case "reset-game":
        this.handleResetGame();
        break;
      case "call-number":
        this.handleCall();
        break;
      case "pause-game":
        clearInterval(this.state.interval);
        this.setState({ interval: null });
        break;
      case "resume-game":
        if (
          this.state.settings.automaticCalling === true &&
          this.state.interval === null
        ) {
          this.handleCall();
          this.handleSetInterval(this.state.settings.delay);
        }
        break;
      default:
        break;
    }
  };

  handleManualCall = (event) => {
    let board = { ...this.state.board };
    const called = this.state.called;
    const manualCall = event.detail;
    let currentCall = this.state.currentCall;
    let previousCall = this.state.previousCall;

    const calledIndex = Array.prototype.findIndex.call(
      called,
      (x) => x.number === manualCall.number
    );
    const previouslyCalled = calledIndex > -1;
    if (previouslyCalled) {
      // The selected call has already been called.
      called.splice(calledIndex, 1);
      currentCall = called[called.length - 1];
      previousCall = called[called.length - 2]; // set previous call to the last one
    } else {
      called.push(manualCall);
      // This is a new call.
      previousCall = currentCall;
      currentCall = manualCall;
    }
    if (previousCall === undefined) {
      previousCall = null;
    }
    if (currentCall === undefined || called.length === 0) {
      currentCall = null;
    }

    // Traverse through the board object to find the selected number
    Object.keys(board).forEach((row) => {
      Object.values(board[row]).forEach((number, index) => {
        if (previouslyCalled && number.number === manualCall.number) {
          board[row][index].called = false;
          board[row][index].active = false;
        } else if (number.number === currentCall?.number) {
          board[row][index].called = true;
          board[row][index].active = true;
        } else if (number.number === previousCall?.number) {
          board[row][index].called = true;
          board[row][index].active = false;
        } else {
          board[row][index].active = false;
        }

        if (!previouslyCalled && number.number === manualCall.number) {
          // If audibleChime AND audibleCaller are enabled,
          // use a timeout to delay the audible call until after the chime plays.
          if (this.state.settings.audibleChime) {
            let chime = new Audio(this.state.settings.chime);
            chime.play();
            if (this.state.settings.audibleCaller) {
              window.setTimeout(() => {
                this.handleAudibleCall(currentCall);
              }, 700);
            }
          } else {
            if (this.state.settings.audibleCaller) {
              this.handleAudibleCall(currentCall);
            }
          }
        }
      });
    });
    this.setState({
      board: board,
      called: called,
      previousCall: previousCall,
      currentCall: currentCall,
    });
  };

  handleResetGame = () => {
    if (this.state.interval !== null) {
      clearInterval(this.state.interval);
    }
    this.setState({
      board: { ...generateBingoBoard() },
      currentCall: null,
      interval: null,
      previousCall: null,
      called: [],
    });
  };

  handleSetInterval = (delay = 30) => {
    window.clearInterval(this.state.interval);
    let interval = window.setInterval(() => {
      this.handleCall();
    }, delay * 1000);
    this.setState({ interval: interval });
  };

  handleSettingsSaved = (event) => {
    const settings = { ...event.detail };
    // Set up new state
    let newState = { settings: settings };
    // determine if automatic calling was toggled
    // if so, we need to clear out the interval
    if (settings.automaticCalling !== this.state.settings.automaticCalling) {
      if (settings.automaticCalling === false) {
        window.clearInterval(this.state.interval);
        newState.interval = null;
      }
    }
    // if layout has changed, add it to the top level changes
    if (settings.layout !== this.state.layout) {
      newState.layout = settings.layout;
    }
    // if pattern changed
    if (typeof settings.pattern === "string") {
      newState.settings.pattern = getPatternInfo(settings.pattern);
    }
    // if fullscreen changed
    if (newState.fullscreen !== this.state.settings.fullscreen) {
      toggleFullScreen(settings.fullscreen);
    }
    // Set new state
    this.setState(newState);
  };

  handleStartGame = () => {
    if (this.chattyCallerSelected) {
      this.handleSpeech({
        detail: {
          message: this.state.settings.wildBingo
            ? "Let's Play Wild Bingo!"
            : "Let's Play Bingo!",
        },
      });
      window.setTimeout(() => {
        this.state.settings.wildBingo
          ? this.handleWildBingoSetup()
          : this.handleCall();
        this.handleSetInterval(this.state.settings.delay);
      }, 1500);
    } else {
      if (this.state.settings.wildBingo) {
        this.handleWildBingoSetup();
      } else {
        this.handleCall();
        if (this.state.settings.automaticCalling) {
          this.handleSetInterval(this.state.settings.delay);
        }
      }
    }
  };

  handleWildBingoSetup() {
    // set up wild bingo
    const called = this.state.called;
    let board = { ...this.state.board };
    let lastWildCall;
    let wildBalls = [];

    if (this.state.settings.wildBingoEvens) {
      Object.keys(board).forEach((letter, boardIndex) => {
        Object.values(board[letter]).forEach((ball, letterIndex) => {
          if (
            boardIndex === Object.keys(board).length - 1 &&
            board[letter].length - 2 === letterIndex
          ) {
            ball.active = true;
            lastWildCall = ball;
            wildBalls.push(ball);
          }
          if (ball.number % 2 !== 1) {
            ball.called = true;
            called.push(ball);
          }
        });
      });
    } else if (this.state.settings.wildBingoOdds) {
      Object.keys(board).forEach((letter, boardIndex) => {
        Object.values(board[letter]).forEach((ball, letterIndex) => {
          if (
            boardIndex === Object.keys(board).length - 1 &&
            board[letter].length - 1 === letterIndex
          ) {
            ball.active = true;
            lastWildCall = ball;
            wildBalls.push(ball);
          }
          if (ball.number % 2 === 1) {
            ball.called = true;
            called.push(ball);
          }
        });
      });
    } else {
      console.log(this.state.settings);
      const randomBall =
        this.state.settings.wildBingoCustom === true &&
        this.state.settings.wildBingoCustomValue !== null
          ? this.state.settings.wildBingoCustomValue
          : getRandomNumberInRange(1, 75, called);
      console.log("randomBall", randomBall);
      const wildNumber = randomBall.toString().slice(-1);
      Object.keys(board).forEach((letter) => {
        Object.values(board[letter]).forEach((ball, index) => {
          if (ball.number.toString().endsWith(wildNumber)) {
            ball.called = true;
            called.push(ball);
            lastWildCall = ball;
          }
          if (ball.number === randomBall) {
            wildBalls.push(ball);
            if (!this.state.settings.wildBingoDouble) {
              ball.active = true;
            }
          }
        });
      });
    }

    // Double Wild - add another wild ball.
    if (this.state.settings.wildBingoDouble) {
      const randomBall2 = getRandomNumberInRange(1, 75, called);
      const wildNumber2 = randomBall2.toString().slice(-1);
      Object.keys(board).forEach((letter) => {
        Object.values(board[letter]).forEach((ball, index) => {
          if (ball.number.toString().endsWith(wildNumber2)) {
            ball.called = true;
            called.push(ball);
            lastWildCall = ball;
          }
          if (ball.number === randomBall2) {
            wildBalls.push(ball);
            ball.active = true;
          }
        });
      });
    }

    // Loop once more to mark the
    this.setState({
      board,
      called,
      previousCall: lastWildCall,
      currentCall: wildBalls[0],
      wildBalls: wildBalls,
    });
  }

  // Getters ---------------------------------------------

  get calledBallCount() {
    let unusedLetters = [];
    if (this.state.settings.pattern?.unusedLetters) {
      unusedLetters = this.state.settings.pattern.unusedLetters;
    }
    const skipUnusedNumbers = this.state.settings.skipUnusedNumbers;
    let count = 0;
    Object.keys(this.state.board).forEach((letter) => {
      if (
        !skipUnusedNumbers ||
        (skipUnusedNumbers && !unusedLetters.includes(letter))
      ) {
        this.state.board[letter].forEach((ball) => {
          if (ball.called) {
            count++;
          }
        });
      }
    });
    return count;
  }

  get chattyCallerSelected() {
    return (
      this.state.settings.audibleCaller && this.state.settings.chattyCaller
    );
  }

  get isGameRunning() {
    return this.state.interval !== null;
  }

  getLayout = () => {
    switch (this.state.layout) {
      case "vertical":
        return (
          <Vertical
            board={this.state.board}
            called={this.state.called}
            currentCall={this.state.currentCall}
            layout={this.state.settings.layout}
            previousCall={this.state.previousCall}
            running={this.isGameRunning}
            settings={this.state.settings}
            totalCalls={this.calledBallCount}
          />
        );
      case "stacked":
        return (
          <Stacked
            board={this.state.board}
            called={this.state.called}
            currentCall={this.state.currentCall}
            layout={this.state.settings.layout}
            previousCall={this.state.previousCall}
            running={this.isGameRunning}
            settings={this.state.settings}
            totalCalls={this.calledBallCount}
          />
        );
      case "classic-reverse":
        return (
          <ClassicReversed
            board={this.state.board}
            called={this.state.called}
            currentCall={this.state.currentCall}
            layout={this.state.settings.layout}
            previousCall={this.state.previousCall}
            running={this.isGameRunning}
            settings={this.state.settings}
            totalCalls={this.calledBallCount}
          />
        );
      case "classic":
      default:
        return (
          <Classic
            board={this.state.board}
            called={this.state.called}
            currentCall={this.state.currentCall}
            layout={this.state.settings.layout}
            previousCall={this.state.previousCall}
            running={this.isGameRunning}
            settings={this.state.settings}
            totalCalls={this.calledBallCount}
          />
        );
    }
  };

  // Renderer --------------------------------------------

  render() {
    return (
      <div className="caller-block">
        <Settings
          totalCalls={this.calledBallCount}
          settings={this.state.settings}
        />
        {this.getLayout()}
      </div>
    );
  }
}

export default Caller;
