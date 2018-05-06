import React, { Component } from 'react';
import logo from './images/logo.svg';
import _ from 'underscore';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import './App.css';

class App extends Component {

    /*
     * Constructor
     * State Variables
     * balls: balls object, holds letter, number, called and active statues
     * running: determines if the game is presently running
     * interval & delay: how often the balls are generated
     * selected pattern: name of currently selected pattern. used to display in select
     * pattern: array representing current pattern
     * presets: object holding a variety of preset pattern options
     */
    constructor(props){
        super(props);
        this.state = {
            balls: {
                1: {letter: "B", number: 1, called: false, active: false},
                2: {letter: "B", number: 2, called: false, active: false},
                3: {letter: "B", number: 3, called: false, active: false},
                4: {letter: "B", number: 4, called: false, active: false},
                5: {letter: "B", number: 5, called: false, active: false},
                6: {letter: "B", number: 6, called: false, active: false},
                7: {letter: "B", number: 7, called: false, active: false},
                8: {letter: "B", number: 8, called: false, active: false},
                9: {letter: "B", number: 9, called: false, active: false},
                10: {letter: "B", number: 10, called: false, active: false},
                11: {letter: "B", number: 11, called: false, active: false},
                12: {letter: "B", number: 12, called: false, active: false},
                13: {letter: "B", number: 13, called: false, active: false},
                14: {letter: "B", number: 14, called: false, active: false},
                15: {letter: "B", number: 15, called: false, active: false},
                16: {letter: "I", number: 16, called: false, active: false},
                17: {letter: "I", number: 17, called: false, active: false},
                18: {letter: "I", number: 18, called: false, active: false},
                19: {letter: "I", number: 19, called: false, active: false},
                20: {letter: "I", number: 20, called: false, active: false},
                21: {letter: "I", number: 21, called: false, active: false},
                22: {letter: "I", number: 22, called: false, active: false},
                23: {letter: "I", number: 23, called: false, active: false},
                24: {letter: "I", number: 24, called: false, active: false},
                25: {letter: "I", number: 25, called: false, active: false},
                26: {letter: "I", number: 26, called: false, active: false},
                27: {letter: "I", number: 27, called: false, active: false},
                28: {letter: "I", number: 28, called: false, active: false},
                29: {letter: "I", number: 29, called: false, active: false},
                30: {letter: "I", number: 30, called: false, active: false},
                31: {letter: "N", number: 31, called: false, active: false},
                32: {letter: "N", number: 32, called: false, active: false},
                33: {letter: "N", number: 33, called: false, active: false},
                34: {letter: "N", number: 34, called: false, active: false},
                35: {letter: "N", number: 35, called: false, active: false},
                36: {letter: "N", number: 36, called: false, active: false},
                37: {letter: "N", number: 37, called: false, active: false},
                38: {letter: "N", number: 38, called: false, active: false},
                39: {letter: "N", number: 39, called: false, active: false},
                40: {letter: "N", number: 40, called: false, active: false},
                41: {letter: "N", number: 41, called: false, active: false},
                42: {letter: "N", number: 42, called: false, active: false},
                43: {letter: "N", number: 43, called: false, active: false},
                44: {letter: "N", number: 44, called: false, active: false},
                45: {letter: "N", number: 45, called: false, active: false},
                46: {letter: "G", number: 46, called: false, active: false},
                47: {letter: "G", number: 47, called: false, active: false},
                48: {letter: "G", number: 48, called: false, active: false},
                49: {letter: "G", number: 49, called: false, active: false},
                50: {letter: "G", number: 50, called: false, active: false},
                51: {letter: "G", number: 51, called: false, active: false},
                52: {letter: "G", number: 52, called: false, active: false},
                53: {letter: "G", number: 53, called: false, active: false},
                54: {letter: "G", number: 54, called: false, active: false},
                55: {letter: "G", number: 55, called: false, active: false},
                56: {letter: "G", number: 56, called: false, active: false},
                57: {letter: "G", number: 57, called: false, active: false},
                58: {letter: "G", number: 58, called: false, active: false},
                59: {letter: "G", number: 59, called: false, active: false},
                60: {letter: "G", number: 60, called: false, active: false},
                61: {letter: "O", number: 61, called: false, active: false},
                62: {letter: "O", number: 62, called: false, active: false},
                63: {letter: "O", number: 63, called: false, active: false},
                64: {letter: "O", number: 64, called: false, active: false},
                65: {letter: "O", number: 65, called: false, active: false},
                66: {letter: "O", number: 66, called: false, active: false},
                67: {letter: "O", number: 67, called: false, active: false},
                68: {letter: "O", number: 68, called: false, active: false},
                69: {letter: "O", number: 69, called: false, active: false},
                70: {letter: "O", number: 70, called: false, active: false},
                71: {letter: "O", number: 71, called: false, active: false},
                72: {letter: "O", number: 72, called: false, active: false},
                73: {letter: "O", number: 73, called: false, active: false},
                74: {letter: "O", number: 74, called: false, active: false},
                75: {letter: "O", number: 75, called: false, active: false}
            },
            running: false,
            interval: 0,
            delay: 5000,
            selectedPattern: null,
            pattern: {
                B: [false,false,false,false,false],
                I: [false,false,false,false,false],
                N: [false,false,false,false,false],
                G: [false,false,false,false,false],
                O: [false,false,false,false,false]
            },
            presets: {
                "Custom": {
                    B: [false,false,false,false,false],
                    I: [false,false,false,false,false],
                    N: [false,false,false,false,false],
                    G: [false,false,false,false,false],
                    O: [false,false,false,false,false]
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
                    B: [true, false, true, false ,true],
                    I: [true, false, true, false, true],
                    N: [true, false, true, false, true],
                    G: [true, false, true, false, true],
                    O: [true, false, true, false, true]
                },
                "Postage Stamps": {
                    B: [true, true, false, false ,false],
                    I: [true, true, false, false, false],
                    N: [false, false, false, false, false],
                    G: [false, false, false, true, true],
                    O: [false, false, false, true, true]
                },
                "Sputnik": {
                    B: [true, false, false, false ,true],
                    I: [false, true, true, true, false],
                    N: [false, true, true, true, false],
                    G: [false, true, true, true, false],
                    O: [true, false, false, false, true]
                },
                "Diamond": {
                    B: [false, false, true, false ,false],
                    I: [false, true, false, true, false],
                    N: [true, false, false, false, true],
                    G: [false, true, false, true, false],
                    O: [false, false, true, false, false]
                },
                "Filled in Diamond": {
                    B: [false, false, true, false ,false],
                    I: [false, true, true, true, false],
                    N: [true, true, true, true, true],
                    G: [false, true, true, true, false],
                    O: [false, false, true, false, false]
                },
                "Blackout": {
                    B: [true, true, true, true ,true],
                    I: [true, true, true, true, true],
                    N: [true, true, true, true, true],
                    G: [true, true, true, true, true],
                    O: [true, true, true, true, true]
                },
            }
        }
    }

    /*
     *  Reset Game Function
     *  Map out the original balls array and update
     *  active and called statuses to false
     */
    resetGame = () => {
        let resetBalls = this.state.balls;
        _.map(resetBalls, (ball, index) => {
            resetBalls[index].active = false;
            resetBalls[index].called = false;
        });
        this.setState({balls: resetBalls});
    };

    /*
     *  Toggle Game Function
     *  Check the opposite of the current running state, this will determine our new state
     *  If the game is now running, call a number right away then set a new interval
     *  Otherwise, clear the interval
     *  Set the current running state
     */
    toggleGame = () => {
        if(!this.state.running === true){
            this.callNumber();
            this.setState({interval: setInterval(this.callNumber, this.state.delay)});
        } else {
            clearInterval(this.state.interval);
        }
        this.setState({running: !this.state.running});
    };

    /*
     *  Set Delay Function
     *  Fires when the user uses the delay slider
     *  If the game is running it'll clear the existing interval and set a new one
     *  Otherwise it will just update the delay
     */
    setDelay = (e) => {
        if(this.state.running){
            clearInterval(this.state.interval);
            this.setState({delay: e.target.value, interval: setInterval(this.callNumber, e.target.value)});
        } else {
            this.setState({delay: e.target.value});
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

    /*
     *  Choose Pattern Function
     *  This sets the selected pattern
     *  Sets to default if no pattern is selected or selection is cleared.
     */
    choosePattern = (e) => {
        if(e === null){
            this.setState({
                selectedPattern: null,
                pattern: {
                    B: [false,false,false,false,false],
                    I: [false,false,false,false,false],
                    N: [false,false,false,false,false],
                    G: [false,false,false,false,false],
                    O: [false,false,false,false,false]
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
     *  Call Number Function
     *  Will get all of the balls, find the active one and reset it
     *  Grabs uncalled balls and determines if there are still uncalled balls
     *  Otherwise, it'll generate a random ball, set it to called and active
     */
    callNumber = () => {
        // get all balls
        let balls = this.state.balls;
        let active = _.where(balls, {active: true});
        active.forEach(ball => {
            ball.active = false;
        });
        // get all uncalled balls
        let uncalled = _.where(balls, {called: false});
        if(uncalled.length === 0){
            alert("I've given you all I've got captain! I haven't got any more balls!");
        } else {
            // choose a random ball
            let randomball = uncalled[Math.floor(Math.random() * uncalled.length)];
            // set the ball as called
            balls[randomball.number].called = true;
            balls[randomball.number].active = true;
            // update the state to re-render the board
            this.setState({balls: balls});
        }
    };

    /*
     *  Render Board Function
     *  Set up rows based on the balls
     *  Render a section that holds the bingo board
     */
    renderBoard = () => {
        let balls = this.state.balls;
        let rows = {
            B: _.where(balls, {letter: "B"}),
            I: _.where(balls, {letter: "I"}),
            N: _.where(balls, {letter: "N"}),
            G: _.where(balls, {letter: "G"}),
            O: _.where(balls, {letter: "O"})};

        return (
            <section id="bingoboard"><div className="display-table">{
                _.map(rows, (row, letter) => (
                    <div key={"row" + letter} className="board-row">
                        <div key={letter} className="letter">{letter}</div>
                        {_.map(row, ball => (
                            <div key={ball.letter + ball.number}
                                 className={ball.called && ball.active ? "active ball"
                                     : ball.called ? "called ball" : "ball"}>
                                {ball.number}
                            </div>
                        ))}
                    </div>
                ))

            }</div></section>
        );
    };

    /*
     *  Render Buttons Function
     *  Returns a group of buttons for controling gameplay
     */
    renderButtons = () => {
        return (
            <div id="buttons">
                <button onClick={this.toggleGame}>{this.state.running ? 'Pause' : 'Play'}</button>
                <button onClick={this.callNumber} disabled={this.state.running ? 'disabled' : ''}>Next Number</button>
                <button onClick={this.resetGame}>Reset</button>
                <span>Slow</span><input onChange={(e) => this.setDelay(e)} type="range" min="5000" max="16000" step="1000" /><span>Fast</span>
            </div>
        )
    };

    /*
     *  Render Pattern Function
     *  This will display a bingo card where the user can create their own pattern
     *  Or choose a pattern from the searchable drop down
     */
    renderPattern = () => {
        let pattern = this.state.pattern;
        let patternArray = [_.map(this.state.presets, (preset, value) => (
            {value: value, label: value}
        ))];

        return (
            <section id="bingopattern">
                <div className="display-table">
                    {_.map(pattern, (column, letter) => (
                        <div key={letter} className="pattern-col">
                            <div className="pattern-letter">{letter}</div>
                            {_.map(column, (slot, index) => (
                                <div key={letter+index}
                                    className={slot ? "selected pattern-slot" : "pattern-slot"}
                                    onClick={(e) => this.updatePattern(letter, index, slot)}></div>
                            ))}
                        </div>
                    ))}
                </div>
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
            </section>
        );
    };

    /*
     *  Render Current Ball Function
     *  Will display a CSS based ball graphic
     */
    renderCurrentBall = () => {
        let currentBall = _.where(this.state.balls, {active: true})[0];
        if(currentBall) {
            let color = 'white';
            switch(currentBall.letter){
                case 'B':
                    color = 'blue';
                    break;
                case 'I':
                    color = 'red';
                    break;
                case 'N':
                    color = 'white';
                    break;
                case 'G':
                    color = 'green';
                    break;
                case 'O':
                    color = 'orange';
                    break;
                default:
                    break;
            }
            return (
                <div id="currentBall" className={color}>
                    <div className="ballCenter">
                        <span>{currentBall.letter}</span>
                        <span>{currentBall.number}</span>
                    </div>
                </div>
            )
        } else {
            return null;
        }
    };

    /*
     *  Render Method
     *  Displays the bingo page
     */
    render() {
        return (
            <div className="App">
                <header>
                    <img src={logo} alt="Let's Play Bingo Logo" />
                </header>
                {this.renderBoard()}
                {this.renderButtons()}
                {this.renderPattern()}
                {this.renderCurrentBall()}
            </div>
        );
    }
}

export default App;