/*
 *  Pattern Class
 *  Karol Brennan
 *  5.12.2018
 *  This class is used to display and control the game pattern.
 */
import React from 'react';
import _ from 'underscore';
import Select from 'react-select';

class Pattern extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
      pattern: {
        B: [false, false, false, false, false],
        I: [false, false, false, false, false],
        N: [false, false, false, false, false],
        G: [false, false, false, false, false],
        O: [false, false, false, false, false]
      },
      presets: {
        "Custom": {
          B: [false, false, false, false, false],
          I: [false, false, false, false, false],
          N: [false, false, false, false, false],
          G: [false, false, false, false, false],
          O: [false, false, false, false, false]
        },
        "Regular or 4 Corners": {
          B: [true, false, false, false, true],
          I: [false, true, false, false, false],
          N: [false, false, true, false, false],
          G: [false, false, false, true, false],
          O: [true, false, false, false, true]
        },
        "Letter X": {
          B: [true, false, false, false, true],
          I: [false, true, false, true, false],
          N: [false, false, true, false, false],
          G: [false, true, false, true, false],
          O: [true, false, false, false, true]
        },
        "Brackets": {
          B: [true, true, false, true, true],
          I: [true, false, false, false, true],
          N: [false, false, false, false, false],
          G: [true, false, false, false, true],
          O: [true, true, false, true, true]
        },
        "Bow Tie": {
          B: [true, true, true, true, true],
          I: [false, true, true, true, false],
          N: [false, false, true, false, false],
          G: [false, true, true, true, false],
          O: [true, true, true, true, true]
        },
        "Crazy Arrow": {
          B: [false, false, false, false, true],
          I: [false, false, false, true, false],
          N: [true, false, true, false, false],
          G: [true, true, false, false, false],
          O: [true, true, true, false, false]
        },
        "Layer Cake": {
          B: [true, false, true, false, true],
          I: [true, false, true, false, true],
          N: [true, false, true, false, true],
          G: [true, false, true, false, true],
          O: [true, false, true, false, true]
        },
        "Postage Stamps": {
          B: [true, true, false, false, false],
          I: [true, true, false, false, false],
          N: [false, false, false, false, false],
          G: [false, false, false, true, true],
          O: [false, false, false, true, true]
        },
        "Sputnik": {
          B: [true, false, false, false, true],
          I: [false, true, true, true, false],
          N: [false, true, true, true, false],
          G: [false, true, true, true, false],
          O: [true, false, false, false, true]
        },
        "Diamond": {
          B: [false, false, true, false, false],
          I: [false, true, false, true, false],
          N: [true, false, false, false, true],
          G: [false, true, false, true, false],
          O: [false, false, true, false, false]
        },
        "Filled in Diamond": {
          B: [false, false, true, false, false],
          I: [false, true, true, true, false],
          N: [true, true, true, true, true],
          G: [false, true, true, true, false],
          O: [false, false, true, false, false]
        },
        "Blackout": {
          B: [true, true, true, true, true],
          I: [true, true, true, true, true],
          N: [true, true, true, true, true],
          G: [true, true, true, true, true],
          O: [true, true, true, true, true]
        },
        "Crazy L": {
          B: [false, false, false, false, true],
          I: [false, false, false, false, true],
          N: [false, false, false, false, true],
          G: [false, false, false, false, true],
          O: [true, true, true, true, true]
        },
        "Crazy T": {
          B: [true, true, true, true, true],
          I: [false, false, true, false, false],
          N: [false, false, true, false, false],
          G: [false, false, true, false, false],
          O: [false, false, true, false, false]
        },
        "Dog Bone": {
          B: [false, true, true, true, false],
          I: [false, false, true, false, false],
          N: [false, false, true, false, false],
          G: [false, false, true, false, false],
          O: [false, true, true, true, false]
        },
        "6 Pack": {
          B: [true, true, false, false, false],
          I: [true, true, false, false, false],
          N: [true, true, false, false, false],
          G: [false, false, false, false, false],
          O: [false, false, false, false, false]
        },
        "8 Pack": {
          B: [false, false, false, true, true],
          I: [false, false, false, true, true],
          N: [false, false, false, true, true],
          G: [false, false, false, true, true],
          O: [false, false, false, false, false]
        },
        "9 Pack": {
          B: [false, false, false, false, false],
          I: [false, false, false, false, false],
          N: [false, false, true, true, true],
          G: [false, false, true, true, true],
          O: [false, false, true, true, true]
        },
        "Small Frame": {
          B: [false, false, false, false, false],
          I: [false, true, true, true, false],
          N: [false, true, false, true, false],
          G: [false, true, true, true, false],
          O: [false, false, false, false, false]
        },
        "Large Frame": {
          B: [true, true, true, true, true],
          I: [true, false, false, false, true],
          N: [true, false, false, false, true],
          G: [true, false, false, false, true],
          O: [true, true, true, true, true]
        },
        "Crazy Kite": {
          B: [false, false, false, true, true],
          I: [false, false, false, true, true],
          N: [false, false, true, false, false],
          G: [false, true, false, false, false],
          O: [true, false, false, false, false]
        }


        // Template
        // "": {
        //   B: [false, false, false, false, false],
        //   I: [false, false, false, false, false],
        //   N: [false, false, false, false, false],
        //   G: [false, false, false, false, false],
        //   O: [false, false, false, false, false]
        // },
      }
    };
  }

  /*
   *  Choose Pattern Function
   *  This sets the selected pattern
   *  Sets to default if no pattern is selected or selection is cleared.
   */
  choosePattern = (e) => {
    if (e === null) {
      this.setState({
        selected: null,
        pattern: {
          B: [false, false, false, false, false],
          I: [false, false, false, false, false],
          N: [false, false, false, false, false],
          G: [false, false, false, false, false],
          O: [false, false, false, false, false]
        }
      });
    } else {
      this.setState({
        selected: e.value,
        pattern: this.state.presets[e.value]
      });
    }
  };

  /*
   *  Update Pattern Function
   *  As user clicks on slots for the pattern, update the pattern in the state
   */
  updatePattern = (letter, index, slot) => {
    let pattern = this.state.pattern;
    pattern[letter][index] = !slot;
    this.setState({selected: "Custom", pattern: pattern});
  };


  /*
   *  Render Pattern Function
   *  This will display a bingo card where the user can create their own pattern
   *  Or choose a pattern from the searchable drop down
   */
  render() {
    let pattern = this.state.pattern;
    let patternArray = [_.map(this.state.presets, (preset, value) => (
      {value: value, label: value}
    ))];

    return (
      <div id="bingopattern" className="notranslate">
        {_.map(pattern, (column, letter) => (
          <div key={letter} className="pattern-col">
            <div className="pattern-letter">{letter}</div>
            {_.map(column, (slot, index) => (
              <div key={letter + index}
                   className={slot ? "selected pattern-slot" : "pattern-slot"}
                   onClick={(e) => this.updatePattern(letter, index, slot)}>&nbsp;
              </div>
            ))}
          </div>
        ))}
        <Select
          name="patternselect"
          placeholder="Choose Pattern"
          value={this.state.selected}
          searchable
          onBlurResetsInput={true}
          clearable
          onChange={this.choosePattern}
          options={patternArray[0]}
        />
      </div>
    );
  }
}

export default Pattern;