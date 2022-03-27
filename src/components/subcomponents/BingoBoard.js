import React, {Component} from 'react';

class BingoBoard extends Component {
  constructor(props){
    super(props);
    this.state = {
      board: props.board,
      manualMode: props.manualMode,
      manualCall: props.manualCall
    }
  }

  static getDerivedStateFromProps(props, state){
    if(props !== state){
      state = props;
    }
    return state;
  }
  
  render(){
    return(
      <div id="board" className="flex">
        {Object.keys(this.state.board).map((letter, i) => {
          return(
            <div key={"board-row-" + letter} className="row no-wrap set-size text-center notranslate">
              <div className="col board-letter white-bg red-text">{letter}</div>
              {
                this.state.board[letter].map((number) => {
                  return(
                    <div key={number.display}
                        className={number.active ?  "col ball active" : 
                        number.called ?  "col ball called" : "col ball"}>
                          {this.state.manualMode ? <button onClick={() => this.state.manualCall(number)}>{number.number}</button> : number.number}
                    </div>
                  )
                })
              }
            </div>
          )
        })}
      </div>
    )
  }
}
export default BingoBoard;