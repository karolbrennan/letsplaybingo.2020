/*
 *  Game Settings Class
 *  Karol Brennan
 *  5.25.2022
 *  This class is used to display game patterns
 */
import React from "react";
import Slider from "rc-slider";
import Select from "react-select";

import Utilities from "../helpers/Utilities";
const chimes = Utilities.getChimeOptions();

// Speech Synthesis
const _speechEnabled = Object.prototype.hasOwnProperty.call(
  window,
  "speechSynthesis"
);
let _synth = window.speechSynthesis;

class Settings extends React.Component {
  /* ------------- State Handlers ------------- */

  constructor(props) {
    super(props);
    this.handleSettingsPanelControl = props.settingsPanelControl;
    this.updatePropertiesOnParent = props.settingsUpdate;
    this.state = {
      fullscreen: false,
      gameSettings: props.gameSettings,
      settingsPanelOpen: props.settingsPanelOpen,
    };
  }

  updateGameSettingsState(values) {
    this.updatePropertiesOnParent(values);
    let newState = { ...this.state };
    values.forEach((object) => {
      newState.gameSettings[object.property] = object.value;
    });
    this.setState({ ...newState });
  }

  /* ------------- Component Mounted ------------- */
  componentDidMount() {
    // if speech is enabled, initialize other speech properties
    if (!this.state.voiceOptions && _speechEnabled === true) {
      _synth.onvoiceschanged = this.setUpVoices.bind(this);
    }
  }

  // componentDidUpdate(prevProps, nextProps) {
  //   console.log("-------- component did update");
  //   console.log("nextProps", nextProps);
  //   console.log("prevProps", prevProps);
  // }

  /**
   * Returns the options for the voice selection menu
   *
   * @return  {Array}  Options array
   */
  setUpVoices() {
    let selectedCaller = this.state.gameSettings.selectedCaller;

    let userLanguage =
      window.navigator.userLanguage || window.navigator.language;
    let voices = _synth.getVoices();
    let voiceOptions = [];
    if (_speechEnabled === true && voices.length > 0) {
      voices.forEach((voice) => {
        let voiceObj = voice;
        voiceObj.value = voice.name;
        voiceObj.label =
          voice.name + " / " + Utilities.getLanguageText(voice.lang);
        voiceOptions.push(voiceObj);

        // If no caller has been selected, set it to the first one we find that matches the user's lang
        if (!selectedCaller) {
          if (voice.lang === userLanguage) {
            selectedCaller = voice;
          }
        } else {
          if (Object.prototype.hasOwnProperty.call(selectedCaller, "value")) {
            if (voice.name === selectedCaller.value) {
              selectedCaller = voice;
            }
          }
        }
      });
    }
    this.updateGameSettingsState([
      { property: "voiceOptions", value: voiceOptions },
      { property: "selectedCaller", value: selectedCaller },
    ]);
  }

  /* ------------- Getters ------------- */

  get settingsPanelClass() {
    return this.state.settingsPanelOpen === true
      ? "gameSettings open"
      : "gameSettings closed";
  }

  get settingsButton() {
    return (
      <button
        className="settings-button"
        onClick={this.toggleSettingsPanel}>
        <svg
          id="Settings_Icon"
          data-name="Settings Icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 122.88 122.88">
          <title>gear</title>
          <path
            className="settings-icon"
            d="M73.48,15.84A46.87,46.87,0,0,1,84.87,21L91,14.84a7.6,7.6,0,0,1,10.72,0L108,21.15a7.6,7.6,0,0,1,0,10.72l-6.6,6.6a46.6,46.6,0,0,1,4.34,10.93h9.52A7.6,7.6,0,0,1,122.88,57V65.9a7.6,7.6,0,0,1-7.58,7.58h-9.61a46.83,46.83,0,0,1-4.37,10.81L108,91a7.6,7.6,0,0,1,0,10.72L101.73,108A7.61,7.61,0,0,1,91,108l-6.34-6.35a47.22,47.22,0,0,1-11.19,5v8.59a7.6,7.6,0,0,1-7.58,7.58H57a7.6,7.6,0,0,1-7.58-7.58v-7.76a47.39,47.39,0,0,1-12.35-4.68L31.87,108a7.62,7.62,0,0,1-10.72,0l-6.31-6.31a7.61,7.61,0,0,1,0-10.72l4.72-4.72A47.38,47.38,0,0,1,14,73.48H7.58A7.6,7.6,0,0,1,0,65.9V57A7.6,7.6,0,0,1,7.58,49.4h6.35a47.2,47.2,0,0,1,5.51-12.94l-4.6-4.59a7.62,7.62,0,0,1,0-10.72l6.31-6.31a7.6,7.6,0,0,1,10.72,0l5,5A46.6,46.6,0,0,1,49.4,15V7.58A7.6,7.6,0,0,1,57,0H65.9a7.6,7.6,0,0,1,7.58,7.58v8.26ZM59.86,36.68a24.6,24.6,0,1,1-24.6,24.59,24.59,24.59,0,0,1,24.6-24.59Z"
          />
        </svg>
      </button>
    );
  }

  /* ------------- Handlers ------------- */
  toggleSettingsPanel = () => {
    let newState = !this.state.settingsPanelOpen;
    this.setState({ settingsPanelOpen: newState });
    this.handleSettingsPanelControl(newState);
  };

  handleDelayChange = (delay) => {
    this.updateGameSettingsState([{ property: "delay", value: delay }]);
  };

  handleCheckbox = (event) => {
    let checked = event.currentTarget.checked;
    let gamemode = event.currentTarget.dataset.gamemode;
    this.updateGameSettingsState([{ property: gamemode, value: checked }]);
  };

  /*
   *  Choose Caller Function
   *  This sets the selected caller
   */
  handleChooseCaller = (caller) => {
    this.updateGameSettingsState([
      { property: "selectedCaller", value: caller },
    ]);
  };

  /**
   * Choose Chime Function
   * Sets the selected chime audible
   *
   * @param   {event}  e  Event
   */
  handleChooseChime = (event) => {
    let chime = new Audio(event.value);
    chime.play();
    this.updateGameSettingsState([{ property: "selectedChime", value: event }]);
  };

  handleFullScreenToggle = (event) => {
    this.setState({ fullscreen: !this.state.fullscreen });
    let elem = document.documentElement;

    if (event.currentTarget.checked) {
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
  };

  render() {
    return (
      <div className="settings-component">
        {this.settingsButton}
        <div className={this.settingsPanelClass}>
          <h3 className="margin-top-none margin-bottom-xlg">
            Game Settings
            {this.settingsButton}
          </h3>

          <section className="game-settings">
            {/* ----------- Gameplay Settings ---------- */}

            {/* Display Board Only */}
            <div className="padding-vertical-md">
              <div className="row vertical">
                <div
                  className="col padding-vertical-lg"
                  data-disabled={this.props.totalBallsCalled > 0}>
                  <label
                    className={
                      this.state.gameSettings.manualMode
                        ? "toggle checked"
                        : "toggle"
                    }>
                    <span className="toggle-span"></span>
                    <span>Manual Calling Mode</span>
                    <input
                      type="checkbox"
                      data-gamemode="manualMode"
                      onChange={this.handleCheckbox}
                      checked={this.state.gameSettings.manualMode}></input>
                  </label>
                </div>
              </div>
            </div>

            {/* Full Screen */}
            <div className="padding-vertical-md">
              <div className="row vertical">
                <div className="col">
                  <label
                    className={
                      this.state.fullscreen ? "toggle checked" : "toggle"
                    }>
                    <span className="toggle-span"></span>
                    <span>Display Fullscreen</span>
                    <input
                      type="checkbox"
                      onChange={this.handleFullScreenToggle}
                      checked={this.state.fullscreen}></input>
                  </label>
                </div>
              </div>
            </div>

            {/* Other Settings */}
            <div
              className="padding-vertical-md"
              data-visibility={
                this.state.gameSettings.manualMode === true ? "hide" : "show"
              }>
              {/* Autoplay Settings */}
              <div className="padding-vertical-md">
                <h6>Autoplay Speed</h6>
                <div className="row vertical margin-bottom-lg">
                  <div className="align-center slider">
                    <Slider
                      min={3500}
                      max={30000}
                      step={500}
                      value={this.state.gameSettings.delay}
                      onChange={this.handleDelayChange}
                      reverse={true}
                    />
                  </div>
                </div>
              </div>

              {/* Skip Unused Numbers */}
              <div className="padding-vertical-lg">
                <div
                  className="row vertical"
                  data-disabled={this.totalBallsCalled > 0}>
                  <div className="col">
                    <label
                      className={
                        this.state.gameSettings.skipUnused
                          ? "toggle checked"
                          : "toggle"
                      }>
                      <span className="toggle-span"></span>
                      <span>Skip Unused Numbers</span>
                      <input
                        type="checkbox"
                        data-gamemode="skipUnused"
                        onChange={this.handleCheckbox}
                        checked={this.state.gameSettings.skipUnused}></input>
                    </label>
                  </div>
                </div>
              </div>

              <h4 className="margin-vertical-sm">Game Modes</h4>
              {/* Wild Bingo Settings */}
              <div className="padding-vertical-lg">
                <div
                  className="row vertical"
                  data-disabled={this.totalBallsCalled > 0}>
                  <div className="col padding-vertical-md">
                    <label
                      className={
                        this.state.gameSettings.wildBingo
                          ? "toggle checked"
                          : "toggle"
                      }>
                      <span className="toggle-span"></span>
                      <span>Enable Wild Bingo</span>
                      <input
                        type="checkbox"
                        data-gamemode="wildBingo"
                        onChange={this.handleCheckbox}
                        checked={this.state.gameSettings.wildBingo}></input>
                    </label>
                  </div>
                  <div
                    className="col padding-vertical-md"
                    data-disabled={
                      !this.state.gameSettings.wildBingo ||
                      this.totalBallsCalled > 0
                    }>
                    <label
                      className={
                        this.state.gameSettings.evensOdds
                          ? "toggle checked"
                          : "toggle"
                      }>
                      <span className="toggle-span"></span>
                      <span>Evens/Odds Mode</span>
                      <input
                        type="checkbox"
                        data-gamemode="evensOdds"
                        onChange={this.handleCheckbox}
                        checked={this.state.gameSettings.evensOdds}></input>
                    </label>
                  </div>
                </div>
              </div>

              <h4 className="margin-vertical-sm">Audio Settings</h4>
              {/* Caller Enabler */}
              {/* Only shown if speech is enabled by the browser */}
              <div
                className="row vertical"
                data-visibility={_speechEnabled === true ? "show" : "hide"}>
                {/* Enable Caller */}
                <div className="col padding-vertical-md">
                  <label
                    className={
                      this.state.gameSettings.enableCaller
                        ? "toggle checked"
                        : "toggle"
                    }>
                    <span className="toggle-span"></span>
                    <span>Enable Bingo Caller</span>
                    <input
                      type="checkbox"
                      data-gamemode="enableCaller"
                      onChange={this.handleCheckbox}
                      checked={this.state.gameSettings.enableCaller}></input>
                  </label>
                </div>
                {/* Double Calls */}
                <div
                  className="col padding-vertical-md"
                  data-visibility={
                    this.state.gameSettings.enableCaller ? "show" : "hide"
                  }>
                  <label
                    className={
                      this.state.gameSettings.doubleCall
                        ? "toggle checked"
                        : "toggle"
                    }>
                    <span className="toggle-span"></span>
                    <span>Double Call</span>
                    <input
                      type="checkbox"
                      data-gamemode="doubleCall"
                      onChange={this.handleCheckbox}
                      checked={this.state.gameSettings.doubleCall}></input>
                  </label>
                </div>
                {/* Chatty Caller */}
                <div
                  className="col padding-vertical-md"
                  data-visibility={
                    this.state.gameSettings.enableCaller ? "show" : "hide"
                  }>
                  <label
                    className={
                      this.state.gameSettings.chattyCaller
                        ? "toggle checked"
                        : "toggle"
                    }>
                    <span className="toggle-span"></span>
                    <span>Chatty Caller</span>
                    <input
                      type="checkbox"
                      data-gamemode="chattyCaller"
                      onChange={this.handleCheckbox}
                      checked={this.state.gameSettings.chattyCaller}></input>
                  </label>
                </div>
              </div>
              {/* Only shown if speech is DISABLED by the browser */}
              <div
                className="row no-wrap"
                data-visibility={_speechEnabled === true ? "hide" : "show"}>
                <div className="col padding-vertical-md">
                  Sorry, but your browser does not support the audible bingo
                  caller.
                </div>
              </div>
              {/* Caller Select */}
              <div
                className="col padding-vertical-md margin-bottom-md"
                data-visibility={
                  _speechEnabled === true &&
                  this.state.gameSettings.enableCaller === true
                    ? "show"
                    : "hide"
                }>
                <Select
                  className="select-input"
                  placeholder="Choose Caller"
                  menuPlacement="auto"
                  value={this.state.gameSettings.selectedCaller}
                  onChange={this.handleChooseCaller}
                  options={this.state.gameSettings.voiceOptions}
                />
              </div>

              {/* Audible Chime */}
              {/*  Enable Chime  */}
              <div className="col padding-vertical-md">
                <label
                  className={
                    this.state.gameSettings.chime ? "toggle checked" : "toggle"
                  }>
                  <span className="toggle-span"></span>
                  <span>Enable Audible Chime</span>
                  <input
                    type="checkbox"
                    data-gamemode="enableChime"
                    onChange={this.handleCheckbox}
                    checked={this.state.gameSettings.chime}></input>
                </label>
              </div>
              {/*  Chime Selection */}
              <div
                className="col padding-vertical-md margin-bottom-md"
                data-visibility={
                  this.state.gameSettings.chime ? "show" : "hide"
                }>
                <Select
                  className="select-input"
                  placeholder="Choose Chime"
                  menuPlacement="auto"
                  value={this.state.gameSettings.selectedChime}
                  onChange={this.handleChooseChime}
                  options={chimes}
                />
              </div>
            </div>

            {/* ----------- Mini Updates ------------- */}
            <div className="padding-vertical-md">
              <h4 className="margin-top-sm margin-bottom-md">Latest Updates</h4>
              <p className="wrap-text small-text">
                Let's Play Bingo was last updated on <strong>5/22/2022</strong>.
                Recent updates include:
              </p>
              <ul className="small-text padding-left-xlg">
                <li>
                  Added new{" "}
                  <a
                    href="https://90ball.letsplaybingo.io"
                    target="_blank"
                    rel="noreferrer">
                    90 Ball
                  </a>{" "}
                  game version!
                </li>
                <li>Added lots of new patterns!</li>
                <li>
                  Added a <a href="/patterns">page that shows all patterns</a>
                </li>
                <li>Added a way to "shuffle" the board just for fun!</li>
                <li>
                  Skip Unused Numbers: fixed 'N' numbers being called when only
                  the free space is marked in the pattern.
                </li>
              </ul>
              <p className="x-small-text">
                See the full{" "}
                <a
                  href="/releases"
                  className="plain">
                  Release Notes
                </a>
                !
              </p>
              <p className="x-small-text">
                Need to report a bug?{" "}
                <button
                  className="textOnly secondary"
                  onClick={this.handleBugReport}>
                  Email me!
                </button>
              </p>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default Settings;
