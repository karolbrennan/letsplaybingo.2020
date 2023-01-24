import React from "react";

/**
 * BingoCard
 *
 * @param   {Object}  props  Includes properties for card and if it's daubable or not
 *
 * @return  {JSX}         Returns a visual representation of a bingo card
 */
export default function BingoCard(props) {
  // marks the clicked on space as daubed
  function handleDaub(event) {
    event.target.classList.toggle("daubed");
  }

  return (
    <div className="row">
      {Object.keys(props.card).map((letter) => (
        <div
          className="col"
          key={"let" + letter}>
          <div className="card-letter">{letter}</div>
          <div className="card-numbers">
            {Object.values(props.card[letter]).map((number, index) => {
              if (props.daubable) {
                return (
                  <div
                    className="card-number"
                    key={letter + number}
                    onClick={handleDaub}>
                    <span>
                      {letter === "N" && index === 2 ? (
                        <div className="freespace">
                          <span>Free</span>
                          <span>Space</span>
                        </div>
                      ) : (
                        number
                      )}
                    </span>
                  </div>
                );
              } else {
                return (
                  <div
                    className="card-number"
                    key={letter + number}>
                    {letter === "N" && index === 2 ? freeSpace : number}
                  </div>
                );
              }
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
