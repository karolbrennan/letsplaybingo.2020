import React from 'react';
import PatternDisplay from '../subcomponents/PatternDisplay';
import { getPresetPatterns } from '../../utils.js';
import '../../sass/bingopattern.scss';

class Patterns extends React.Component {

  render() {
    const patterns = getPresetPatterns().splice(1);
    return(
      <section id="pattern-list">
        <div className="container row">
          <div className="col padding-xxlg">
            <h1>Patterns 
                <button className="primaryBtn" onClick={() => {window.print();return false;}}>Print</button>
            </h1>
            <div className="container">
              <div className="row patterns">
                {patterns.map(pattern => {
                  return(
                    <div key={pattern.label} className="pattern-block col">
                      <PatternDisplay pattern={pattern}></PatternDisplay>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
export default Patterns;