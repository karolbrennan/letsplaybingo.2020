/*
 * Let's Play Bingo
 * Version 3.0
 * App written by Karol Brennan
 * https://karol.dev
 * http://github.com/karolbrennan
 */
// Dependencies
import React, { Component } from "react";
import Slider from "rc-slider";
import Select from "react-select";

// Custom Components
import BingoBoard from "./subcomponents/BingoBoard.js";
import Pattern from "./subcomponents/Pattern.js";
import CallHistory from "./subcomponents/CallHistory.js";

// Utilities
import { generateBingoBoard, getRandomBingoNumber, getPresetPatterns, getBallDisplay, getLogoBallDisplay, getLanguageText } from "../utils.js";

// Chimes
import {
	chime1,
	chime2,
	chime3,
	chime4,
	chime5,
	chime6,
	chime7,
	chime8,
	chime9,
	chime10,
	chime11,
	chime12,
	pop1,
	pop2,
	pop3,
	pop4,
	shuffle,
} from "../chimes";
class BingoGame extends Component {
	constructor(props) {
		super(props);
		// -------------------------- Set properties ----- //
		// Balls display pieces
		this.totalBallsCalled = 0;
		this.previousBall = null;
		this.currentBall = null;
		this.interval = null;
		this.chimes = [
			{ label: "Chime 1", value: chime1 },
			{ label: "Chime 2", value: chime2 },
			{ label: "Chime 3", value: chime3 },
			{ label: "Chime 4", value: chime4 },
			{ label: "Chime 5", value: chime5 },
			{ label: "Chime 6", value: chime6 },
			{ label: "Chime 7", value: chime7 },
			{ label: "Chime 8", value: chime8 },
			{ label: "Chime 9", value: chime9 },
			{ label: "Chime 10", value: chime10 },
			{ label: "Chime 11", value: chime11 },
			{ label: "Chime 12", value: chime12 },
			{ label: "Pop 1", value: pop1 },
			{ label: "Pop 2", value: pop2 },
			{ label: "Pop 3", value: pop3 },
			{ label: "Pop 4", value: pop4 },
		];
		this.shuffleSound = shuffle;

		// Patterns
		this.patternPlaceholder = "Choose a pattern";
		this.presets = getPresetPatterns();

		// Speech Synthesis
		this.speechEnabled = Object.prototype.hasOwnProperty.call(window, "speechSynthesis");

		// if speech is enabled, initialize other speech properties
		if (this.speechEnabled === true) {
			this.synth = window.speechSynthesis;
			this.synth.onvoiceschanged = this.loadVoices;
			this.voices = this.synth.getVoices();
		} else {
			this.synth = null;
			this.voices = [];
		}

		let gameData = JSON.parse(localStorage.getItem("lpb-gameData"));
		let gameState = JSON.parse(localStorage.getItem("lpb-gameState"));

		if (gameData && gameState) {
			for (let key in gameData) {
				this[key] = gameData[key];
			}
			this.state = gameState;
		} else {
			// Set initial state
			this.state = this.getInitialStateData();
		}
	}

	getInitialStateData() {
		return {
			board: generateBingoBoard(),
			previousCallList: [],
			displayBoardOnly: false,
			delay: 6000,
			running: false,
			enableCaller: false,
			skipUnused: true,
			wildBingo: false,
			evensOdds: false,
			doubleCall: false,
			extraTalk: true,
			chime: false,
			selectedChime: this.chimes[0],
			selectedCaller: null,
			selectedPattern: {
				value: this.patternPlaceholder,
				label: this.patternPlaceholder,
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
		this.loadVoices();
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
		let gameData = {
			totalBallsCalled: this.totalBallsCalled,
			previousBall: this.previousBall,
			currentBall: this.currentBall,
			interval: this.interval,
		};
		localStorage.setItem("lpb-gameData", JSON.stringify(gameData));
		localStorage.setItem("lpb-gameState", JSON.stringify(this.state));
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
	 *  Load Voices Function
	 *  Will load voices as they change within the browser
	 */
	loadVoices = () => {
		this.voices = this.synth.getVoices();
		if (this.voices.length > 0) {
			let selectedCaller = this.state.selectedCaller;
			if (!selectedCaller) {
				// if the selected caller is STILL null, set to the first voice available.
				// this is a one off that really would only happen if the user's browser
				// has a language that doesn't have a caller available for it.
				selectedCaller = this.voices[0];
			}
			let userLanguage = window.navigator.userLanguage || window.navigator.language;
			// loop through voices and either choose the one that matches the selection or choose the first one that matches user's language
			this.voices.forEach((voice) => {
				if (Object.prototype.hasOwnProperty.call(selectedCaller, "value")) {
					if (voice.name === selectedCaller.value) {
						this.setState({ selectedCaller: voice });
					}
				} else {
					if (voice.lang === userLanguage) {
						selectedCaller = voice;
					}
				}
			});
			this.setState({ selectedCaller: selectedCaller });
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
			if (Object.prototype.hasOwnProperty.call(this.state, "selectedCaller")) {
				this.voices.forEach((caller) => {
					if (caller.value === this.state.selectedCaller.value) {
						msg.voice = caller;
					}
				});
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
				ballstring.length === 2 ? [ballstring.charAt(0), " ", ballstring.charAt(1)] : ball.number,
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
		if (this.state.extraTalk) {
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
						` mark every ${ball.number % 2 === 1 ? "odd number" : "even number"}`,
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
					ballstring.length === 2 ? [ballstring.charAt(0), " ", ballstring.charAt(1)] : ball.number,
				]);
			} else {
				this.say([ball.letter, " ", ball.number]);
			}
		}
	};

	/* ------------------- Gameplay Functions */

	startNewGame = () => {
		// Obtain all randomized balls
		let byteArray = new Uint8Array(1);
		let randomVals = [];

		while (randomVals.length < 75) {
			let randomVal = window.crypto.getRandomValues(byteArray)[0];
			if (randomVal > 0 && randomVal <= 75 && !randomVals.includes(randomVal)) {
				randomVals.push(randomVal);
			}
		}

		// Start with the Let's Play Bingo call out
		// (the .say method will not run if caller is not enabled)
		if (this.state.wildBingo) {
			if (this.state.enableCaller && this.state.extraTalk) {
				this.say("Let's Play Wild Bingo!");
				window.setTimeout(() => {
					this.startWildBingo();
				}, 2000);
			} else {
				this.startWildBingo();
			}
		} else {
			if (this.state.enableCaller) {
				if (this.state.extraTalk) {
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
				if (this.state.extraTalk) {
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
		let randomBingoNumber = getRandomBingoNumber();
		let wildNumber = randomBingoNumber.toString().slice(-1);
		let odd = wildNumber % 2 === 1;
		let wildBall = null;
		let lastBall = null;
		let board = this.state.board;
		let totalBallsCalled = this.totalBallsCalled;
		let previousCallList = this.state.previousCallList.length > 0 ? [...this.state.previousCallList] : [];

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
					} else if (!this.state.evensOdds && number.number.toString().slice(-1) === wildNumber) {
						lastBall = number;
						number.called = true;
						totalBallsCalled++;
						previousCallList.push(number);
					} else if (this.state.evensOdds && (number.number % 2 === 1) === odd) {
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
		this.setState({ board: generateBingoBoard(), wildBall: null, running: false, showResetModal: false, previousCallList: [] });
	};

	callBingoNumber = () => {
		let totalBallsCalled = this.totalBallsCalled;
		let selectedPattern = this.state.selectedPattern;
		let totalPossibleBalls = 75;
		if (this.state.skipUnused === true && selectedPattern.value !== this.patternPlaceholder) {
			totalPossibleBalls = 75 - selectedPattern.unusedLetters.length * 15;
		}
		if (totalBallsCalled < totalPossibleBalls) {
			let board = this.state.board;
			let currentBall = null;
			let previousBall = this.currentBall;
			let randomBingoNumber = getRandomBingoNumber();
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
							// set to called and add to previously called numbers
							number.called = true;
							previousCallList.push(number);

							currentBall = number;
							// if we are skipping unused numbers, a pattern has been selected, and this letter is not in use, we want to call a new number when
							// we are done here.
							if (
								this.state.skipUnused &&
								selectedPattern.value !== this.patternPlaceholder &&
								selectedPattern.unusedLetters.indexOf(letter) >= 0
							) {
								callAgain = true;
							} else {
								// increment the total balls called.
								totalBallsCalled++;
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
			this.totalBallsCalled = totalPossibleBalls;
			this.say("Someone better have a bingo because we have run out of balls to call!");
			this.previousBall = this.currentBall;
			this.currentBall = null;
			this.setState({ running: false });
		}
	};

	shuffleBalls = () => {
		let balls = generateBingoBoard();
		let letters = ["B", "I", "N", "G", "O"];
		let sound = new Audio(this.shuffleSound);
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
						balls[randomLetter][randomNumber].active = !balls[randomLetter][randomNumber].active;
						balls[randomLetter][randomNumber].called = !balls[randomLetter][randomNumber].called;
					}
					return ball;
				});
			});
		}
	};

	/* ------------------ Handlers */
	handleDelayChange = (e) => {
		if (this.state.running === true) {
			clearInterval(this.interval);
			this.interval = setInterval(this.callBingoNumber, e);
		}
		this.setState({ delay: e });
	};

	handleCheckbox = (e) => {
		let gamemode = e.currentTarget.dataset.gamemode;
		switch (gamemode) {
			case "skip-unused":
				this.setState({ skipUnused: e.currentTarget.checked });
				break;
			case "enable-doublecall":
				this.setState({ doubleCall: e.currentTarget.checked });
				break;
			case "enable-extratalk":
				this.setState({ extraTalk: e.currentTarget.checked });
				break;
			case "wild-bingo":
				this.setState({ wildBingo: e.currentTarget.checked });
				break;
			case "evens-odds":
				this.setState({ evensOdds: e.currentTarget.checked });
				break;
			case "enable-caller":
				if (this.synth.speaking) {
					this.cancelSpeech();
				}
				this.setState({ enableCaller: e.currentTarget.checked });
				break;
			case "display-board":
				if (e.currentTarget.checked && this.state.running) {
					clearInterval(this.interval);
				}
				this.setState({ displayBoardOnly: e.currentTarget.checked, running: false });
				break;
			case "enable-chime":
				this.setState({ chime: e.currentTarget.checked });
				break;
			default:
				break;
		}
	};

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
				if (markedSpaces.length === 0 || (markedSpaces.length === 1 && markedSpaces[0] === 2)) {
					unusedLetters.push(letter);
				}
			} else {
				if (pattern[letter].indexOf(true) < 0) {
					unusedLetters.push(letter);
				}
			}
			return letter;
		});
		let customPattern = { value: "Custom", label: "Custom", unusedLetters: unusedLetters, pattern: pattern };
		this.setState({ selectedPattern: customPattern });
	};

	/* ------------------- JSX Display Functions */

	/**
	 * Returns a JSX element to display the current ball
	 *
	 * @return  {JSX}  JSX Element
	 */
	get currentBallDisplay() {
		return this.currentBall !== null ? getBallDisplay(this.currentBall) : getLogoBallDisplay();
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
			return numbers.map((number, index) => <span key={"numDisplay" + number + index}>{number}</span>);
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
				return numbers.map((number, index) => <span key={"call" + number + index}>{number}</span>);
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
				return numbers.map((number, index) => <span key={"call" + number + index}>{number}</span>);
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
							<button className="primaryBtn" onClick={this.confirmResetGame}>
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

	/* ------------------- Speech Synthesis */

	/**
	 * Returns the options for the voice selection menu
	 *
	 * @return  {Array}  Options array
	 */
	get voiceOptions() {
		let voiceOptions = [];
		if (this.speechEnabled === true) {
			this.voices.forEach((voice) => {
				let voiceObj = voice;
				voiceObj.value = voice.name;
				voiceObj.label = voice.name + " / " + getLanguageText(voice.lang);
				voiceOptions.push(voiceObj);
			});
		}
		return voiceOptions;
	}

	/*
	 *  Choose Caller Function
	 *  This sets the selected caller
	 */
	handleChooseCaller = (e) => {
		this.setState({ selectedCaller: e });
	};

	/**
	 * Choose Chime Function
	 * Sets the selected chime audible
	 *
	 * @param   {event}  e  Event
	 */
	handleChooseChime = (e) => {
		let chime = new Audio(e.value);
		chime.play();
		this.setState({ selectedChime: e });
	};

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
		window.open(`mailto:hello@letsplaybingo.io?subject=${subject}&body=${body}`);
	};

	/* ------------------- Render */
	render() {
		return (
			<div className="dark-bg light-links">
				{/* ----------- Bingo Board ------------- */}
				<section className="board-block">
					<div className="container row no-wrap align-stretch">
						{/* ------ Board ------- */}
						<div className="col pattern-side shrink padding-xlg">
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
									onChange={(e) => {
										this.setState({ selectedPattern: e });
									}}
									options={this.presets}
								/>
							</div>
						</div>
						<div className="col board-side">
							<BingoBoard board={this.state.board} manualMode={this.state.displayBoardOnly} manualCall={this.manualCall} />
						</div>
					</div>
				</section>

				{/* ----------- BOTTOM SECTION ------------- */}
				<section className="game-controls dark-bg">
					<div className="container row justify-start align-start">
						{/* ----------- Current Ball Display ------------- */}
						<div className="col min-size-250 padding-vertical-xxlg padding-horizontal-md notranslate">
							{this.currentBallDisplay}

							<CallHistory calledBalls={this.state.previousCallList}></CallHistory>

							<div data-visibility={this.state.wildBingo ? "show" : "hide"} className="white-text text-center margin-top-lg">
								<strong>Wild Ball: </strong> {this.state.wildBall}
							</div>
						</div>

						{/* ----------- Gameplay Controls ------------- */}
						<div className="col shrink padding-vertical-xxlg padding-horizontal-md">
							<section className="gameplay-controls">
								<div data-disabled={this.totalBallsCalled >= 75}>
									<button
										data-disabled={this.state.displayBoardOnly}
										onClick={this.totalBallsCalled === 0 ? this.startNewGame : this.callBingoNumber}
										disabled={this.state.running}>
										{this.totalBallsCalled === 0 ? "Start New Game" : "Call Next Number"}
									</button>

									<button
										data-disabled={this.state.displayBoardOnly}
										data-newgame={this.totalBallsCalled === 0}
										className={this.state.running ? "pause-button" : "play-button"}
										onClick={this.totalBallsCalled === 0 ? this.startNewAutoplayGame : this.toggleGame}>
										{this.state.running ? "Pause Autoplay" : "Start Autoplay"}
									</button>
								</div>

								<button onClick={this.toggleResetModal} disabled={this.state.running || this.totalBallsCalled === 0}>
									Reset Board
								</button>

								<button onClick={this.shuffleBalls} disabled={this.state.running || this.totalBallsCalled > 0}>
									Shuffle Board
								</button>
							</section>
							{this.resetConfirmationModalDisplay}
						</div>

						{/* ----------- Game Settings ------------- */}
						<div className="col grow no-wrap padding-vertical-xxlg padding-horizontal-md white-text">
							<section className="game-settings">
								{/* ----------- Gameplay Settings ---------- */}
								<div className="row align-top justify-start">
									<div className="col shrink min-size-150 padding-horizontal-lg padding-vertical-md">
										<h6>Gameplay Settings:</h6>
									</div>
									<div className="col grow min-size-150 padding-horizontal-lg">
										<div className="row">
											<div className="col grow" data-disabled={this.totalBallsCalled > 0}>
												<label className={this.state.displayBoardOnly ? "toggle checked" : "toggle"}>
													<span className="toggle-span"></span>
													<span>Manual Calling Mode</span>
													<input
														type="checkbox"
														data-gamemode="display-board"
														onChange={this.handleCheckbox}
														checked={this.state.displayBoardOnly}></input>
												</label>
											</div>
										</div>
										<div className="row justify-start" data-visibility={this.state.displayBoardOnly === false ? "show" : "hide"}>
											<div className="col padding-right-xlg" data-disabled={this.totalBallsCalled > 0}>
												<label className={this.state.wildBingo ? "toggle checked" : "toggle"}>
													<span className="toggle-span"></span>
													<span>Wild Bingo</span>
													<input
														type="checkbox"
														data-gamemode="wild-bingo"
														onChange={this.handleCheckbox}
														checked={this.state.wildBingo}></input>
												</label>
											</div>
											<div className="col padding-right-xlg" data-disabled={!this.state.wildBingo || this.totalBallsCalled > 0}>
												<label className={this.state.evensOdds ? "toggle checked" : "toggle"}>
													<span className="toggle-span"></span>
													<span>Evens/Odds</span>
													<input
														type="checkbox"
														data-gamemode="evens-odds"
														onChange={this.handleCheckbox}
														checked={this.state.evensOdds}></input>
												</label>
											</div>
											<div className="col padding-right-xlg">
												<label className={this.state.skipUnused ? "toggle checked" : "toggle"}>
													<span className="toggle-span"></span>
													<span>Skip Unused Numbers</span>
													<input
														type="checkbox"
														data-gamemode="skip-unused"
														onChange={this.handleCheckbox}
														checked={this.state.skipUnused}></input>
												</label>
											</div>
										</div>
									</div>
								</div>

								{/* ----------- Settings when using generation ---------- */}
								<div data-visibility={this.state.displayBoardOnly === false ? "show" : "hide"}>
									{/* ----------- Autoplay Settings ---------- */}
									<div className="row no-wrap align-center justify-start">
										<div className="col shrink min-size-150 padding-horizontal-lg">
											<h6>Autoplay Speed:</h6>
										</div>
										<div className="col shrink text-center padding-vertical-lg padding-horizontal-lg">
											<div className="row no-wrap align-center slider" data-disabled={this.state.displayBoardOnly}>
												<div className="col shrink padding-right-lg white-text">Slower</div>
												<div className="col">
													<Slider
														min={3500}
														max={30000}
														step={500}
														value={this.state.delay}
														onChange={this.handleDelayChange}
														reverse={true}
													/>
												</div>
												<div className="col shrink padding-left-lg white-text">Faster</div>
											</div>
										</div>
									</div>

									{/* ----------- Caller ---------- */}
									<div className="row align-start justify-start">
										<div className="col shrink min-size-150 padding-vertical-md padding-horizontal-lg">
											<h6>Audible Caller:</h6>
										</div>
										<div className="col grow min-size-150 padding-horizontal-lg">
											{/* Disabled if manual calling mode is on */}
											<div
												className="row no-wrap justify-start"
												data-visibility={this.speechEnabled === true ? "show" : "hide"}>
												{/* Only shown if speech is enabled by the browser */}
												<div className="col shrink padding-right-xlg">
													<label className={this.state.enableCaller ? "toggle checked" : "toggle"}>
														<span className="toggle-span"></span>
														<span>Enable</span>
														<input
															type="checkbox"
															data-gamemode="enable-caller"
															onChange={this.handleCheckbox}
															checked={this.state.enableCaller}></input>
													</label>
												</div>
												<div
													className="col shrink padding-right-xlg mobile-no-horizontal-padding"
													data-visibility={this.state.enableCaller ? "show" : "hide"}>
													<label className={this.state.doubleCall ? "toggle checked" : "toggle"}>
														<span className="toggle-span"></span>
														<span>Double Call</span>
														<input
															type="checkbox"
															data-gamemode="enable-doublecall"
															onChange={this.handleCheckbox}
															checked={this.state.doubleCall}></input>
													</label>
												</div>
												<div
													className="col shrink padding-right-xlg mobile-no-horizontal-padding"
													data-visibility={this.state.enableCaller ? "show" : "hide"}>
													<label className={this.state.extraTalk ? "toggle checked" : "toggle"}>
														<span className="toggle-span"></span>
														<span>Chatty</span>
														<input
															type="checkbox"
															data-gamemode="enable-extratalk"
															onChange={this.handleCheckbox}
															checked={this.state.extraTalk}></input>
													</label>
												</div>
											</div>

											{/* Only shown if speech is DISABLED by the browser */}
											<div className="row no-wrap" data-visibility={this.speechEnabled === true ? "hide" : "show"}>
												<div className="col grow">Sorry, but your browser does not support the audible bingo caller.</div>
											</div>
										</div>
									</div>

									{/* ----------- Caller Selection ----------- */}
									<div
										className="row align-start justify-start"
										data-visibility={this.speechEnabled === true && this.state.enableCaller === true ? "show" : "hide"}>
										<div className="col shrink min-size-150 padding-vertical-md padding-horizontal-lg">
											<h6>Caller Selection:</h6>
										</div>
										<div className="col grow min-size-150 padding-horizontal-lg">
											<Select
												className="select-input"
												placeholder="Choose Caller"
												menuPlacement="auto"
												value={this.state.selectedCaller}
												onChange={this.handleChooseCaller}
												options={this.voiceOptions}
											/>
										</div>
									</div>

									{/* ----------- Chime ----------- */}
									<div className="row no-wrap align-start justify-start">
										<div className="col shrink min-size-150 padding-vertical-md padding-horizontal-lg">
											<h6>Audible Chime:</h6>
										</div>

										<div className="col grow padding-horizontal-lg">
											<label className={this.state.chime ? "toggle checked" : "toggle"}>
												<span className="toggle-span"></span>
												<span>Enable</span>
												<input
													type="checkbox"
													data-gamemode="enable-chime"
													onChange={this.handleCheckbox}
													checked={this.state.chime}></input>
											</label>
										</div>
									</div>

									{/* ----------- Chime Selection ----------- */}
									<div className="row no-wrap align-start justify-start" data-visibility={this.state.chime ? "show" : "hide"}>
										<div className="col shrink min-size-150 padding-vertical-md padding-horizontal-lg">
											<h6>Chime Selection:</h6>
										</div>

										<div className="col grow padding-horizontal-lg">
											<Select
												className="select-input"
												placeholder="Choose Chime"
												menuPlacement="auto"
												value={this.state.selectedChime}
												onChange={this.handleChooseChime}
												options={this.chimes}
											/>
										</div>
									</div>
								</div>
							</section>
						</div>

						{/* ----------- Mini Updates ------------- */}
						<div className="col grow min-size-350 padding-vertical-xxlg padding-horizontal-xxlg white-text">
							<h4 className="margin-vertical-md">Retired Edition</h4>
							<p className="wrap-text small-text">
								This edition of Let's Play Bingo has been retired. Please try the latest edition that has many improvements at{" "}
								<a href="https://letsplaybingo.io/" target="_blank" rel="noreferrer">
									Let's Play Bingo
								</a>
								!
							</p>
							<p className="wrap-text small-text">
								You can also check out these other editions:
								<br />
								<a href="https://classic.letsplaybingo.io/" target="_blank" rel="noreferrer">
									Let's Play Bingo - Classic
								</a>
								<br />
								<a href="https://90ball.letsplaybingo.io/" target="_blank" rel="noreferrer">
									Let's Play Bingo - 90 Ball
								</a>
								<br />
							</p>
						</div>
					</div>
				</section>
			</div>
		);
	}
}

export default BingoGame;
