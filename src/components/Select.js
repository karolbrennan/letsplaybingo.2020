import React from "react";
import { dispatchCustomEvent } from "../helpers/Utilities";
import HelperText from "./HelperText";

/**
 * Select class
 * Renders a dropdown select element
 *
 * Properties include:
 * defaultValue - string, the default value that should be selected on load or on reset
 * disabled - boolean, indicates if the select should be disabled
 * eventName - string, the custom event name that will be fired upon selection
 * handler - function, the function that should be called back to the parent
 * id - string, the ID of the input
 * info - string, info text displayed in <HelperText /> if present
 * label - string, the label of the input
 * name - string, the name of the input
 * options - array, list of objects representing potential values {label, value}
 * show - boolean, indicates if the select should display
 * value - string, the value that's currently selected
 */
class Select extends React.Component {
  constructor(props) {
    super(props);
    let startingValue = props.value ? this.getOptionLabel(props.value) : "";
    this.state = {
      open: false,
      searchTerm: "",
      value: startingValue,
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      this.setState({ ...this.props });
    }
  }

  getOptionLabel = (value) => {
    if (value === "blank") {
      return "Select One";
    }
    for (let i = 0; i < this.props.options.length; i++) {
      if (this.props.options[i].value === value) {
        return this.props.options[i].label;
      }
    }
    return value;
  };

  handleInput = (event) => {
    this.setState({
      searchTerm: event.currentTarget.value,
      open: true,
    });
  };

  handleSelect = (event) => {
    const _this = this;
    const value = event.currentTarget.value;
    this.dispatchSettingEvent(value);

    if (this.props.handler) {
      this.props.handler(value);
    }

    const options = this.props.options;
    Object.keys(options).forEach((key) => {
      if (options[key].value === value) {
        _this.setState({
          value: options[key].label,
          searchTerm: "",
          open: false,
        });
      }
    });
  };

  clearInput() {
    this.setState({ open: false, searchTerm: "", value: "" });
  }

  dispatchSettingEvent = (value) => {
    let settingInfo = {};
    settingInfo.property = this.props.name;
    settingInfo.value = value;
    dispatchCustomEvent(this.props.eventName, settingInfo);
  };

  handleReset() {
    let value = "";
    if (this.props.defaultValue) {
      value = this.props.defaultValue;
    }
    if (this.props.handler) {
      this.props.handler(value);
    }
    this.setState({ open: false, searchTerm: "", value: value });
    this.dispatchSettingEvent(value);
  }

  toggleDropdown() {
    const newState = !this.state.open;
    if (newState === true) {
      const selector = "#" + this.props.id;
      document.querySelector(selector).focus();
    }
    this.setState({ open: newState });
  }

  closeDropdown() {
    this.setState({ open: false });
  }

  getHelperText = () => {
    return this.props.info ? <HelperText text={this.props.info} /> : null;
  };

  get options() {
    let options = [];
    const searchTerm = this.state.searchTerm.toLowerCase();
    if (searchTerm.length >= 2) {
      this.props.options.forEach((option) => {
        if (
          option.label.toLowerCase().includes(searchTerm) ||
          option.value.toLowerCase().includes(searchTerm)
        ) {
          options.push(option);
        }
      });
      return options;
    } else {
      return this.props.options;
    }
  }

  render() {
    return (
      <div
        className={this.props?.show ? "setting-inner" : "hide"}
        onMouseLeave={this.closeDropdown.bind(this)}>
        {this.props.heading ? <h5>{this.props.heading}</h5> : null}
        <div className="dropdown-group">
          {this.props.label ? (
            <label>
              <span className="label-text">{this.props.label}</span>
              {this.getHelperText()}{" "}
              <button
                className={
                  Object.prototype.hasOwnProperty.call(
                    this.props,
                    "defaultValue"
                  )
                    ? "dropdown-reset"
                    : "hide"
                }
                onClick={this.handleReset.bind(this)}>
                <i className="fi fi-br-undo" />
              </button>
            </label>
          ) : null}
          <div className="dropdown-control">
            <input
              id={this.props.id}
              disabled={this.props.disabled}
              type="text"
              placeholder="Select One"
              value={
                this.state.searchTerm === ""
                  ? this.getOptionLabel(this.state.value)
                  : this.state.searchTerm
              }
              onClick={this.clearInput.bind(this)}
              onChange={this.handleInput}
            />
            <button
              className="dropdown-trigger"
              onClick={this.toggleDropdown.bind(this)}>
              <i className="fi fi-br-angle-small-down" />
            </button>
          </div>
          <div
            className={this.state.open ? "dropdown open" : "dropdown closed"}>
            {this.options.length > 0 ? (
              this.options.map((option) => {
                return (
                  <button
                    className="option"
                    key={option.value}
                    value={option.value}
                    onClick={this.handleSelect}>
                    {option.label}
                  </button>
                );
              })
            ) : (
              <span>No results found.</span>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Select;
