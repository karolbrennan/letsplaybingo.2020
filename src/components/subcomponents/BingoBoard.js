import React, { Component } from "react";
/**
 * Renders the BingoBoard component
 */
class BingoBoard extends Component {
  /**
   * Constructor for this class,
   *
   * @param   {Object}  props  params passed from the calling component
   */
  constructor(props) {
    super(props);
    this.state = {
      board: props.board,
      manualMode: props.manualMode,
      manualCall: props.manualCall,
    };
  }

  /**
   * Gets state from calling component
   *
   * @param   {Object}  props  [props description]
   * @param   {Object}  state  [state description]
   *
   * @return  {Object}         [return description]
   */
  static getDerivedStateFromProps(props, state) {
    if (props !== state) {
      state = props;
    }
    return state;
  }

  /**
   * Renders the component
   *
   * @return  {JSX}  [return description]
   */
  render() {
    return (
      <div
        id="board"
        className="flex">
        {Object.keys(this.state.board).map((letter, i) => {
          return (
            <div
              key={"board-row-" + letter}
              className="row no-wrap set-size text-center notranslate">
              <div className="col board-letter white-bg red-text">{letter}</div>
              {this.state.board[letter].map((number) => {
                return (
                  <div
                    key={number.display}
                    className={
                      number.active
                        ? "col ball active"
                        : number.called
                        ? "col ball called"
                        : "col ball"
                    }>
                    {this.state.manualMode ? (
                      <button onClick={() => this.state.manualCall(number)}>
                        {number.number}
                      </button>
                    ) : (
                      number.number
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}
export default BingoBoard;
