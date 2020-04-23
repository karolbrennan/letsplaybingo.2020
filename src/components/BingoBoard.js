import React, {Component} from 'react';

class BingoBoard extends Component {
  constructor(props){
    super(props);
    this.state = {
      board: props.board
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
        {Object.keys(this.state.board).map((key, i) => {
          return(
            <div key={"board" + key} className="row no-wrap set-size text-center">
              <div className="col board-letter white-bg red-text notranslate">{key}</div>
              {
                this.state.board[key].map((letter, i) => {
                  return(
                    <div key={this.state.board[key][i].display}
                        className={this.state.board[key][i].active ?  "col ball active" : 
                        this.state.board[key][i].called ?  "col ball called" : "col ball"}>
                      {this.state.board[key][i].number}
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