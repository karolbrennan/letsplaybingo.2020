/*
 *  Full History Class
 *  Karol Brennan
 *  3.26.2022
 *  This class is used to display the full history of the called balls
 */
import React from "react";

class CallHistory extends React.Component {
  /**
   * Constructor for this class
   *
   * @param   {Object}  props  props from the calling component
   */
  constructor(props) {
    super(props);
    this.state = {
      showFullCallHistory: false,
    };
  }

  /**
   * Full history modal display
   *
   * @return  {[JSX]}  Return modal or empty div
   */
  get fullHistoryDisplay() {
    const ballHistory = [...this.props.calledBalls].reverse();
    if (this.state.showFullCallHistory === true) {
      return (
        <div>
          <div className="modal">
            <h4 className="margin-md">Full Call History</h4>
            <div className="x-small-text margin-bottom-lg">
              Most recent call listed first, left to right, top to bottom.
            </div>
            <div className="previous-calls notranslate">
              {ballHistory.map((call) => {
                return (
                  <div
                    key={call.number}
                    className={call.color}>
                    <span>
                      <span className="call-letter">{call.letter}</span>
                      <span className="call-number">{call.number}</span>
                    </span>
                  </div>
                );
              })}
            </div>
            <p>
              <button
                className="primary-button"
                onClick={() => {
                  this.setState({ showFullCallHistory: false });
                }}>
                Close
              </button>
            </p>
          </div>
          <div
            className="modal-backdrop"
            onClick={(e) => {
              e.preventDefault();
            }}></div>
        </div>
      );
    } else {
      return null;
    }
  }

  /**
   * Displays the wild ball if applicable
   *
   * @return  {[type]}  [return description]
   */
  get wildBallDisplay() {
    if (!this.props.wildBall) {
      return null;
    } else {
      const wildBall = this.props.wildBall;
      return (
        <div className="no-text-wrap">
          <p className="uppercase condensed-text margin-none padding-right-xlg small-text white-text">
            <strong>Wild Ball</strong>
          </p>
          <div className={wildBall.color + " text-center notranslate"}>
            <span>
              <span className="call-letter">{wildBall.letter}</span>
              <span className="call-number">{wildBall.number}</span>
            </span>
          </div>
        </div>
      );
    }
  }

  /**
   *  Shows a list of the last 5 balls called
   *
   * @return  {[JSX]}  Div that contains a list of 5 most recent calls
   */
  get previousCallListDisplay() {
    if (this.props.calledBalls.length > 0) {
      const previousCallList = [...this.props.calledBalls];
      let lastCalls = previousCallList.reverse().slice(1, 6);
      if (lastCalls.length > 0) {
        return (
          <div className="row align-center">
            <div className="col grow previous-calls notranslate">
              <p className="uppercase condensed-text margin-none padding-right-xlg small-text white-text">
                <strong>Last {lastCalls.length} Calls</strong>
              </p>
              {lastCalls.map((call) => {
                return (
                  <div
                    key={call.number}
                    className={call.color + " text-center"}>
                    <span>
                      <span className="call-letter">{call.letter}</span>
                      <span className="call-number">{call.number}</span>
                    </span>
                  </div>
                );
              })}
              <button
                className="text-only margin-horizontal-xlg x-small-text"
                onClick={() => {
                  this.setState({ showFullCallHistory: true });
                }}>
                show full history
              </button>
            </div>
            <div
              data-visibility={!this.props.wildBall ? "hide" : "show"}
              className="col shrink previous-calls text-right">
              {this.wildBallDisplay}
            </div>
            {this.fullHistoryDisplay}
          </div>
        );
      } else {
        return <div></div>;
      }
    } else {
      return <div></div>;
    }
  }

  /**
   * Renders the previous call list display
   *
   * @return  {Mixed}  could be null if no balls called
   */
  render() {
    if (this.props.calledBalls.length > 1) {
      return (
        <div className="margin-vertical-md">{this.previousCallListDisplay}</div>
      );
    } else {
      return null;
    }
  }
}

export default CallHistory;
