import React from 'react';
import venmo from '../../images/venmo.jpg';
import paypal from '../../images/paypalme.png';
class About extends React.Component {
  render() {
    return (
      <section className="padding-vertical-xxlg">
        <div className="container row no-wrap">
          <div className="col">
            <h1 className="no-margin">About</h1>
            {/* --------------- INTRO --------------- */}
            <p>
              Use this free bingo caller to host your own bingo games at home! You provide the cards, we generate the bingo numbers! 
              No downloads, no ads and <strong>completely free</strong>! 
            </p>
            <p><em>
              Thank you so much to those who have donated towards operating costs and who have reached out to me to tell me how much they enjoy this bingo caller.
              I love hearing from you! It makes me very happy to hear that a little project I started for myself in honor of my late grandmother is enjoyed by so many other people.
              My mom, grandma and I used to play bingo together using a little electronic bingo caller. It was always just a bit off and never worked quite right. 
              We also found ourselves wishing it had other features or a bigger display. So in honor of Grandma Jo, in 2017 Let's Play Bingo was born!</em><br/>
              - Karol
           </p>
          </div>
        </div>
        <div className="container row no-wrap">
          <div className="col">
            <h1 className="no-margin">Donate to Let's Play Bingo!</h1>
            <p>Let's Play Bingo is completely <strong>free</strong> and always will be. If you'd like to contribute toward operating costs we are accepting donations of any amount via Venmo or Paypal!</p>

            <div className="row no-wrap justify-start">
              <div className="col">
                <a href="https://venmo.com/karolbrennan" target="_blank" rel="noopener noreferrer"><img className="donate" src={venmo} alt="venmo" /></a>
              </div>
              <div className="col">
                <a href="https://paypal.me/karolbrennan" target="_blank" rel="noopener noreferrer"><img className="donate" src={paypal} alt="paypal" /></a>
              </div>
            </div>
          </div>
          <div className="col padding-left-xxlg">
            {/* --------------- RELEASE NOTES --------------- */}
            <h2 className="margin-vertical-md">Got Ideas?</h2>
            <p>Do you have ideas for how to make Let's Play Bingo even better? Send a message to <a href="mailto:hello@letsplaybingo.io">hello@letsplaybingo.io</a>!</p>
          </div>
        </div>
      </section>
    )
  }
}
export default About;