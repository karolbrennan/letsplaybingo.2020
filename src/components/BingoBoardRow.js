import React from "react";
import BingoBall from "./BingoBall";

/**
 * BingoBoardRow
 * Represents a row of the bingo board
 * Such a the Bs, Is, Ns, Gs, or Os.
 *
 * @param   {Object}  props  Includes an array of balls, and a boolean for manual mode
 *
 * @return  {JSX}         Returns a visual representation of a bingo board row
 */
export default function BingoBoardRow(props) {
  return (
    <div className="bingo-board-row">
      <div className="bingo-board-letter notranslate">{props.letter}</div>
      {props.balls.map((ball) => {
        return (
          <BingoBall
            manual={props.manual}
            key={ball.display}
            ball={ball}
          />
        );
      })}
    </div>
  );
}
