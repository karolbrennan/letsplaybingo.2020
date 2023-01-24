import React from "react";
/**
 * Countdown class
 * Renders a visual countdown display to the next automatic call
 * Props include:
 * delay - Integer, the delay between calls
 * call - Object, the current ball object
 * running - Boolean, indicates if the game is currently running
 */
class Countdown extends React.Component {
  constructor(props) {
    super(props);
    this.timer;
    this.state = { tick: props.delay, call: props.call };
  }
  componentDidUpdate() {
    clearInterval(this.timer);
    const props = this.props;
    if (props.running) {
      this.timer = setInterval(
        () =>
          this.setState({
            tick: this.state.tick - 1,
            call: props.call,
          }),
        1000
      );
    }
    if (props.call !== this.state.call) {
      this.setState({
        call: props.call,
        tick: props.delay,
      });
    }
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  render() {
    return (
      <div
        className={
          "countdown transparent-background" +
          (this.props.running ? " flashing" : "")
        }>
        <span className="uppercase-text-small">NEXT CALL IN</span>
        <br />
        <span className="tick">
          {this.props.running ? this.state.tick : "—"}
        </span>
        <br />
        <span className="uppercase-text-small">SECONDS</span>
      </div>
    );
  }
}

export default Countdown;
