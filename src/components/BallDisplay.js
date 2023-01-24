import React from "react";
import { getLogo } from "../helpers/Utilities";

/**
 * BallDisplay Component
 *
 * @param   {Object}  props  Ball object, includes properties for color, letter and number
 *
 * @return  {JSX}         Returns a visual display of a bingo ball
 */
export default function BallDisplay(props) {
  return (
    <div className="ball-display-block">
      {props.ball ? (
        <div
          className={
            props.currentCall === true ? "current-call" : "previous-call"
          }>
          <div
            className={`ball-display notranslate relative ${props.ball.color}`}>
            <div className="content">
              <div className="ball-content">
                <div className="ball-letter">{props.ball.letter}</div>
                <div className="ball-number">{props.ball.number}</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="current-call">
          <div className="ball-display white relative notranslate">
            <div className="content">
              <div className="ball-content">{getLogo()}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
