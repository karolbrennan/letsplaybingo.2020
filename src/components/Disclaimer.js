import React from 'react';

class Disclaimer extends React.Component {
  render() {
    return(
      <section>
        <div className="row">
          <div className="col padding-xxlg">
            <h1>Disclaimer!</h1>
            <p>
              LetsPlayBingo.io does not intend for the bingo caller contained on this website to be used for illegal or gambling purposes. 
              The information and bingo caller contained on this website is for entertainment purposes only. This website, its owners and 
              associates do not have any control over the use of this bingo caller and cannot be held liable for any monetary or other losses 
              incurred by unapproved use of this bingo caller.
            </p>
          </div>
        </div>
      </section>
    )
  }
}

export default Disclaimer;