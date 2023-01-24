import React from "react";

// Chimes
import {
  chime1,
  chime2,
  chime3,
  chime4,
  chime5,
  chime6,
  chime7,
  chime8,
  chime9,
  chime10,
  chime11,
  chime12,
  pop1,
  pop2,
  pop3,
  pop4,
  shuffle,
} from "../assets/chimes";

import { getBlankPattern } from "./PresetPatterns";

/**
 * Dispratches a custom event on the document element
 *
 * @param   {String}  eventName  name of custom event
 * @param   {Mixed}  detail     detail value passed with the event
 */
export function dispatchCustomEvent(eventName, detail) {
  document.dispatchEvent(new CustomEvent(eventName, { detail: detail }));
}

/**
 * Generates the needed bingo balls
 *
 * @var  {Object}
 */
export function generateBingoBoard() {
  let board = {};
  let letters = ["B", "I", "N", "G", "O"];
  let count = 1;
  letters.forEach((letter) => {
    board[letter] = [];
    for (let i = 1; i <= 15; i++) {
      let obj = {
        letter: letter,
        color: getBallColor(letter),
        number: count,
        display: letter + count,
        called: false,
        active: false,
      };
      board[letter].push(obj);
      count++;
    }
  });

  return board;
}

/**
 * Returns the ball color associated with the passed in letter
 *
 * @param   {String}  letter  Letter in "BINGO"
 *
 * @return  {String}          Returns the color string
 */
export function getBallColor(letter) {
  switch (letter) {
    case "B":
      return "blue";
    case "I":
      return "red";
    case "N":
      return "white";
    case "G":
      return "green";
    case "O":
      return "yellow";
    default:
      return "white";
  }
}

/**
 * Returns a bingo ball display using the selected ball object
 *
 * @return  {JSX}  JSX element
 */
export function getBallDisplay(ball) {
  if (ball) {
    return (
      <div className={"ball-display " + ball.color + " relative notranslate"}>
        <div className="content">
          <div className="ball-content">
            <div className="ball-letter">{ball.letter}</div>
            <div className="ball-number">{ball.number}</div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="ball-display white relative notranslate">
        <div className="content">
          <div className="ball-content">{getLogo()}</div>
        </div>
      </div>
    );
  }
}

/**
 * Returns a list of options for selecting chimes
 *
 * @return  {Array}  Array of options used in the chimes select
 */
export function getChimeOptions() {
  return [
    { label: "Chime 1", value: chime1 },
    { label: "Chime 2", value: chime2 },
    { label: "Chime 3", value: chime3 },
    { label: "Chime 4", value: chime4 },
    { label: "Chime 5", value: chime5 },
    { label: "Chime 6", value: chime6 },
    { label: "Chime 7", value: chime7 },
    { label: "Chime 8", value: chime8 },
    { label: "Chime 9", value: chime9 },
    { label: "Chime 10", value: chime10 },
    { label: "Chime 11", value: chime11 },
    { label: "Chime 12", value: chime12 },
    { label: "Pop 1", value: pop1 },
    { label: "Pop 2", value: pop2 },
    { label: "Pop 3", value: pop3 },
    { label: "Pop 4", value: pop4 },
  ];
}

/**
 * Exports the default settings for the Settings.js component
 *
 * @return  {Object}  Default settings
 */
export function getDefaultSettings() {
  return {
    audibleCaller: false,
    automaticCalling: false,
    caller: "",
    chattyCaller: false,
    chime: "",
    delay: 30,
    doubleCall: false,
    evenOdds: false,
    fullscreen: false,
    hideControls: false,
    hideFooter: false,
    layout: "classic",
    manual: false,
    pattern: { ...getBlankPattern() },
    popOutControls: false,
    previousCallsToShow: 5,
    settingsPanelOpen: false,
    showCountdown: true,
    showPreviousCalls: true,
    skipUnusedNumbers: false,
    theme: "lpb",
    wildBingo: false,
    wildBingoDouble: false,
    settingsPanelOpen: false,
  };
}

/**
 * Returns language label for use with the speech synthesis api
 *
 * @var  {String} Language code
 */
export function getLanguageLabel(code) {
  switch (code) {
    case "ar-SA":
      return "Arabic (Saudi Arabia)";
    case "cs-CZ":
      return "Czech (Czech Republic)";
    case "da-DK":
      return "Danish (Denmark)";
    case "de-DE":
      return "German";
    case "el-GR":
      return "Greek (Greece)";
    case "en":
      return "English";
    case "en-AU":
      return "English (Australia)";
    case "en-GB":
      return "UK English";
    case "en-IE":
      return "English (Ireland)";
    case "en-IN":
      return "English (India)";
    case "en-US":
      return "US English";
    case "en-ZA":
      return "English (South Africa)";
    case "es-AR":
      return "Spanish (Argentina)";
    case "es-ES":
      return "Spanish (Spain)";
    case "es-MX":
      return "Spanish (Mexico)";
    case "es-US":
      return "Spanish (United States)";
    case "fi-FI":
      return "Finnish (Finland)";
    case "fr-CA":
      return "French (Canada)";
    case "fr-FR":
      return "French (France)";
    case "he-IL":
      return "Hebrew";
    case "hi-IN":
      return "Hindi (India)";
    case "hu-HU":
      return "Hungarian (Hungary)";
    case "id-ID":
      return "Indonesian";
    case "it-IT":
      return "Italian";
    case "ja-JP":
      return "Japanese";
    case "ko-KR":
      return "Korean (Korea)";
    case "nb-NO":
      return "Norwegian (Bokm?l) (Norway)";
    case "nl-BE":
      return "Dutch (Belgium)";
    case "nl-NL":
      return "Dutch (Netherlands)";
    case "pl-PL":
      return "Polish (Poland)";
    case "pt-PT":
      return "Portuguese (Portugal)";
    case "pt-BR":
      return "Portuguese (Brazil)";
    case "ro-RO":
      return "Romanian (Romania)";
    case "ru-RU":
      return "Russian (Russia)";
    case "sk-SK":
      return "Slovak (Slovakia)";
    case "sv-SE":
      return "Swedish";
    case "th-TH":
      return "Thai (Thailand)";
    case "tr-TR":
      return "Turkish (Turkey)";
    case "zh-CN":
      return "Chinese (S)";
    case "zh-HK":
      return "Chinese (Hong Kong)";
    case "zh-TW":
      return "Chinese (T)";
    default:
      return code;
  }
}

/**
 * Returns a list of options for layouts
 * For use in a dropdown menu
 *
 * @return  {Array}  Layout options
 */
export function getLayoutOptions() {
  return [
    { value: "classic", label: "Classic" },
    { value: "classic-reverse", label: "Classic Reversed" },
    { value: "stacked", label: "Stacked" },
    { value: "vertical", label: "Vertical" },
    // { value: "", label: "" },
  ];
}

/**
 * Returns the Let's Play Bingo Logo
 *
 * @return  {JSX}  SVG
 */
export function getLogo() {
  return (
    <svg
      className="logo"
      data-name="logo"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 270 115">
      <title>Let's Play Bingo logo</title>
      <defs>
        <linearGradient
          id="rainbowGrad"
          x1="10%"
          y1="5%"
          x2="120%"
          y2="20%">
          <stop
            className="stop1"
            offset="0%"
          />
          <stop
            className="stop2"
            offset="16%"
          />
          <stop
            className="stop3"
            offset="33%"
          />
          <stop
            className="stop4"
            offset="50%"
          />
          <stop
            className="stop5"
            offset="67%"
          />
          <stop
            className="stop6"
            offset="84%"
          />
        </linearGradient>
      </defs>
      <path
        className="logo-color"
        d="M82.21,58.73q-.09-10.22-.07-20.36l-1.86.24a95.58,95.58,0,0,1,0-9.9Q87,27.94,93.7,27.3A86.68,86.68,0,0,1,93.48,37l-2.27.25Q91,47.21,91,57.22l4.7-.67q0-3.15.09-6.29,1-.23,1.94-.41t2-.29q1-.12,2-.18t2-.07q-.24,8-.41,16.07Q91.88,67,80.59,69q-.2-2.48-.23-5t.05-5Z"
        transform="translate(-15.33 -23.04)"
      />
      <path
        className="logo-color"
        d="M124,61.14A17.31,17.31,0,0,1,121.26,63a14,14,0,0,1-5.12,1.46,9.36,9.36,0,0,1-4.25-.37,8.28,8.28,0,0,1-3.3-2.13,11.49,11.49,0,0,1-2.29-3.6,17.88,17.88,0,0,1-1.19-4.76,26.63,26.63,0,0,1,0-6.43,18.73,18.73,0,0,1,1.75-6,13,13,0,0,1,3.68-4.56,10.35,10.35,0,0,1,5.76-2.07,9.65,9.65,0,0,1,3.72.39,8.13,8.13,0,0,1,2.83,1.57,7.34,7.34,0,0,1,1.86,2.46,8.74,8.74,0,0,1,.8,3,15.44,15.44,0,0,1-.15,3.7,8.59,8.59,0,0,1-1.49,3.61,10.16,10.16,0,0,1-3.54,3A19.07,19.07,0,0,1,114,54.1a3.34,3.34,0,0,0,1,1.6,3.12,3.12,0,0,0,2.38.45A10.21,10.21,0,0,0,121.17,55a15.71,15.71,0,0,0,3.21-2.22Q124.21,57,124,61.14Zm-6.11-18a2.26,2.26,0,0,0-.48-1.24,1.32,1.32,0,0,0-1.22-.45,2.6,2.6,0,0,0-2.14,1.83,12,12,0,0,0-.77,4.51,6.71,6.71,0,0,0,3.6-1.73A3.57,3.57,0,0,0,117.93,43.15Z"
        transform="translate(-15.33 -23.04)"
      />
      <path
        className="logo-color"
        d="M129.82,34.4q.1-1.33.24-2.82t.24-2.87Q135,26.78,139.85,25q-.47,4.5-.92,9l4.1-.14q-.09,2.1-.31,4.22t-.58,4.24l-4,.19q-.35,3.7-.68,7.42-.07.71-.08,1.14t0,.68a1.43,1.43,0,0,0,.35.84,1.26,1.26,0,0,0,1.11.33,5.18,5.18,0,0,0,1.5-.35,7.82,7.82,0,0,0,1.25-.58q-.41,4.1-.8,8.22a20.79,20.79,0,0,1-2.57,1.11,12.28,12.28,0,0,1-3.21.73c-2.12.19-3.72-.22-4.8-1.23a6.77,6.77,0,0,1-1.88-4.58q-.06-.71-.05-1.38t.06-1.5q.39-5.17.82-10.32l-2.12.14a60.92,60.92,0,0,1,.64-8.66Z"
        transform="translate(-15.33 -23.04)"
      />
      <path
        className="logo-color"
        d="M144.66,40q1.68-3.21,3.4-6.38l-2.56.06a76,76,0,0,1,1.19-10.57q4.73,0,9.47,0a91.5,91.5,0,0,1-1.35,10.41,8.22,8.22,0,0,0-.67,1q-.63,1-1.4,2.14l-2,3.16Q147.72,39.84,144.66,40Z"
        transform="translate(-15.33 -23.04)"
      />
      <path
        className="logo-color"
        d="M154.18,51.36a25.61,25.61,0,0,1,6-.21l0,.34c0,.16,0,.32,0,.47s0,.3,0,.46a1.78,1.78,0,0,0,.64,1.15,2.91,2.91,0,0,0,2.16.56c1.39,0,2.07-.59,2-1.66a1.62,1.62,0,0,0-.24-.84,2.13,2.13,0,0,0-1-.68l-3-1.09a10.17,10.17,0,0,1-2-1,7.56,7.56,0,0,1-1.68-1.52,7.3,7.3,0,0,1-1.17-2,8.06,8.06,0,0,1-.5-2.62,10.8,10.8,0,0,1,.66-4.51,8,8,0,0,1,2-3A7.68,7.68,0,0,1,161,33.52a10.82,10.82,0,0,1,3.2-.48,10.05,10.05,0,0,1,3,.43,6.71,6.71,0,0,1,2,1l.15-.82a26.33,26.33,0,0,1,6.05.1q-.69,4.06-1.36,8.14a31.45,31.45,0,0,1-6.33,0l.07-.43a3.22,3.22,0,0,0,.07-.63,1.33,1.33,0,0,0-.52-1,2.15,2.15,0,0,0-1.44-.43,1.93,1.93,0,0,0-1.4.47,1.54,1.54,0,0,0-.46,1.19,1.84,1.84,0,0,0,.2.7,1.39,1.39,0,0,0,.88.65l3.14,1.14a16.45,16.45,0,0,1,2,1,7.76,7.76,0,0,1,1.75,1.39,6.28,6.28,0,0,1,1.23,2,7.08,7.08,0,0,1,.48,2.63,11,11,0,0,1-.79,4.48A9,9,0,0,1,170.86,58a8.51,8.51,0,0,1-3,1.79,11.46,11.46,0,0,1-3.37.65,11.34,11.34,0,0,1-2.91-.27,5.92,5.92,0,0,1-2.27-.93l-.13.89a24.51,24.51,0,0,1-6.06.31Q153.65,55.89,154.18,51.36Z"
        transform="translate(-15.33 -23.04)"
      />
      <path
        className="logo-color"
        d="M184.16,51q1.54-8.66,3.17-17.23l-1.87-.07A71.11,71.11,0,0,1,187,25.36q7.14.38,14.27.92a12.58,12.58,0,0,1,4.55,1.09,7.89,7.89,0,0,1,2.82,2.19,7.31,7.31,0,0,1,1.39,3,12.94,12.94,0,0,1,.27,3.46,13.73,13.73,0,0,1-1,4.52,11.48,11.48,0,0,1-2.5,3.76,11.31,11.31,0,0,1-3.95,2.55,13.26,13.26,0,0,1-5.38.8l-3.93-.13-.72,3.69,3.63.1q-.26,2.07-.67,4.13t-.94,4.14q-7-.09-13.94,0,.2-2.13.57-4.25t.85-4.24Zm14-11.49a2.59,2.59,0,0,0,1.9-.7,3.16,3.16,0,0,0,.91-2.36,2.07,2.07,0,0,0-.51-1.68,2.37,2.37,0,0,0-1.48-.55l-2.64-.15q-.54,2.65-1.08,5.31Z"
        transform="translate(-15.33 -23.04)"
      />
      <path
        className="logo-color"
        d="M211.54,33.43q.3-1.87.71-3.73t1-3.7q5.57.54,11.13,1.18-3.37,12.7-6.55,25.64l1.81.12q-.33,1.84-.75,3.68t-1,3.68q-5.29-.28-10.59-.46,3-13.25,6.11-26.26Z"
        transform="translate(-15.33 -23.04)"
      />
      <path
        className="logo-color"
        d="M232.78,61.27l.33-1.84a7.68,7.68,0,0,1-2.6,1.6,7.3,7.3,0,0,1-3,.42,5.87,5.87,0,0,1-3.33-1.12,6.33,6.33,0,0,1-1.87-2.41,9.43,9.43,0,0,1-.77-3.1,21,21,0,0,1,0-3.21,20.73,20.73,0,0,1,1.33-6.12,14.9,14.9,0,0,1,2.86-4.69,11.26,11.26,0,0,1,4.07-2.86,9.82,9.82,0,0,1,4.93-.62,6.75,6.75,0,0,1,3.4,1.17,7.54,7.54,0,0,1,1.63,1.65l1.14-1.54q3.19.41,6.37.85-2.42,7.68-4.77,15.47l1.81.19q-.4,1.75-.89,3.49t-1.16,3.48Q237.49,61.64,232.78,61.27Zm-.89-7a1.88,1.88,0,0,0,1.14-.36,4.25,4.25,0,0,0,1.21-1.28,10,10,0,0,0,1.05-2.26,14.51,14.51,0,0,0,.66-3.27,4,4,0,0,0-.21-1.8,1.24,1.24,0,0,0-1.06-.9,2,2,0,0,0-1.5.47A5.3,5.3,0,0,0,232,46.4a10.2,10.2,0,0,0-.92,2.23,13.29,13.29,0,0,0-.49,2.58,5.17,5.17,0,0,0,.19,2.16A1.27,1.27,0,0,0,231.9,54.29Z"
        transform="translate(-15.33 -23.04)"
      />
      <path
        className="logo-color"
        d="M259.75,48.35A40.43,40.43,0,0,1,262,41.68q3.8.62,7.58,1.29a4.67,4.67,0,0,1,.27,1.06q.09.61.13,1.28a11,11,0,0,1,0,1.32q0,.65-.12,1.17a14.74,14.74,0,0,1-1.56,4.46,37.74,37.74,0,0,1-2.92,4.69,57.06,57.06,0,0,1-3.68,4.56q-2,2.21-3.84,4a31.19,31.19,0,0,1-2.48,2.16,13.18,13.18,0,0,1-2.49,1.54,10.64,10.64,0,0,1-2.7.85,12.12,12.12,0,0,1-3.14.09,12.77,12.77,0,0,1-4.9-1.57q1.13-3.28,2.27-6.53l.51.33a9.29,9.29,0,0,0,.87.47,8.55,8.55,0,0,0,1.07.42,5.17,5.17,0,0,0,1.07.24,4.8,4.8,0,0,0,1.6-.07,4,4,0,0,0,1.27-.56,6.94,6.94,0,0,0,.85-.6,4.54,4.54,0,0,0,.47-.43q-.52-3.93-1.43-7.82t-1.89-7.22L247,46.59q.4-1.74,1-3.46t1.24-3.41q3.87.55,7.73,1.14.25.88.57,2.45t.62,3.41q.3,1.85.56,3.71t.46,3.31q.4-.57.8-1.24a15,15,0,0,0,.72-1.38q.32-.7.56-1.36a10,10,0,0,0,.35-1.14Z"
        transform="translate(-15.33 -23.04)"
      />
      <path
        className="logo-dark"
        d="M23.94,112.32,20.35,91.94l-3.24.5q-.37-1.22-.66-2.4t-.52-2.42q-.23-1.24-.38-2.45t-.23-2.48Q29,79.82,42.78,77.44a24.13,24.13,0,0,1,7.81-.23,15.18,15.18,0,0,1,5.77,2A10.88,10.88,0,0,1,60,82.93a11.49,11.49,0,0,1,1.56,4.71A11.9,11.9,0,0,1,61,93a9.47,9.47,0,0,1-2.77,4A18.49,18.49,0,0,1,61,98.53a10.93,10.93,0,0,1,2.37,2.13,11.11,11.11,0,0,1,1.74,3,15.19,15.19,0,0,1,.93,4.12,16.5,16.5,0,0,1-.47,6.06,11.24,11.24,0,0,1-2.79,4.89,12.81,12.81,0,0,1-5.34,3.15,24.54,24.54,0,0,1-8.17.94q-13.34-.35-26.67-.65-.36-1.25-.65-2.44t-.52-2.43q-.23-1.24-.38-2.44t-.24-2.44Zm18.77-17.9a3.38,3.38,0,0,0,2.42-1.1,2.73,2.73,0,0,0,.58-2.12,3.05,3.05,0,0,0-1-1.84,3.25,3.25,0,0,0-2.74-.6l-5.73.76L37,95Zm3.41,17.23a3.91,3.91,0,0,0,3-1.08,3,3,0,0,0,.73-2.49,3.51,3.51,0,0,0-1.34-2.35,4.59,4.59,0,0,0-3.25-.83l-6.74.39.94,6.54Z"
        transform="translate(-15.33 -23.04)"
      />
      <path
        className="logo-dark"
        d="M71.71,111.14,69.42,85.82l-3.27.33q-.29-1.55-.5-3t-.36-3q-.15-1.56-.22-3.06T65,73.94q12.06-1.72,24.17-3.06.25,1.66.42,3.26t.28,3.28q.1,1.68.13,3.29T90,84l-3.28.26L88.49,111l3.18,0q.24,1.68.41,3.28t.27,3.29q.1,1.68.14,3.28t0,3.28l-22.8-.68q-.29-1.56-.5-3.06t-.36-3.05q-.15-1.56-.22-3.05t-.08-3.05Z"
        transform="translate(-15.33 -23.04)"
      />
      <path
        className="logo-dark"
        d="M98.76,110.91,97.29,83.48,94,83.71q-.24-1.69-.41-3.3t-.26-3.31q-.1-1.69-.12-3.32t0-3.34q9.58-1,19.18-1.76,6.76,12.7,13.17,26.11L125.32,82l-2.21.09q-.19-1.8-.3-3.52T122.66,75q0-1.8,0-3.53t.14-3.54q10.94-.71,21.89-1.1.15,1.86.22,3.63T145,74.1q0,1.86-.07,3.64t-.21,3.64l-3.28.07.15,44.22-14.5-.49q-6.4-13.84-13.17-27.05l.44,12.78h2.21q.19,1.78.32,3.48t.18,3.48q.06,1.78,0,3.48t-.09,3.48l-20.62-.66q-.23-1.7-.4-3.32t-.26-3.32q-.1-1.69-.12-3.32t0-3.32Z"
        transform="translate(-15.33 -23.04)"
      />
      <path
        className="logo-dark"
        d="M177.1,107.23l-2.85-.08q-.08-1.91-.1-3.65t0-3.56q.06-1.82.18-3.6t.32-3.68q11.22.21,22.42.64,0,1.92,0,3.71t-.12,3.62q-.1,1.83-.26,3.57t-.4,3.65l-2.36-.09-.8,15.63q-.56.31-2.35,1.17a34.31,34.31,0,0,1-4.56,1.71,50,50,0,0,1-6.4,1.48,38.8,38.8,0,0,1-7.91.47,26.68,26.68,0,0,1-11.62-2.8,23.42,23.42,0,0,1-8-6.8,28.81,28.81,0,0,1-4.67-9.94,47.78,47.78,0,0,1-1.51-12.34,44.28,44.28,0,0,1,1.73-12.66,29.71,29.71,0,0,1,5-9.92,23.57,23.57,0,0,1,7.8-6.5,22,22,0,0,1,10.23-2.37,21.7,21.7,0,0,1,6.21.94,15.55,15.55,0,0,1,5.13,2.48l.07-1.83q3.34-.19,6.74-.1,3,.08,6.06.44L194,90q-2,.1-3.94.12t-3.86,0q-2-.06-3.89-.19t-3.81-.34l.11-3.15a5.76,5.76,0,0,0-1.35-4.09,5.26,5.26,0,0,0-4.16-1.72,6.2,6.2,0,0,0-3.74,1.16,9.58,9.58,0,0,0-2.82,3.28,18.45,18.45,0,0,0-1.77,5,33,33,0,0,0-.69,6.34,29.48,29.48,0,0,0,.65,7.47,14.7,14.7,0,0,0,2,4.91,8,8,0,0,0,3,2.72,8.24,8.24,0,0,0,3.47.88,17.1,17.1,0,0,0,2.46-.1,6.52,6.52,0,0,0,1.29-.21Z"
        transform="translate(-15.33 -23.04)"
      />
      <path
        className="logo-o"
        d="M222.77,130a24,24,0,0,1-12-3.18,22.2,22.2,0,0,1-7.5-7.54,30.38,30.38,0,0,1-3.78-10.34,49.69,49.69,0,0,1-.72-11.56,49.14,49.14,0,0,1,2-11.49,29.72,29.72,0,0,1,5.13-10,23.26,23.26,0,0,1,8.84-6.78,26.39,26.39,0,0,1,13.14-1.81,26.68,26.68,0,0,1,12.52,3.91A23.47,23.47,0,0,1,248,79.07a28,28,0,0,1,3.47,10.26,45,45,0,0,1,.18,11.16,47,47,0,0,1-2.54,10.91,31.68,31.68,0,0,1-5.4,9.54,25,25,0,0,1-21,9Zm1.29-15.82q3.93.18,6.55-3.62t3.32-11.34q.69-7.64-1.29-11.72a7,7,0,0,0-6-4.39,7.3,7.3,0,0,0-6.84,3.51q-2.64,3.81-3.19,11.58T218,109.92A6.79,6.79,0,0,0,224.06,114.16Z"
        transform="translate(-15.33 -23.04)"
      />
      <path
        className="logo-dark"
        d="M257.15,71.81q9.23,1.17,18.41,2.6-3.18,17.17-6.31,34.48-7.1-.56-14.21-1.06Q256.12,89.88,257.15,71.81Zm13,41.16q-.15,2.22-.35,4.33t-.48,4.24q-.28,2.14-.62,4.23t-.75,4.23l-16.68-.54q.11-2.22.25-4.39t.38-4.39q.25-2.21.59-4.38t.74-4.45Q261.66,112.37,270.12,113Z"
        transform="translate(-15.33 -23.04)"
      />
    </svg>
  );
}

/**
 * Generates a random number between 2 values
 * Rejects if it is included in the called values
 *
 * @param   {Integer}  min              Floor of possible numbers
 * @param   {Integer}  max              Ceiling of possible numbers
 * @param   {Array}    calledObjects    Array of called ball objects
 *
 * @return  {Mixed}                     Could be string or generated number
 */
export function getRandomNumberInRange(min, max, calledObjects = []) {
  // convert called to a list of just values
  let called;
  if (calledObjects.length > 0 && typeof calledObjects[0] === "number") {
    called = calledObjects;
  } else {
    called = calledObjects.map((calledObject) => calledObject.number);
  }
  // if the called length is smaller than the max number
  // go ahead and select the next number, otherwise return message
  if (called.length < max) {
    for (let count = 0; count < 5000; count++) {
      let array = new Uint8Array(1);
      // only allow this to run 5k times
      window.crypto.getRandomValues(array);
      let value = array[0] % (max + 1);
      if (!called.includes(value) && value >= min && value <= max) {
        return value;
      }
    }
    throw new Error("unique random not found");
  }
  throw new Error("max has been reached");
}

/**
 * Returns an object containing all of the sound files
 *
 * @return  {Object}  list of sound files
 */
export function getSoundFiles() {
  return {
    chime1,
    chime2,
    chime3,
    chime4,
    chime5,
    chime6,
    chime7,
    chime8,
    chime9,
    chime10,
    chime11,
    chime12,
    pop1,
    pop2,
    pop3,
    pop4,
    shuffle,
  };
}

/**
 * Returns a list of theme options
 * for use in a dropdown menu
 *
 * @return  {Array}  List of options for themes
 */
export function getThemeOptions() {
  return [
    { value: "lpb", label: "Let's Play Bingo" },
    { value: "amber", label: "Amber" },
    { value: "blue", label: "Blue" },
    { value: "brown", label: "Brown" },
    { value: "chartreuse", label: "Chartreuse" },
    { value: "green", label: "Green" },
    { value: "magenta", label: "Magenta" },
    { value: "orange", label: "Orange" },
    { value: "pink", label: "Pink" },
    { value: "purple", label: "Purple" },
    { value: "rainbow", label: "Rainbow" },
    { value: "red", label: "Red" },
    { value: "teal", label: "Teal" },
    { value: "vermillion", label: "Vermillion" },
    { value: "violet", label: "Violet" },
    { value: "yellow", label: "Yellow" },
  ];
}

/**
 * Toggles full screen view on the application
 *
 * @param   {Boolean}  state  represents if full screen should be active or not
 */
export function toggleFullScreen(state) {
  let elem = document.documentElement;
  if (state === true) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE11 */
      elem.msRequestFullscreen();
    }
  } else {
    if (document.fullscreenElement !== null) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        /* Safari */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        /* IE11 */
        document.msExitFullscreen();
      }
    }
  }
}