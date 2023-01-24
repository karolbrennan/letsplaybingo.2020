import React from "react";
import BingoBoardRow from "./BingoBoardRow";

/**
 * BingoBoard
 * Represents the board display
 *
 * @param   {Object}  props  Includes the board object and a boolean value for if manual mode is enabled
 *
 * @return  {Object}         Returns a visual representation of the bingo board
 */
export default function BingoBoard(props) {
  return (
    <div className="bingo-board">
      {Object.keys(props.board).map((letter) => {
        return (
          <BingoBoardRow
            manual={props.manual}
            key={letter}
            letter={letter}
            balls={props.board[letter]}
          />
        );
      })}
    </div>
  );
}
