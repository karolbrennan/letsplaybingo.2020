import React from "react";
import { dispatchCustomEvent } from "../helpers/Utilities";

/**
 * BingoBall
 * Represents a bingo ball on the bingo board
 *
 * @param   {Object}  props  Includes two properties
 *                    props.manual - if enabled you can click on the ball element
 *                    props.ball is a representation of a bingo ball, with .active, .called, and .number properties
 *
 * @return  {JSX}    Returns a visual representation of a bingo ball used
 *                   in the BingoBoardRow component
 */
export default function BingoBall(props) {
  if (props.manual) {
    return (
      <div
        className={
          props.ball.active
            ? "bingo-board-ball active notranslate"
            : props.ball.called
            ? "bingo-board-ball called notranslate"
            : "bingo-board-ball notranslate"
        }>
        <button
          className="bingo-board-ball-button"
          onClick={() => dispatchCustomEvent("mark-number", props.ball)}>
          {props.ball.number}
        </button>
      </div>
    );
  } else {
    return (
      <div
        className={
          props.ball.active
            ? "bingo-board-ball active notranslate"
            : props.ball.called
            ? "bingo-board-ball called notranslate"
            : "bingo-board-ball notranslate"
        }>
        {props.ball.number}
      </div>
    );
  }
}
