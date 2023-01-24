import React from "react";
import { dispatchCustomEvent } from "../helpers/Utilities";
import HelperText from "./HelperText";

/**
 * Toggle class
 * Renders a toggle input element
 *
 * Properties include:
 * disabled - boolean, indicates if the select should be disabled
 * eventName - string, the custom event name that will be fired upon selection
 * heading - string, the heading shown above the toggle
 * info - string, info text displayed in <HelperText /> if present
 * label - string, the label of the input
 * name - string, the name of the input
 * show - boolean, indicates if the select should display
 * value - string, the value that's currently selected
 */
export default function Toggle(props) {
  function toggle() {
    let settingInfo = {};
    settingInfo.property = props.name;
    settingInfo.value = !props.value;
    dispatchCustomEvent(props.eventName, settingInfo);
  }

  function getHelperText() {
    return props.info ? <HelperText text={props.info} /> : null;
  }

  if (
    !Object.prototype.hasOwnProperty.call(props, "show") ||
    props.show === true
  ) {
    return (
      <div className="setting-inner">
        {props.heading ? <h5>{props.heading}</h5> : null}
        <label>
          <button
            className={
              props.value === true || props.value === "true"
                ? "toggle active"
                : "toggle"
            }
            onClick={toggle}
            disabled={props.disabled}
            value={props.value}>
            <i
              className={
                props.value === true
                  ? "fi fi-br-checkbox"
                  : "fi fi-br-tool-marquee"
              }
            />
          </button>
          <span className="label-text">{props.label}</span>
          {getHelperText()}
        </label>
      </div>
    );
  } else {
    return null;
  }
}
