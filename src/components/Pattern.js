/*
 *  Pattern Class
 *  Karol Brennan
 *  4.19.2020
 *  This class is used to display and control the game pattern.
 */
import React from 'react';

class Pattern extends React.Component {

  /*
   *  Render Pattern Function
   *  This will display a bingo card where the user can create their own pattern
   *  Or choose a pattern from the searchable drop down
   */
  render() {
    const pattern = JSON.parse(JSON.stringify(this.props.pattern.pattern));

    return (
      <div id="bingopattern" className="notranslate">
        {Object.keys(pattern).map((letter, index) => {
          return(
            <div key={letter + index} className="row vertical-row text-center">
              <div className="col dark-bg white-text"><span>{letter}</span></div>
              {Object.keys(pattern[letter]).map((number, index) => {
                return(
                  <div key={letter + number} className={pattern[letter][number] ? 'selected col' : 'col'}
                      onClick={(e) => this.props.update(pattern, letter, index, pattern[letter][number])}>
                      {letter === "N" && index === 2 ? <span className="free-space">Free Space</span> : <span>&nbsp;</span>}
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    );
  }
}

export default Pattern;