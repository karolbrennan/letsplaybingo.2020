import React from "react";
import { dispatchCustomEvent } from "../helpers/Utilities";

/**
 * Pattern class
 * Renders a visual display of a bingo pattern
 * Properties includes:
 * pattern - Object, has info about a pattern
 * presets - Array, includes all preset pattern objects
 * showTitle - Boolean, indicates if the pattern title should show
 * titlePosition - String, if bottom, shows the title below the pattern, defaults to top
 * editable - Boolean, indicates if the pattern is editable
 */
class Pattern extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pattern: props.pattern === null ? props.presets[0] : props.pattern,
      presets: props.presets,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.pattern !== prevProps.pattern) {
      this.setState({ pattern: this.props.pattern });
    }
  }

  handleUpdatePattern = (pattern, letter, index, slot) => {
    pattern[letter][index] = !slot;
    let unusedLetters = [];
    Object.keys(pattern).map((letter) => {
      // Check for free space ONLY first. If it's not the letter N, check for any used spaces.
      if (letter === "N") {
        let markedSpaces = [];
        // loop through each space in the pattern for the letter N
        pattern[letter].forEach((space, index) => {
          // if the space is marked, push the index of the space into markedSpaces array
          if (space) {
            markedSpaces.push(index);
          }
        });
        // if no spaces are marked, OR ONLY the free space is marked - push N to unused letters.
        if (
          markedSpaces.length === 0 ||
          (markedSpaces.length === 1 && markedSpaces[0] === 2)
        ) {
          unusedLetters.push(letter);
        }
      } else {
        if (pattern[letter].indexOf(true) < 0) {
          unusedLetters.push(letter);
        }
      }
      return letter;
    });
    let customPattern = {
      value: "Custom",
      label: "Custom",
      unusedLetters: unusedLetters,
      pattern: pattern,
    };
    dispatchCustomEvent("custompattern", customPattern);
    this.setState({ pattern: customPattern });
  };

  render() {
    const pattern = this.state.pattern.pattern;

    return (
      <div className="pattern-block">
        {this.props.showTitle === true &&
        this.props.titlePosition != "bottom" ? (
          <h5 className="text-center">{this.state.pattern.label}</h5>
        ) : null}
        <div
          className={
            this.props.editable === true
              ? "pattern-display editable"
              : "pattern-display"
          }>
          {Object.keys(pattern).map((letter, index) => {
            return (
              <div
                key={letter + index}
                className="row vertical text-center">
                <div className="col pattern-letter notranslate">
                  <span>{letter}</span>
                </div>
                {Object.keys(pattern[letter]).map((number, index) => {
                  if (this.props.editable === true) {
                    return (
                      <div
                        key={letter + number}
                        className={
                          pattern[letter][number] ? "selected col" : "col"
                        }
                        onClick={(e) =>
                          this.handleUpdatePattern(
                            pattern,
                            letter,
                            index,
                            pattern[letter][number]
                          )
                        }>
                        {letter === "N" && index === 2 ? (
                          <span className="free-space">Free Space</span>
                        ) : (
                          <span>&nbsp;</span>
                        )}
                      </div>
                    );
                  } else {
                    return (
                      <div
                        key={letter + number}
                        className={
                          pattern[letter][number] ? "selected col" : "col"
                        }>
                        {letter === "N" && index === 2 ? (
                          <span className="free-space">Free Space</span>
                        ) : (
                          <span>&nbsp;</span>
                        )}
                      </div>
                    );
                  }
                })}
              </div>
            );
          })}
        </div>
        {this.props.showTitle === true &&
        this.state.pattern.label !== "Custom" &&
        this.props.titlePosition === "bottom" ? (
          <h5 className="text-center margin-top-md">
            {this.state.pattern.label}
          </h5>
        ) : null}
      </div>
    );
  }
}

export default Pattern;
