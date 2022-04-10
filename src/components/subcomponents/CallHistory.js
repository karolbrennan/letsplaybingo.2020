/*
 *  Full History Class
 *  Karol Brennan
 *  3.26.2022
 *  This class is used to display the full history of the called balls
 */
import React from 'react';

class CallHistory extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showFullCallHistory: false
    };
  }

  /**
   * Full history modal display
   *
   * @return  {[JSX]}  Return modal or empty div
   */
   get fullHistoryDisplay() {
    const ballHistory = [...this.props.calledBalls].reverse();
    if(this.state.showFullCallHistory === true){
      return (
        <div>
          <div className="modal">
            <h4 className="margin-md">Full Call History</h4>
            <div className="x-small-text margin-bottom-lg">Most recent call listed first, left to right, top to bottom.</div>
            <div className="previous-calls notranslate">
              {ballHistory.map(call => {
                return (
                  <div key={call.number} className={call.color}><span>{call.letter}{call.number}</span></div>
                )
              })}
            </div>
            <p>
              <button onClick={() => {this.setState({showFullCallHistory:false})}}>Close</button>
            </p>
          </div>
          <div className="modal-backdrop" onClick={(e) => {e.preventDefault();}}></div>
        </div>
      )
    } else {
      return null
    }
  }

  
  /**
   *  Shows a list of the last 5 balls called
   *
   * @return  {[JSX]}  Div that contains a list of 5 most recent calls
   */
   get previousCallListDisplay() {
     if(this.props.calledBalls.length > 0){
      const previousCallList = [...this.props.calledBalls];
      let last5Calls = previousCallList.reverse().slice(1,6);
      if(last5Calls.length > 0){
        return (
          <div className="margin-vertical-xlg">
            <h6 className="text-center">Last 5 Calls</h6>
            <div className="previous-calls padding-vertical-xlg notranslate">
              {last5Calls.map(call => {
                return (
                  <div key={call.number} className={call.color}><span>{call.letter}{call.number}</span></div>
                )
              })}
            </div>
            <button className="textOnly x-small-text" onClick={() => {this.setState({showFullCallHistory:true})}}>show full history</button>
            {this.fullHistoryDisplay}
          </div>
        );
      } else {
        return <div></div>
      }
    } else {
      return <div></div>
    }
  }

  render() {
    if(this.props.calledBalls.length > 1){
      return (
        <div className="text-center">
          {this.previousCallListDisplay}
        </div>
      );
    } else {
      return null;
    }
  }
}

export default CallHistory;