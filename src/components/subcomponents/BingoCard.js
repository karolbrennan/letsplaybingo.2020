import React from "react";
/**
 * Renders the BingoCard component
 */
class BingoCard extends React.Component {
  /**
   * Returns a JSX element representing a freespace
   *
   * @return  {JSX}  [return description]
   */
  get freeSpace() {
    return (
      <div className="freespace">
        <span>Free</span>
        <span>Space</span>
      </div>
    );
  }

  /**
   * Renders the component
   */
  render() {
    let card = this.props.card;
    return (
      <div className="row">
        {Object.keys(card).map((letter) => (
          <div
            className="col"
            key={"let" + letter}>
            <div className="card-letter">{letter}</div>
            <div className="card-numbers">
              {Object.values(card[letter]).map((number, index) => (
                <div
                  className="card-number"
                  key={letter + number}>
                  {/* If we are looking at the N column, check if it's the middle space (free space) */}
                  {letter === "N" && index === 2 ? this.freeSpace : number}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
}
export default BingoCard;
