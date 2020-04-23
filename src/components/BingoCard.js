import React from 'react';

class BingoCard extends React.Component {

  get freeSpace(){
    return(
      <div className="freespace">
        <span>Free</span><span>Space</span>
      </div>
    )
  }
  
  render(){
    let card = this.props.card;
    return(
      <div className="row">
        {Object.keys(card).map((letter) => (
            <div className="col" key={"let" + letter}>
              <div className="card-letter">{letter}</div>
              <div className="card-numbers">
                {Object.values(card[letter]).map((number, index) => (
                  <div className="card-number" key={letter + number}>
                      {letter === "N" && index === 2 ? this.freeSpace : number}
                  </div>
                ))}
              </div>
            </div>
          )
        )}
      </div>
    )
  }

}
export default BingoCard;