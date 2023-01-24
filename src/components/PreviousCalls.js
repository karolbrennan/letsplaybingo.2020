import React from "react";
import BallDisplay from "./BallDisplay";
import { getLogo } from "../helpers/Utilities";

/**
 * PreviousCalls class
 * Renders a visual display of the previous calls
 * Props include:
 * balls - Array, contains ball objects
 * numToShow - Integer, how many previous calls to show, 1-5
 */
class PreviousCalls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }
  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  get modal() {
    return this.state.showModal ? (
      <div>
        <div className="modal large-modal">
          <h2>Call History</h2>
          <p>Check out the previous calls from most recent to oldest.</p>
          <div className="row maintain-gutters ball-history justify-start">
            {this.props.balls.reverse().map((ball, index) => {
              return (
                <div
                  className="col shrink padding-md"
                  key={ball.number}>
                  <BallDisplay
                    ball={ball}
                    currentCall={false}
                  />
                </div>
              );
            })}
          </div>
          <p>
            <button
              className="primary-button"
              onClick={this.toggleModal}>
              Close
            </button>
          </p>
        </div>
        <div
          className="modal-backdrop"
          onClick={this.toggleModal}></div>
      </div>
    ) : null;
  }

  get previousCallsLabel() {
    let prevCallNum =
      this.props.balls.length > this.props.numToShow + 1
        ? this.props.numToShow
        : this.props.balls.length - 1;
    let prevCallString = `Previous ${
      this.props.balls.length === 2 ? "Call" : prevCallNum + " Calls"
    }`;

    if (this.props.balls.length > 1) {
      return (
        <div className="row">
          <div className="col grow">
            <h2 className="uppercase-text-small">
              {prevCallString}{" "}
              <button
                className="text-button"
                onClick={this.toggleModal}>
                show history
              </button>
            </h2>
          </div>
        </div>
      );
    } else {
      return "";
    }
  }

  render() {
    const balls = [...this.props.balls].reverse();
    let displayBalls = balls.slice(1, this.props.numToShow + 1);
    if (displayBalls.length > 0) {
      return (
        <div>
          {this.modal}
          <div className="previous-call-block transparent-background">
            <div
              className={`row maintain-gutters align-end justify-center show-${this.props.numToShow}`}>
              {displayBalls.map((ball, index) => {
                return (
                  <div
                    className="col shrink padding-sm"
                    key={ball.number}>
                    <BallDisplay
                      ball={ball}
                      currentCall={false}
                    />
                  </div>
                );
              })}
            </div>
            <div className="row align-end justify-center">
              {this.previousCallsLabel}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="previous-call-block transparent-background no-calls">
          <div className="row justify-center align-center">
            <div className="col grow padding-sm">
              <div className={balls.length === 1 ? "show" : "hide"}>
                {getLogo()}
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default PreviousCalls;
