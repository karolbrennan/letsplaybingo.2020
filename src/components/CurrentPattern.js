import React from "react";
import {
  getBlankPattern,
  getCustomUnusedLetters,
  getPresetPatterns,
} from "../helpers/PresetPatterns";
import { dispatchCustomEvent } from "../helpers/Utilities";
import Select from "./Select";
import Pattern from "./Pattern";

const presets = getPresetPatterns();
const blankPattern = getBlankPattern();
/**
 * CurrentPattern
 * Renders a visual display of the bingo pattern that has been selected
 * Returns a blank pattern if none has been selected
 * Optionally lets the user create their own custom pattern
 * Properties include:
 * showSelect - Boolean, indicates if the pattern selection dropdown should show
 * pattern - Object, contains information about the pattern
 * showTitle - Boolean, indicates if the title of the pattern should display below
 */
class CurrentPattern extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.presets = presets;
  }

  componentDidMount() {
    document.addEventListener("custompattern", this.handleCustomPattern);
  }

  componentWillUnmount() {
    document.removeEventListener("custompattern", this.handleCustomPattern);
  }

  getPattern(patternName) {
    let pattern = blankPattern;
    this.presets.forEach((preset) => {
      if (preset.value === patternName) {
        pattern = preset;
      }
    });
    return pattern;
  }

  handleSelect = (value) => {
    let selectedPattern = {};
    if (value === "blank") {
      /* It's a getter that returns the pattern that is currently selected. */
      selectedPattern = blankPattern;
      this.handleCustomPattern(blankPattern);
    } else {
      selectedPattern = this.getPattern(value);
      value = selectedPattern.label;
    }
    dispatchCustomEvent("patternupdate", value);

    this.setState({
      pattern: selectedPattern,
      value: value,
    });
  };

  handleCustomPattern = (event) => {
    const pattern = event.detail ? event.detail : event;
    let selectedPattern = pattern;
    this.presets = this.presets.map((preset) => {
      if (preset.label === "Custom") {
        preset.pattern = pattern.pattern;
        selectedPattern = preset;
      }
      return preset;
    });
    selectedPattern.unusedLetters = getCustomUnusedLetters(pattern.pattern);

    this.setState({ pattern: selectedPattern, value: "Custom" });
    // Alert the settings if we changed to a custom pattern in the display board
    if (this.props.showSelect === false) {
      dispatchCustomEvent("patternupdate", selectedPattern);
      dispatchCustomEvent("settingupdate", {
        property: "pattern",
        value: selectedPattern,
      });
    }
  };

  get patternOptions() {
    let patternOptions = [];
    const searchTerm = this.state.searchTerm.toLowerCase();
    if (searchTerm.length > 0) {
      presets.forEach((pattern) => {
        if (
          pattern.label.toLowerCase().includes(searchTerm) ||
          pattern.value.toLowerCase().includes(searchTerm)
        ) {
          patternOptions.push(pattern);
        }
      });
      return patternOptions;
    } else {
      return presets;
    }
  }

  get selectedPattern() {
    return this.props.pattern;
  }

  render() {
    if (this.props.showSelect === true) {
      return (
        <div className="row no-wrap">
          <div className="col shrink">
            <div className="pattern">
              <Pattern
                editable={true}
                presets={this.presets}
                pattern={this.selectedPattern}
                showTitle={this.props.showTitle}
                titlePosition="bottom"
              />
            </div>
          </div>
          <div className="col grow padding-lg">
            <Select
              show={true}
              id="patternSelect"
              label="Choose a Pattern"
              defaultValue="blank"
              name="pattern"
              options={this.presets}
              value={this.selectedPattern.label}
              handler={this.handleSelect}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="pattern">
          <Pattern
            editable={true}
            presets={this.presets}
            pattern={this.selectedPattern}
            showTitle={this.props.showTitle}
            titlePosition="bottom"
          />
        </div>
      );
    }
  }
}

export default CurrentPattern;
