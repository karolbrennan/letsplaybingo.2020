/*
 *  Ball Display Class
 *  Karol Brennan
 *  5.13.2018
 *  This class is used to display the current ball.
 */
import React from 'react';
import _ from 'underscore';
import logo from '../logo.svg';

class BallDisplay extends React.Component {
  render() {
    let currentBall = _.where(this.props.balls, {active: true})[0];
    if (currentBall) {
      let color = 'white';
      switch (currentBall.letter) {
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
          color = 'yellow';
          break;
        default:
          break;
      }
      return (
        <div id="ball" className={color + " relative notranslate"}>
          <div id="ballcount">{_.where(this.props.balls, {called: true}).length}</div>
          <div className="content">
            <span>
              {currentBall.letter}<br />{currentBall.number}
            </span>
          </div>
        </div>
      )
    } else {
      return (
        <div id="ball" className="white relative notranslate">
          <div id="ballcount">{_.where(this.props.balls, {called: true}).length}</div>
          <div className="content">
            <span>
             <img src={logo} alt="Lets Play Bingo Logo"/>
            </span>
          </div>
        </div>
      )
    }
  };
}

export default BallDisplay;