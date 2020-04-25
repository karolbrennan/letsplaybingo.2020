import React from 'react';
class About extends React.Component {
  render() {
    return (
      <section className="pale-gray-bg">
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
            <h2>Features Coming Soon</h2>
            <ul>
              <li>Guides for hosting bingo games</li>
              <li>Better styling for mobile friendly gameplay</li>
              <li>Persistent game data so if you navigate to another page and come back you can pick up where you left off.</li>
            </ul>
            <h2>Release Notes</h2>
            <p>Past release notes can be accessed here: <a href="/releases">Release Notes</a></p>
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