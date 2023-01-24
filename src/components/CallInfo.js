import React from "react";

/**
 * CallInfo
 *
 * @param   {Object}  props  Includes properties for:
 *                           totalCalls = # of calls already made
 *                           previousCall = the last number that was called
 *
 * @return  {JSX}         Returns a visual display of total calls and previous call
 */
export default function CallInfo(props) {
  let totalCallArray = [" ", " "];
  if (props.totalCalls !== null) {
    if (props.totalCalls > 9) {
      totalCallArray = props.totalCalls.toString().split("");
    } else {
      totalCallArray[1] = props.totalCalls === 0 ? " " : props.totalCalls;
    }
  }

  let previousCallArray = [" ", " "];
  if (props.previousCall !== null) {
    if (props.previousCall.number > 9) {
      previousCallArray = props.previousCall.number.toString().split("");
    } else {
      previousCallArray[1] = props.previousCall.number;
    }
  }

  return (
    <div className="call-info row gutters-sm no-wrap">
      <div className="col">
        <div className="digital-display notranslate">
          <div className="digit">{totalCallArray[0]}</div>
          <div className="digit">{totalCallArray[1]}</div>
        </div>
        <div className="uppercase-text-small">Total Calls</div>
      </div>
      <div className="col">
        <div className="digital-display notranslate">
          <div className="digit">{previousCallArray[0]}</div>
          <div className="digit">{previousCallArray[1]}</div>
        </div>
        <div className="uppercase-text-small">Previous Call</div>
      </div>
    </div>
  );
}
