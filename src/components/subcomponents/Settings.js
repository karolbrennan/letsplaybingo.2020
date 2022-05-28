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
let _voices;

class Settings extends React.Component {
  /* ------------- State Handlers ------------- */

  constructor(props) {
    super(props);

    this.handleSettingsPanelControl = props.settingsPanelControl;
    this.updatePropertiesOnParent = props.settingsUpdate;

    let gameSettings = JSON.parse(
      localStorage.getItem("letsplaybingo-settings")
    );
    this.state = {};

    if (gameSettings) {
      Object.keys(gameSettings).forEach((key) => {
        this.state[key] = gameSettings[key];
      });
    } else {
      this.state = props.gameSettings;
    }
    this.state.totalBallsCalled = props.totalBallsCalled;
    this.state.fullscreen = false;
    this.state.settingsPanelOpen = props.settingsPanelOpen;

    // if speech is enabled, initialize other speech properties
    if (!_voices && _speechEnabled === true) {
      _synth.onvoiceschanged = this.setUpVoices.bind(this);
    }
  }

  componentDidUpdate(props, state) {
    if (state.totalBallsCalled !== props.totalBallsCalled) {
      this.setState({
        totalBallsCalled: props.totalBallsCalled,
      });
    }
  }

  updateState(values) {
    let newState = { ...this.state };
    values.forEach((object) => {
      newState[object.property] = object.value;
    });
    this.setState({ ...newState });
    this.updatePropertiesOnParent(values);
  }

  /**
   * Returns the options for the voice selection menu
   *
   * @return  {Array}  Options array
   */
  setUpVoices() {
    let selectedCaller = this.state.selectedCaller;

    let userLanguage =
      window.navigator.userLanguage || window.navigator.language;
    if (!_voices) {
      _voices = _synth.getVoices();
    }
    let voiceOptions = [];
    if (_speechEnabled === true && _voices?.length > 0) {
      _voices.forEach((voice) => {
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
    this.updateState([
      { property: "voices", value: _voices },
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
    this.updateState([{ property: "delay", value: delay }]);
  };

  handleCheckbox = (event) => {
    let checked = event.currentTarget.checked;
    let gamemode = event.currentTarget.dataset.gamemode;
    this.updateState([{ property: gamemode, value: checked }]);
  };

  /*
   *  Choose Caller Function
   *  This sets the selected caller
   */
  handleChooseCaller = (caller) => {
    this.updateState([{ property: "selectedCaller", value: caller }]);
    let msg = new SpeechSynthesisUtterance();
    msg.text = "Let's Play Bingo!";
    msg.volume = 1;
    _voices.forEach((voice) => {
      if (voice.name === caller.value) {
        msg.voice = voice;
      }
    });
    _synth.speak(msg);
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
    this.updateState([{ property: "selectedChime", value: event }]);
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
          <div className="settings-panel">
            {/* ----------- Game Settings ---------- */}
            <h3 className="margin-top-none margin-bottom-xlg">
              Game Settings
              {this.settingsButton}
            </h3>

            <section className="game-settings">
              {/* Full Screen */}
              <div className="padding-vertical-md">
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

              {/* Skip Unused Numbers - disabled if totalBallsCalled > 0 */}
              <div
                className="padding-vertical-md"
                data-disabled={this.state.totalBallsCalled > 0}>
                <label
                  className={
                    this.state.skipUnused ? "toggle checked" : "toggle"
                  }>
                  <span className="toggle-span"></span>
                  <span>Skip Unused Numbers</span>
                  <input
                    type="checkbox"
                    data-gamemode="skipUnused"
                    onChange={this.handleCheckbox}
                    checked={this.state.skipUnused}></input>
                </label>
              </div>

              {/* Game Mode Settings */}
              <div className="margin-vertical-xlg">
                <h4 className="margin-top-md margin-bottom-none">Game Modes</h4>

                {/* Manual Mode */}
                <div
                  className="padding-vertical-md"
                  data-disabled={this.state.totalBallsCalled > 0}>
                  <label
                    className={
                      this.state.manualMode ? "toggle checked" : "toggle"
                    }>
                    <span className="toggle-span"></span>
                    <span>Manual Calling Mode</span>
                    <input
                      type="checkbox"
                      data-gamemode="manualMode"
                      onChange={this.handleCheckbox}
                      checked={this.state.manualMode}></input>
                  </label>
                </div>

                {/* Wild Bingo Settings */}
                <div
                  className="padding-vertical-md"
                  data-disabled={this.state.totalBallsCalled > 0}>
                  <div className="padding-bottom-sm">
                    <label
                      className={
                        this.state.wildBingo ? "toggle checked" : "toggle"
                      }>
                      <span className="toggle-span"></span>
                      <span>Enable Wild Bingo</span>
                      <input
                        type="checkbox"
                        data-gamemode="wildBingo"
                        onChange={this.handleCheckbox}
                        checked={this.state.wildBingo}></input>
                    </label>
                  </div>
                  <div data-disabled={!this.state.wildBingo}>
                    <label
                      className={
                        this.state.evensOdds ? "toggle checked" : "toggle"
                      }>
                      <span className="toggle-span"></span>
                      <span>Evens/Odds Mode</span>
                      <input
                        type="checkbox"
                        data-gamemode="evensOdds"
                        onChange={this.handleCheckbox}
                        checked={this.state.evensOdds}></input>
                    </label>
                  </div>
                </div>
              </div>

              {/* Autoplay Settings */}
              <div className="margin-vertical-xlg">
                <h4 className="margin-top-md margin-bottom-none">
                  Autoplay Settings
                </h4>

                {/* Enable Autoplay */}
                <div className="padding-vertical-md">
                  <label
                    className={
                      this.state.autoplay ? "toggle checked" : "toggle"
                    }>
                    <span className="toggle-span"></span>
                    <span>Enable Autoplay</span>
                    <input
                      type="checkbox"
                      data-gamemode="autoplay"
                      onChange={this.handleCheckbox}
                      checked={this.state.autoplay}></input>
                  </label>
                </div>

                {/* Autoplay Speed */}
                <div className="padding-vertical-md">
                  <h6>Autoplay Speed</h6>
                  <div className="align-center slider margin-bottom-lg">
                    <Slider
                      min={3500}
                      max={30000}
                      step={500}
                      value={this.state.delay}
                      onChange={this.handleDelayChange}
                      reverse={true}
                    />
                  </div>
                </div>
              </div>

              {/* Audio Settings */}
              <div className="margin-vertical-xlg">
                <h4 className="margin-top-md margin-bottom-none">
                  Audio Settings
                </h4>

                {/* Caller Enabler */}
                {/* Only shown if speech is enabled by the browser */}
                <div
                  data-visibility={_speechEnabled === true ? "show" : "hide"}>
                  {/* Enable Caller */}
                  <div className="padding-vertical-md">
                    <label
                      className={
                        this.state.enableCaller ? "toggle checked" : "toggle"
                      }>
                      <span className="toggle-span"></span>
                      <span>Enable Bingo Caller</span>
                      <input
                        type="checkbox"
                        data-gamemode="enableCaller"
                        onChange={this.handleCheckbox}
                        checked={this.state.enableCaller}></input>
                    </label>
                  </div>

                  {/* Caller Select */}
                  <div
                    className="padding-vertical-md"
                    data-visibility={
                      this.state.enableCaller === true ? "show" : "hide"
                    }>
                    <h6>Caller Selection</h6>
                    <Select
                      className="select-input"
                      placeholder="Choose Caller"
                      menuPlacement="auto"
                      value={this.state.selectedCaller}
                      onChange={this.handleChooseCaller}
                      options={this.state.voiceOptions}
                    />
                  </div>
                  {/* Double Calls */}
                  <div
                    className="padding-vertical-md"
                    data-visibility={this.state.enableCaller ? "show" : "hide"}>
                    <label
                      className={
                        this.state.doubleCall ? "toggle checked" : "toggle"
                      }>
                      <span className="toggle-span"></span>
                      <span>Call Numbers Twice</span>
                      <input
                        type="checkbox"
                        data-gamemode="doubleCall"
                        onChange={this.handleCheckbox}
                        checked={this.state.doubleCall}></input>
                    </label>
                  </div>
                  {/* Chatty Caller */}
                  <div
                    className="padding-vertical-md"
                    data-visibility={this.state.enableCaller ? "show" : "hide"}>
                    <label
                      className={
                        this.state.chattyCaller ? "toggle checked" : "toggle"
                      }>
                      <span className="toggle-span"></span>
                      <span>Chatty Caller</span>
                      <input
                        type="checkbox"
                        data-gamemode="chattyCaller"
                        onChange={this.handleCheckbox}
                        checked={this.state.chattyCaller}></input>
                    </label>
                  </div>
                </div>

                {/* Only shown if speech is DISABLED by the browser */}
                <div
                  className="padding-vertical-md"
                  data-visibility={_speechEnabled === true ? "hide" : "show"}>
                  Sorry, but your browser does not support the audible bingo
                  caller.
                </div>

                {/* Audible Chime */}
                {/*  Enable Chime  */}
                <div className="padding-vertical-md">
                  <label
                    className={this.state.chime ? "toggle checked" : "toggle"}>
                    <span className="toggle-span"></span>
                    <span>Enable Audible Chime</span>
                    <input
                      type="checkbox"
                      data-gamemode="chime"
                      onChange={this.handleCheckbox}
                      checked={this.state.chime}></input>
                  </label>
                </div>
                {/*  Chime Selection */}
                <div
                  className="padding-vertical-md"
                  data-visibility={this.state.chime ? "show" : "hide"}>
                  <h6>Chime Selection</h6>
                  <Select
                    className="select-input"
                    placeholder="Choose Chime"
                    menuPlacement="auto"
                    value={this.state.selectedChime}
                    onChange={this.handleChooseChime}
                    options={chimes}
                  />
                </div>
              </div>

              {/* ----------- Note ------------- */}
              <div className="padding-vertical-md">
                <p className="x-small-text dk-gray-text">
                  <strong>Note: </strong>
                  <em>
                    Some settings are disabled when a game is in play or
                    depending on other settings to prevent any unwanted
                    behavior. Come back after you reset the game to re-enable
                    all settings.
                  </em>
                </p>
              </div>

              {/* ----------- Mini Updates ------------- */}
              <div className="padding-vertical-md">
                <h4 className="margin-top-sm margin-bottom-md">
                  Latest Updates
                </h4>
                <p className="wrap-text small-text">
                  Let's Play Bingo was last updated on{" "}
                  <strong>5/22/2022</strong>. Recent updates include:
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
                    Skip Unused Numbers: fixed 'N' numbers being called when
                    only the free space is marked in the pattern.
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
          <div
            className="backdrop"
            onClick={this.toggleSettingsPanel}></div>
        </div>
      </div>
    );
  }
}

export default Settings;
