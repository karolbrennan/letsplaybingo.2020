import React from "react";
import Toggle from "./Toggle";
import Select from "./Select";
import Slider from "./Slider";
import CurrentPattern from "./CurrentPattern";
import MiniUpdates from "./MiniUpdates";
import HelperText from "./HelperText";

// Utilites
import {
  dispatchCustomEvent,
  getChimeOptions,
  getThemeOptions,
  getLayoutOptions,
} from "../helpers/Utilities";
import { getPatternInfo } from "../helpers/PresetPatterns";

const chimes = getChimeOptions();
const themes = getThemeOptions();
const layouts = getLayoutOptions();

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      settingsPanelOpen: false,
      settings: { ...this.props.settings },
    };
    this.callers = [];
  }

  componentDidMount() {
    document.addEventListener("loadcallers", this.handleCallersLoad);
    document.addEventListener("menu-open", () => {
      this.setState({ settingsPanelOpen: false });
    });
    document.addEventListener("patternupdate", this.handlePatternChange);
    document.addEventListener("settingupdate", this.handleSettingChange);
    document.addEventListener("togglesettingspanel", this.toggleSettingsPanel);
  }

  componentWillUnmount() {
    document.removeEventListener("loadcallers", this.handleCallersLoad);
    document.removeEventListener("menu-open", () => {
      this.setState({ settingsPanelOpen: false });
    });
    document.removeEventListener("patternupdate", this.handlePatternChange);
    document.removeEventListener("settingupdate", this.handleSettingChange);
    document.removeEventListener(
      "togglesettingspanel",
      this.toggleSettingsPanel
    );
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      this.setState({ settings: this.props.settings });
    }
  }

  handleCallersLoad = (event) => {
    this.callers = event.detail;
  };

  handlePatternChange = (event) => {
    let settings = { ...this.state.settings };
    if (typeof event.detail === "string") {
      settings.pattern = getPatternInfo(event.detail);
    } else {
      settings.pattern = event.detail;
    }
    this.setState({ settings: settings });
  };

  handleSettingChange = (setting) => {
    let settings = { ...this.state.settings };
    settings[setting.detail.property] = setting.detail.value;
    if (
      setting.detail.property === "popOutControls" &&
      setting.detail.value === true
    ) {
      // if popOutControls get enabled, we must hide controls too
      settings.popOutControls = true;
      settings.hideControls = true;
    }
    this.setState({ settings: settings });

    if (setting.detail.property === "caller") {
      dispatchCustomEvent("test-speech", {
        message: "Let's Play Bingo!",
        voice: setting.detail.value,
      });
    }

    if (setting.detail.property === "chime") {
      let chimeTest = new Audio(setting.detail.value);
      chimeTest.play();
    }
  };

  toggleSettingsPanel = () => {
    document.body.classList.toggle("no-scroll");
    let newState = !this.state.settingsPanelOpen;
    if (newState === false) {
      this.handleSave(); // save settings
    } else {
      dispatchCustomEvent("pause-game", "pause-game");
    }
    dispatchCustomEvent("settingspanel-open", newState);
    this.setState({ settingsPanelOpen: newState });
  };

  handleSave = () => {
    document.body.classList.remove("no-scroll");
    let stateObj = { ...this.state.settings };
    // remove unnecessary elements
    delete stateObj.settingsPanelOpen;
    // send out settingssaved event
    dispatchCustomEvent("settingssaved", stateObj);
    stateObj.settingsPanelOpen = false; // ensure we close the panel
    this.setState(stateObj);
  };

  get settingsPanelClasses() {
    return this.state.settingsPanelOpen === true
      ? "settings-panel open"
      : "settings-panel closed";
  }

  render() {
    return (
      <div tabIndex="-1">
        <div
          tabIndex="-1"
          className={this.settingsPanelClasses}>
          <div
            tabIndex="-1"
            className="backdrop"
            onClick={this.toggleSettingsPanel}></div>
          <div className="inner-panel">
            {/* ---------------------- Header ------------------- */}
            <h2 className="margin-bottom-none">
              Settings
              <button
                className="icon-button close-button"
                onClick={this.toggleSettingsPanel}>
                <i className="fi fi-br-cross" />
              </button>
            </h2>
            <div className="padding-horizontal-xlg">
              <p className="x-small-text">
                Some settings are disabled when a game is running and/or certain
                settings are enabled. Hover over the tooltip
                <HelperText text="The tool tip will display more info about the setting." />{" "}
                next to the setting for details.
                <br />
                <br />
                <em>
                  * Settings will be auto-saved when you close the settings
                  panel.
                </em>
              </p>
            </div>

            {/* ----------------- Caller Settings ----------------- */}
            <div className="setting-group">
              <h4>Board/Caller Settings</h4>
              <Toggle
                disabled={
                  this.props.totalCalls > 0 || this.state.settings.wildBingo
                }
                eventName="settingupdate"
                info={
                  this.props.totalCalls > 0
                    ? "You must reset the game before changing this setting."
                    : this.state.settings.wildBingo
                    ? "Manual mode is not available when wild bingo is on."
                    : "Manual mode allows you to use the board as a display board only. Great for if you're using a physical ball cage or machine."
                }
                label="Manual Mode"
                name="manual"
                value={this.state.settings.manual}
              />

              <Toggle
                disabled={this.state.settings.manual}
                eventName="settingupdate"
                info={
                  this.state.settings.manual
                    ? "Not available when manual mode is on"
                    : null
                }
                label="Automatic Calling"
                name="automaticCalling"
                value={this.state.settings.automaticCalling}
              />
              <Slider
                show={this.state.settings.automaticCalling}
                eventName="settingupdate"
                label="Time Between Calls"
                name="delay"
                measurement="second"
                measurementplural="seconds"
                min="1"
                max="60"
                step="1"
                value={this.state.settings.delay}
              />
            </div>
            <div className="setting-group">
              {/* ----------------- Audio Settings ----------------- */}
              <h4>Audio Settings</h4>
              <Toggle
                eventName="settingupdate"
                label="Audible Caller"
                name="audibleCaller"
                value={this.state.settings.audibleCaller}
              />
              <Select
                show={
                  this.state.settings.audibleCaller === true &&
                  this.callers.length > 0
                }
                eventName="settingupdate"
                id="callerSelect"
                disabled={this.state.settings.audibleCaller === false}
                label="Caller Selection"
                name="caller"
                options={this.callers}
                value={this.state.settings.caller}
              />
              <Toggle
                eventName="settingupdate"
                info="Adds additional vocalization such as 'Let's Play Bingo!' at the start of a new game."
                label="Chatty Caller"
                name="chattyCaller"
                show={this.state.settings.audibleCaller === true}
                value={this.state.settings.chattyCaller}
              />
              <Toggle
                show={this.state.settings.audibleCaller === true}
                eventName="settingupdate"
                info="Calls the numbers again individually after the initial call. Example: B12, B: 1, 2."
                label="Call Numbers Twice"
                name="doubleCall"
                value={this.state.settings.doubleCall}
              />
              <Toggle
                eventName="settingupdate"
                label="Play Audible Chime"
                name="audibleChime"
                value={this.state.settings.audibleChime}
              />
              <Select
                show={this.state.settings.audibleChime === true}
                eventName="settingupdate"
                id="chimeSelect"
                label="Chime Selection"
                name="chime"
                options={chimes}
                value={this.state.settings.chime}
              />
            </div>
            {/* ----------------- Game Settings ----------------- */}
            <div className="setting-group">
              <h4>Game Settings</h4>
              <Toggle
                disabled={
                  this.props.totalCalls > 0 || this.state.settings.manual
                }
                eventName="settingupdate"
                info={
                  this.props.totalCalls > 0
                    ? "You must reset the game before changing this setting."
                    : this.state.settings.manual
                    ? "Wild Bingo is not available when manual mode is on."
                    : "Wild Bingo is when the first number called is wild: you'll daub every number ending in the same number the wild ball ends with. Example: N32 is the wild ball, daub every number ending in 2."
                }
                label="Wild Bingo"
                name="wildBingo"
                value={this.state.settings.wildBingo}
              />
              <Toggle
                show={this.state.settings.wildBingo}
                eventName="settingupdate"
                disabled={
                  this.props.totalCalls > 0 ||
                  this.state.settings.wildBingoEvens ||
                  this.state.settings.wildBingoOdds ||
                  this.state.settings.wildBingoCustom
                }
                info="Two wild balls will be called at the start of the game."
                label="Wild Bingo: Two Wilds"
                name="wildBingoDouble"
                value={this.state.settings.wildBingoDouble}
              />
              <Toggle
                show={this.state.settings.wildBingo}
                eventName="settingupdate"
                disabled={
                  this.props.totalCalls > 0 ||
                  this.state.settings.wildBingoDouble ||
                  this.state.settings.wildBingoOdds ||
                  this.state.settings.wildBingoCustom
                }
                info="All even numbers will be called at the start of the game."
                label="Wild Bingo: Evens"
                name="wildBingoEvens"
                value={this.state.settings.wildBingoEvens}
              />
              <Toggle
                show={this.state.settings.wildBingo}
                disabled={
                  this.props.totalCalls > 0 ||
                  this.state.settings.wildBingoEvens ||
                  this.state.settings.wildBingoDouble ||
                  this.state.settings.wildBingoCustom
                }
                eventName="settingupdate"
                info="All odd numbers will be called at the start of the game."
                label="Wild Bingo: Odds"
                name="wildBingoOdds"
                value={this.state.settings.wildBingoOdds}
              />
              <Toggle
                show={this.state.settings.wildBingo}
                disabled={
                  this.props.totalCalls > 0 ||
                  this.state.settings.wildBingoEvens ||
                  this.state.settings.wildBingoOdds ||
                  this.state.settings.wildBingoDouble
                }
                eventName="settingupdate"
                info="Choose which number you want to be while. 10 will be all numbers ending in 0."
                label="Wild Bingo: Custom"
                name="wildBingoCustom"
                value={this.state.settings.wildBingoCustom}
              />
              <Slider
                show={this.state.settings.wildBingoCustom === true}
                eventName="settingupdate"
                label="Wild Bingo: Custom"
                name="wildBingoCustomValue"
                measurement=""
                measurementplural=""
                min="1"
                max="10"
                step="1"
                value={this.state.settings.wildBingoCustomValue}
              />
              <CurrentPattern
                disabled={this.props.totalCalls > 0}
                pattern={this.state.settings.pattern}
                showSelect={true}
                showTitle={false}
              />
              <Toggle
                disabled={this.state.settings.manual}
                eventName="settingupdate"
                info={
                  this.state.settings.manual
                    ? "Not available when manual mode is on"
                    : "When selected, the caller will not call unused numbers in the selected pattern. The numbers will still be marked as called in the board."
                }
                label="Skip Unused Numbers"
                name="skipUnusedNumbers"
                value={this.state.settings.skipUnusedNumbers}
              />
            </div>
            {/* ----------------- Controls ----------------- */}
            <div className="setting-group">
              <h4>Game Controls</h4>
              <Toggle
                eventName="settingupdate"
                info="Ensure you have keyboard controls or the pop out control panel enabled so you will be able to control the game. If the pop out control panel is enabled, this is enabled automatically."
                label="Hide On Screen Controls"
                name="hideControls"
                value={this.state.settings.hideControls}
              />
              <Toggle
                eventName="settingupdate"
                info="Opens a small window that contains the game controls. If pop out controls are enabled, on screen controls are hidden automatically."
                label="Pop Out Control Panel"
                name="popOutControls"
                value={this.state.settings.popOutControls}
              />
              <Toggle
                eventName="settingupdate"
                info={
                  this.state.settings.manual
                    ? "Keyboard controls are disabled if manual mode is on."
                    : "This setting enables controling game play with the keyboard. Great to use in combination with Hide On Screen Controls."
                }
                disabled={this.state.settings.manual}
                label="Keyboard Controls"
                name="keyboardControls"
                value={this.state.settings.keyboardControls}
              />
              <div
                className={
                  this.state.settings.keyboardControls
                    ? "show detail-box"
                    : "hide"
                }>
                <code>Spacebar</code> pause/resume game
                <br />
                <code>Right Arrow</code> next ball
                <br />
                <code>R</code> reset game (press <code>Enter</code> to confirm)
                <br />
              </div>
            </div>
            {/* ----------------- Visual Settings ----------------- */}
            <div className="setting-group">
              <h4>Visual Settings</h4>
              <Toggle
                eventName="settingupdate"
                info="Fullscreen will take effect when this panel is closed."
                label="Display in Fullscreen"
                name="fullscreen"
                value={this.state.settings.fullscreen}
              />
              <Toggle
                eventName="settingupdate"
                label="Hide Footer"
                name="hideFooter"
                value={this.state.settings.hideFooter}
              />
              <Toggle
                disabled={!this.state.settings.automaticCalling}
                eventName="settingupdate"
                info="You must have automatic calling enabled to use this."
                label="Show Next Call Countdown"
                name="showCountdown"
                value={this.state.settings.showCountdown}
              />
              <Toggle
                eventName="settingupdate"
                label="Show Current Call"
                name="showCurrentCall"
                value={this.state.settings.showCurrentCall}
              />
              <Toggle
                eventName="settingupdate"
                label="Show Previous Calls"
                name="showPreviousCalls"
                value={this.state.settings.showPreviousCalls}
              />
              <Slider
                show={this.state.settings.showPreviousCalls === true}
                eventName="settingupdate"
                label="Number of Previous Calls To Show"
                name="previousCallsToShow"
                measurement="call"
                measurementplural="calls"
                min="1"
                max="5"
                step="1"
                value={this.state.settings.previousCallsToShow}
              />
              <Select
                show={true}
                defaultValue="lpb"
                eventName="settingupdate"
                id="themeSelect"
                label="Theme"
                name="theme"
                options={themes}
                value={this.state.settings.theme}
              />
              <Select
                show={true}
                defaultValue="classic"
                eventName="settingupdate"
                id="layoutSelect"
                label="Layout"
                name="layout"
                options={layouts}
                value={this.state.settings.layout}
              />
            </div>
            {/* ----------------- Foot Notes ----------------- */}
            <div className="padding-vertical-md padding-horizontal-xlg">
              <MiniUpdates gamedata={this.state} />
            </div>
            <div className="padding-vertical-md padding-horizontal-xlg">
              <p className="x-small-text">
                Love <span className="notranslate">Let's Play Bingo</span>? Tell
                your friends!
              </p>
              <div className="addthis_inline_share_toolbox margin-top-sm"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Settings;
