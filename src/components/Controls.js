import React from "react";
import ReactDOM from "react-dom";
import { dispatchCustomEvent } from "../helpers/Utilities";
import CallInfo from "./CallInfo";
/**
 * Controls class
 * Renders a visual control panel for controlling the game
 * Properties include:
 * popout - Boolean representing whether popup controls should be enabled or not
 * settings - an object with all of the game settings
 * totalCalls - integer - number of calls already made
 * previousCall - Object - bingo ball object to pass to <CallInfo/>
 * automatic - boolean - indicates if automatic calling is on
 * running - boolean - indicates if the game is currently running
 */
class Controls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showResetModal: false,
      popupOpen: false,
    };
    this.containerEl = document.createElement("div");
    this.externalWindow = null;
  }

  componentDidMount() {
    document.addEventListener("handlereset", this.handleToggleResetModal);
    document.addEventListener("keydown", this.handleKeydown);
    this.openPopup();
  }

  componentWillUnmount() {
    document.removeEventListener("handlereset", this.handleToggleResetModal);
    document.removeEventListener("keydown", this.handleKeydown);
    this.closePopup();
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      // Props have changed.
      if (this.props.popout === true && this.state.popupOpen === false) {
        this.openPopup();
      }
      if (this.props.popout === false && this.state.popupOpen) {
        this.closePopup();
      }
    }
  }

  openPopup = () => {
    // If the popout is enabled...
    if (this.props.popout) {
      this.externalWindow = window.open(
        "",
        "",
        `scrollbars=no,resizable=yes,status=no,location=no,toolbar=no,menubar=no,width=500,height=330,left=0,top=0`
      );
      this.setState({ popupOpen: true });
      this.externalWindow.document.body.appendChild(this.containerEl);
      this.externalWindow.document.addEventListener(
        "handlereset",
        this.handleToggleResetModal
      );
      this.externalWindow.document.addEventListener(
        "keydown",
        this.handleKeydown
      );

      function copyStyles(src, dest) {
        Array.from(src.styleSheets).forEach((styleSheet) => {
          dest.head.appendChild(styleSheet.ownerNode.cloneNode(true));
        });
        Array.from(src.fonts).forEach((font) => dest.fonts.add(font));
      }
      copyStyles(window.document, this.externalWindow.document);
      window.addEventListener("beforeunload", this.closePopup);
      this.isInit = true;
    }
  };

  closePopup = () => {
    if (this.state.popupOpen === true) {
      this.externalWindow.close();
      this.setState({ popupOpen: false });
    }
  };

  handleClick = (event) => {
    if (event.currentTarget.value === "reset-game") {
      this.handleToggleResetModal();
    } else {
      dispatchCustomEvent("game-control", event.currentTarget.value);
    }
  };

  handleKeydown = (event) => {
    if (this.props.settings.keyboardControls) {
      const key = event.code;
      let params = this.props.totalCalls > 0 ? "call-number" : "new-game";
      switch (key) {
        case "Space":
          if (this.props.totalCalls > 0 && this.props.automatic) {
            params = this.props.running ? "pause-game" : "resume-game";
          }
          dispatchCustomEvent("game-control", params);
          break;
        case "ArrowRight":
          if (!this.props.running) {
            dispatchCustomEvent("game-control", params);
          }
          break;
        case "KeyR":
          this.handleToggleResetModal();
          break;
        case "Enter":
          if (this.state.showResetModal) {
            this.handleResetConfirmation();
          }
          break;
      }
    }
  };

  handleToggleResetModal = () => {
    // if the settings menu is open, no-scroll is on and we should not show the modal
    if (document.body.classList.contains("no-scroll")) {
      return false;
    }
    const newState = !this.state.showResetModal;
    this.setState({ showResetModal: newState });
  };

  handleResetConfirmation = () => {
    dispatchCustomEvent("game-control", "reset-game");
    this.handleToggleResetModal();
  };

  resetModal = () => {
    return this.state.showResetModal === true ? (
      <div>
        <div className="modal">
          <h2>Reset Game</h2>
          <p>
            Are you sure you want to reset the game?
            <br />
            <strong>This action cannot be undone.</strong>
          </p>
          <p className="text-center no-text-wrap">
            <button
              className="cancel-button"
              onClick={this.handleToggleResetModal}>
              Cancel
            </button>
            <button
              className="primary-button"
              onClick={this.handleResetConfirmation}>
              Confirm
            </button>
          </p>
        </div>
        <div className="modal-backdrop"></div>
      </div>
    ) : null;
  };

  get popoutControls() {
    return (
      <div className={`popout-controls controls ${this.props.settings.theme}`}>
        {this.resetModal()}
        <div>
          <h2 className="margin-bottom-xlg">Let's Play Bingo Controls</h2>
          <CallInfo
            totalCalls={this.props.totalCalls}
            previousCall={this.props.previousCall}
          />
          <div className="row align-center justify-center">
            <div className="col colspan4 button-col">
              {/* ----------- Start/Pause/Resume Button  ---------- */}
              {this.props.automatic && this.props.totalCalls > 0 ? (
                <button
                  className={
                    this.props.totalCalls > 0
                      ? "primary-button"
                      : "secondary-button"
                  }
                  value={this.props.running ? "pause-game" : "resume-game"}
                  onClick={this.handleClick}>
                  {this.props.running ? (
                    <div>pause</div>
                  ) : (
                    <div>
                      {this.props.totalCalls <= 1 ? "start autoplay" : "resume"}
                    </div>
                  )}
                </button>
              ) : (
                ""
              )}
            </div>
            <div className="col colspan4 button-col">
              {/* ----------- Call Button  ---------- */}
              {this.props.totalCalls > 0 ? (
                <button
                  className="secondary-button"
                  value="call-number"
                  disabled={this.props.automatic && this.props.running}
                  onClick={this.handleClick}>
                  <div>next number</div>
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="row align-center justify-center">
            <div className="col colspan8">
              {/* ----------- Start/Reset Button  ---------- */}
              <button
                className={
                  this.props.totalCalls > 0 ? "cancel-button" : "primary-button"
                }
                value={this.props.totalCalls > 0 ? "reset-game" : "new-game"}
                onClick={this.handleClick}>
                {this.props.totalCalls > 0 ? (
                  <div>reset board</div>
                ) : (
                  <div>start new game</div>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  get onScreenControls() {
    return (
      <div className="controls">
        {this.resetModal()}
        <div>
          <h2 className={this.props.popout ? "show" : "hide"}>
            Let's Play Bingo Controls
          </h2>
          {/* ----------- Start/Pause/Resume Button  ---------- */}
          {this.props.automatic && this.props.totalCalls > 0 ? (
            <button
              className={
                this.props.totalCalls > 0
                  ? "primary-button"
                  : "secondary-button"
              }
              value={this.props.running ? "pause-game" : "resume-game"}
              onClick={this.handleClick}>
              {this.props.running ? (
                <div>pause</div>
              ) : (
                <div>
                  {this.props.totalCalls <= 1 ? "start autoplay" : "resume"}
                </div>
              )}
            </button>
          ) : (
            ""
          )}
          {/* ----------- Call Button  ---------- */}
          {this.props.totalCalls > 0 ? (
            <button
              className="secondary-button"
              value="call-number"
              disabled={this.props.automatic && this.props.running}
              onClick={this.handleClick}>
              <div>next number</div>
            </button>
          ) : (
            ""
          )}

          {/* ----------- Start/Reset Button  ---------- */}
          <button
            className={
              this.props.totalCalls > 0 ? "cancel-button" : "primary-button"
            }
            value={this.props.totalCalls > 0 ? "reset-game" : "new-game"}
            onClick={this.handleClick}>
            {this.props.totalCalls > 0 ? (
              <div>reset board</div>
            ) : (
              <div>start new game</div>
            )}
          </button>
        </div>
      </div>
    );
  }

  render() {
    if (this.isInit) {
      return this.props.popout
        ? ReactDOM.createPortal(this.popoutControls, this.containerEl)
        : this.props.settings.hideControls
        ? null
        : this.onScreenControls;
    } else {
      return this.props.settings.hideControls ? null : this.onScreenControls;
    }
  }
}

export default Controls;
