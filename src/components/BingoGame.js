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
    this.state = {
      board: generateBingoBalls(),
      previousBall: null,
      currentBall: null,
      totalBallsCalled: 0,
      running: false,
      skipUnused: false,
      interval: null,
      delay: 6000,
      presets: getPresetPatterns(),
      selectedPattern: {
        value: "Choose a pattern",
        label: "Choose a pattern",
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


  /* ------------------- Gameplay Functions */

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
    this.setState({skipUnused: e.currentTarget.checked});
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
    // get a random bingo numbers from the utils method
    let randomBingoNumber = getRandomBingoNumber();
    let boardClone = {...this.state.board};
    let currentBall = null;
    let updateState = false;
    let totalBallsCalled = this.state.totalBallsCalled;
    if(totalBallsCalled < 75){
      // loop through the board to find the number
      Object.keys(boardClone).map((letter) => {
        if(this.state.board.hasOwnProperty(letter)){
          this.state.board[letter].map((number) => {
            if(number.active === true){
              // if number is currently active, unset it.
              number.active = false;
            }
            if(number.number === randomBingoNumber){
              // if the number has not already been called,
              // set to called, and set to active.
              if(number.called === false){
                number.called = true;
                number.active = true;
                currentBall = number;
                updateState = true;
                totalBallsCalled++;
              } else {
                // otherwise call a new number
                this.callBingoNumber();
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
        board: boardClone,
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


  /* ------------------- Render */
  render(){
    return(
      <div>
        <section className="dark-blue-bg padding-sm">
        </section>
        <section className="board-block dark-bg">
          <div className="row no-wrap vertical-center">
            <div className="col shrink">
              <div className="padding-xlg">
                <div className="row no-wrap margin-bottom-lg white-text uppercase small-text">
                  <div className="col text-center">
                    <div className="callNumber">{this.numberDisplay}</div>
                    <strong>Total Calls</strong>
                  </div>
                  <div className="col text-center">
                    <div className="callNumber">{this.currentCallDisplay}</div>
                    <strong>Current Call</strong>
                  </div>
                </div>
                <Pattern pattern={this.state.selectedPattern} update={this.updatePattern} />
              </div>
            </div>
            <div className="col">
              <BingoBoard board={this.state.board} />
            </div>
            <div className="col padding-xlg shrink stretch dark-gray-bg">
              <div className="ball-row row vertical">
                <div className="col padding-top-xlg padding-bottom-sm">
                  {this.currentBallDisplay}
                  <h3 className="text-center margin-bottom-sm white-text">Current Ball</h3>
                </div>
                <div className="col padding-top-sm">
                  <div className={this.state.previousBall === null ? "hide":"show"}>
                    {this.previousBallDisplay}
                    <h3 className="text-center margin-bottom-sm white-text">Previous Ball</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="game-controls dark-blue-bg padding-md">
          <div className="row no-wrap vertical-center">
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
              <button onClick={this.toggleGame}>{this.state.running ? "Pause" : "Start"}</button>
            </div>
            <div className="col shrink padding-horizontal-sm">
              <button onClick={this.callBingoNumber} disabled={this.state.running}>Next Number</button>
            </div>
            <div className="col padding-horizontal-sm">
              <label className={this.state.skipUnused ? 'toggle checked' : 'toggle'}>
                <input type="checkbox" onChange={this.handleCheckbox} checked={this.state.skipUnused}></input>
                <span className="small-text">SKIP UNUSED NUMBERS</span>
                <span className="toggle-span"></span>
              </label>
            </div>
            <div className="col text-center padding-horizontal-sm">
              <div className="row no-wrap vertical-center">
                <div className="col shrink padding-right-lg small-text">SLOW</div>
                <div className="col"><Slider min={1500} max={10000} step={500} value={this.state.delay} onChange={this.updateDelay} reverse={true} /></div>
                <div className="col shrink padding-left-lg small-text">FAST</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default BingoGame;