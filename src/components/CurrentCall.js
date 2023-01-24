import React from "react";
import BallDisplay from "./BallDisplay";

/**
 * CurrentCall
 *
 * @param   {Object}  props  Includes ball which represents a bingo ball, and showTitle, a boolean to inidcate if the title should be shown
 *
 * @return  {JSX}         Returns a visual display of the current call
 */
export default function CurrentCall(props) {
  return (
    <div
      className="current-call-block transparent-background"
      key={props.ball?.number}>
      <BallDisplay
        ball={props.ball}
        currentCall={true}
      />

      <div
        className={
          props.showTitle === true
            ? "uppercase-text-small margin-vertical-lg"
            : "hide"
        }>
        Current Call
      </div>
    </div>
  );
}
