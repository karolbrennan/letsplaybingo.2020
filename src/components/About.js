import React from 'react';
class About extends React.Component {
  render() {
    return (
      <section>
        <div className="row no-wrap">
          <div className="col padding-xxlg">
            <h1>About</h1>
            <p>
              Use this free bingo caller to host your own bingo games at home! You provide the cards, we generate the bingo numbers! 
              No downloads, no ads and <strong>completely free</strong>! 
            </p>
            <p>
              Thank you to those who have reached out to me to tell me how much they enjoy my bingo caller. I created this site in honor of my 
              late grandmother, we used to play bingo together using a little electronic bingo caller. Grandma Jo - this is for you. &hearts; - Karol
            </p>
            <p>
              Love Let's Play Bingo? Tell your friends!<br/>
            </p>
            <div className="addthis_inline_share_toolbox"></div>
            <p>
              Have ideas for how to make Let's Play Bingo even better? Send a message to <a href="mailto:hello@letsplaybingo.io">hello@letsplaybingo.io</a>!
            </p>
          </div>
        </div>
      </section>
    )
  }
}
export default About;