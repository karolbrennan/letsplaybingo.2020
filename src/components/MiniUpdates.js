import React from "react";
import { Link } from "react-router-dom";
import { dispatchCustomEvent } from "../helpers/Utilities";

/**
 * MiniUpdates
 *
 * @param   {Object}  props  Includes property for gamedata used to generate bug reports
 *
 * @return  {JSX}         Returns a div that includes update information shown in the settings panel
 */
export default function MiniUpdates(props) {
  /**
   * Sends an email that contains game
   * settings and device info to help with
   * replicating user issues
   */
  function handleBugReport() {
    let subject = "Let's Play Bingo bug report";
    let body = `Thank you for playing let's play bingo and for taking the time to report a bug! Please replace this line and describe what issue you are running into.`;
    body += `%0D%0A%0D%0A%0D%0A -------------------------------- PLEASE LEAVE EVERYTHING BELOW THIS LINE IN TACT --------------------------------`;
    body += `%0D%0A%0D%0A The data below includes information about your device and your game settings. This information will help me replicate your issue so I can fix it.`;
    body += `%0D%0A%0D%0A----- Browser/Device Info ------ %0D%0A`;
    const { userAgent } = navigator;
    body += JSON.stringify(userAgent);
    body += `%0D%0A%0D%0A----- Game State ------ %0D%0A`;
    let gameData = props.gamedata;
    body += JSON.stringify(gameData);
    window.open(
      `mailto:hello@letsplaybingo.io?subject=${subject}&body=${body}`
    );
  }

  return (
    <div>
      <h4>Updates</h4>
      <div className="x-small-text">
        <p>
          <strong>Version:</strong>&nbsp;4.0.0
          <span className="padding-horizontal-md">|</span>
          <strong>Released:</strong>&nbsp;1.1.2023
        </p>
        <ul>
          <li>Moved all game controls and settings to this settings menu.</li>
          <li>Added the ability to control the game with with the keyboard.</li>
          <li>Added the option to hide game controls and the footer.</li>
          <li>Added full screen mode.</li>
          <li>Added different layouts.</li>
          <li>Added different themes.</li>
          <li>Upgraded the time between calls controller.</li>
          <li>
            Upgraded the technology used for bingo calls and card generation to
            now utilize the browser's built in cryptographic randomizer for
            better randomization.
          </li>
        </ul>
        <p>
          See more in the{" "}
          <Link
            to="/releases"
            onClick={() => {
              dispatchCustomEvent("menu-open", true);
            }}>
            Release Notes
          </Link>
        </p>
        <p>
          <strong>Need to report a bug?</strong>
          <button
            className="text-button"
            onClick={handleBugReport}>
            Email me!
          </button>
        </p>
      </div>
    </div>
  );
}
