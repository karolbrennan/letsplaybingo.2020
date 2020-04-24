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
import { generateBingoBalls, getRandomBingoNumber, getPresetPatterns, getBallDisplay, getLogoBallDisplay} from '../utils.js';

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
      // Checkbox values
      skipUnused: false,
      crazyBingo: false,
      muteCaller: true,
    }
  }


  /* ------------------- Gameplay Functions */

  startNewGame = () => {
    // If this is a crazy bingo game...
    if(this.state.crazyBingo){
      // start up a new game, but do not initialize interval.
      let boardClone = {...this.state.board};
      let currentBall = null;
      let updateState = false;
      let totalBallsCalled = this.state.totalBallsCalled;
      // get a random bingo numbers from the utils method
      let randomBingoNumber = getRandomBingoNumber();
      let crazyNumber = randomBingoNumber.toString().slice(-1);
      Object.keys(boardClone).map((letter) => {
        if(this.state.board.hasOwnProperty(letter)){
          this.state.board[letter].map((number) => {
            if(number.number === randomBingoNumber){
              currentBall = number;
              number.active = true;
            }
            if(number.number.toString().slice(-1) === crazyNumber){
              number.called = true;
              totalBallsCalled++;
            }
            return number;
          })
        }
        return letter;
      });
      updateState = true;

      if(updateState === true){
        this.setState({
          board: boardClone,
          previousBall: this.state.currentBall,
          currentBall: currentBall,
          totalBallsCalled: totalBallsCalled
        });
      }
    } else {
      // if not a crazy bingo game, toggle game as usual
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
      skipUnused: false,
      interval: null,
      presets: getPresetPatterns()
    })
  }

  updateDelay = (e) => {
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
        break;
      case 'crazy-bingo':
        this.setState({crazyBingo: e.currentTarget.checked});
        break;
      case 'mute-caller':
        this.setState({muteCaller: e.currentTarget.checked});
        break;
      default:
        break;
    }
  }


  /*
  *  Update Pattern Function
  *  As user clicks on slots for the pattern, update the pattern in the state
  */
  updatePattern = (pattern, letter, index, slot) => {
    pattern[letter][index] = !slot;
    let customPattern = {value: "Custom", label: "Custom", pattern: pattern};
    this.setState({selectedPattern: customPattern});
  };

  /*
  *  Choose Pattern Function
  *  This sets the selected pattern
  *  Sets to default if no pattern is selected or selection is cleared.
  */
  choosePattern = (e) => {
    this.setState({
      selectedPattern: e
    })
  };

  /**
   * Generates a random bingo number and updates
   * the bingo board accordingly
   */
  callBingoNumber = () => {
    let board = this.state.board;
    let currentBall = null;
    let updateState = false;
    let totalBallsCalled = this.state.totalBallsCalled;
    let selectedPattern = this.state.selectedPattern;

    // get a random bingo numbers from the utils method
    let randomBingoNumber = getRandomBingoNumber();
    if(totalBallsCalled < 75){
      // loop through the board to find the number
      Object.keys(board).map((letter) => {
        if(board.hasOwnProperty(letter)){
          board[letter].map((number) => {
            // if number is currently active, unset it.
            number.active = false;
            if(number.number === randomBingoNumber){
              if(number.called){
                // call a new number
                this.callBingoNumber();
              }
              else {
                number.called = true;
                number.active = true;
                currentBall = number;
                updateState = true;
                totalBallsCalled++;
                // If user has Skip Unused turned on and has chosen a pattern
                // Run the logic to skip unused numbers
                if(this.state.skipUnused && selectedPattern.value !== this.patternPlaceholder){
                  // Loop through the letters of the card
                  Object.keys(selectedPattern.pattern).forEach(letter => {
                    // If the letters match, check the pattern for a used slot
                    if(letter === number.letter){
                      if(selectedPattern.pattern[letter].indexOf(true) < 0){
                        // if unused, call next number. Else do nothing.
                        this.callBingoNumber();
                      }
                    }
                    return letter;
                  })
                }
              }
            }
            return number;
          })
        }
        return letter;
      });
    }
    if(updateState === true){
      this.setState({
        board: board,
        previousBall: this.state.currentBall,
        currentBall: currentBall,
        totalBallsCalled: totalBallsCalled
      });
    }
  }

  /* ------------------- Getters & Setters */
  
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
                <Pattern pattern={this.state.selectedPattern} update={this.updatePattern} />
              </div>
            </div>
            <div className="col">
              <BingoBoard board={this.state.board} />
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
                onChange={this.choosePattern}
                options={this.state.presets}
              />
            </div>
            <div className="col shrink padding-horizontal-sm">
              <button onClick={this.resetGame} disabled={this.state.running}>New Game</button>
            </div>
            <div className="col shrink padding-horizontal-sm">
              <button onClick={this.state.totalBallsCalled === 0 ? this.startNewGame : this.toggleGame}>{this.state.running ? "Pause" : this.state.totalBallsCalled === 0 ? "Start" : "Resume"}</button>
            </div>
            <div className="col shrink padding-horizontal-sm">
              <button onClick={this.callBingoNumber} disabled={this.state.running}>Next Number</button>
            </div>
            <div className="col shrink text-center padding-horizontal-sm">
              <div className="row no-wrap vertical-center">
                <div className="col shrink padding-right-lg small-text">SLOW</div>
                <div className="col"><Slider min={1500} max={10000} step={500} value={this.state.delay} onChange={this.updateDelay} reverse={true} /></div>
                <div className="col shrink padding-left-lg small-text">FAST</div>
              </div>
            </div>
            <div className="col grow padding-horizontal-md text-right">
              <label className={this.state.muteCaller ? 'toggle checked' : 'toggle'}>
                <input type="checkbox" data-gamemode="mute-caller" onChange={this.handleCheckbox} checked={this.state.muteCaller}></input>
                <span>Mute Caller</span>
                <span className="toggle-span"></span>
              </label>
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
              <label className={this.state.skipUnused ? 'toggle checked' : 'toggle'}>
                <input type="checkbox" data-gamemode="skip-unused" onChange={this.handleCheckbox} checked={this.state.skipUnused}></input>
                <span>Skip Unused Numbers</span>
                <span className="toggle-span"></span>
              </label>
            </div>
            <div className="col shink padding-horizontal-md">
              <label className={this.state.crazyBingo ? 'toggle checked' : 'toggle'}>
                <input type="checkbox" data-gamemode="crazy-bingo" onChange={this.handleCheckbox} checked={this.state.crazyBingo}></input>
                <span>Crazy Bingo</span>
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