import React from "react";
import PatternDisplay from "../subcomponents/PatternDisplay";
import Utilities from "../helpers/Utilities";
import "../../sass/patternlist.scss";

/**
 * Renders the patterns page which allows users
 * to view a list of patterns and print them out
 */
class Patterns extends React.Component {
  render() {
    const patterns = Utilities.getPresetPatterns().splice(1);
    return (
      <section id="pattern-list">
        <div className="container row">
          <div className="col padding-xxlg">
            <h1>
              Patterns
              <button
                className="primary-button"
                onClick={() => {
                  window.print();
                  return false;
                }}>
                Print
              </button>
            </h1>
            <div className="container">
              <div className="row patterns">
                {patterns.map((pattern) => {
                  return (
                    <div
                      key={pattern.label}
                      className="pattern-block col">
                      <PatternDisplay pattern={pattern}></PatternDisplay>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
export default Patterns;
