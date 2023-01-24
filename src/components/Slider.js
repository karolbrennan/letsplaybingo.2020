import React from "react";
import { dispatchCustomEvent } from "../helpers/Utilities";
import HelperText from "./HelperText";

/**
 * Slider class
 * Renders a custom slider element
 *
 * Properties include:
 * eventName - string, the custom event name that will be fired upon selection
 * heading - string, the heading above the slider
 * info - string, info text displayed in <HelperText /> if present
 * label - string, the label of the input
 * measurement - string, the unit of measurement
 * measurementplural - string, the plural version of the measurement unit
 * min - integer, the minimum value
 * max - integer, the maximum value
 * name - string, the name of the input
 * show - boolean, indicates if the select should display
 * step - integer, the value by which we can increase/decrease
 * value - string, the value that's currently selected
 */
class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
  }

  componentDidUpdate(prevState) {
    if (JSON.stringify(prevState) !== JSON.stringify(this.props)) {
      this.setState({ ...this.props });
    }
  }

  handleChange = (event) => {
    let newValue = parseInt(event.currentTarget.value);
    this.setState({ value: newValue });
    this.sendUpdate(newValue);
  };

  handleStep = (event) => {
    const operation = event.currentTarget.value;
    let newVal = parseInt(this.state.value);
    const step = parseInt(this.props.step);
    if (operation === "decrease" && newVal - step >= this.props.min) {
      newVal = newVal - step;
    }
    if (operation === "increase" && newVal + step <= this.props.max) {
      newVal = newVal + step;
    }
    this.setState({ value: newVal });
    this.sendUpdate(newVal);
  };

  sendUpdate = (value) => {
    let settingInfo = {};
    settingInfo.property = this.props.name;
    settingInfo.value = value;
    dispatchCustomEvent(this.props.eventName, settingInfo);
  };

  getHelperText = () => {
    return this.props.info ? <HelperText text={this.props.info} /> : null;
  };

  render() {
    if (
      !Object.prototype.hasOwnProperty.call(this.props, "show") ||
      this.props.show === true
    ) {
      return (
        <div className="setting-inner">
          {this.props.heading ? <h5>{this.props.heading}</h5> : null}
          <label className="range">
            <label>
              <span className="label-text">{this.props.label}</span>
              {this.getHelperText()}
              <div className="range-value">
                {this.state.value}{" "}
                {this.state.value === 1
                  ? this.props.measurement
                  : this.props.measurementplural}
              </div>
            </label>
            <div className="range-controls">
              <div className="range-buttons">
                <div>
                  <button
                    value="decrease"
                    disabled={
                      this.props.min
                        ? this.state.value === parseInt(this.props.min)
                        : false
                    }
                    onClick={this.handleStep}>
                    <i className="fi fi-br-minus-small" />
                  </button>
                </div>
                <div className="range-input">
                  <input
                    type="range"
                    id={this.props.name}
                    name={this.props.name}
                    min={this.props.min}
                    max={this.props.max}
                    step={this.props.step}
                    value={this.state.value}
                    onChange={this.handleChange}
                  />
                </div>
                <div>
                  <button
                    value="increase"
                    disabled={
                      this.props.max
                        ? this.state.value === parseInt(this.props.max)
                        : false
                    }
                    onClick={this.handleStep}>
                    <i className="fi  fi-br-plus-small" />
                  </button>
                </div>
              </div>
            </div>
          </label>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Slider;
