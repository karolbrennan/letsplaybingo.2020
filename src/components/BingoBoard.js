/*
 *  Bingo Board Class
 *  Karol Brennan
 *  5.13.2018
 *  This class is used to display the bingo board
 */
import React from 'react';
import _ from 'underscore';

class BingoBoard extends React.Component {
  render() {
    let balls = this.props.balls;
    let rows = {
      B: _.where(balls, {letter: "B"}),
      I: _.where(balls, {letter: "I"}),
      N: _.where(balls, {letter: "N"}),
      G: _.where(balls, {letter: "G"}),
      O: _.where(balls, {letter: "O"})
    };

    return (
      <div className="board notranslate">
        {_.map(rows, (row, letter) => (
          <div key={"row" + letter} className="board-row">
            <div key={letter} className="letter">{letter}</div>
            {_.map(row, ball => (
              <div key={ball.letter + ball.number}
                   className={ball.called && ball.active ? "active ball" : ball.called ? "called ball" : "ball"}>
                {ball.number}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };
}

export default BingoBoard;