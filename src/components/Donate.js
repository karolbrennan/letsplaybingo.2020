import React from 'react';
import venmo from '../images/venmo.jpg';
import paypal from '../images/paypalme.png';

class Donate extends React.Component {
  render() {
    return(
      <section className="padding-xxlg pale-gray-bg">
        <h1 className="no-margin">Donate to Let's Play Bingo!</h1>
        <p>Let's Play Bingo is completely <strong>free</strong> and always will be. 
          If you'd like to contribute toward operating costs we are accepting donations of any amount via Venmo or Paypal!</p>
        <div className="row no-wrap justify-start">
          <div className="col">
            <a href="https://venmo.com/karolbrennan" target="_blank" rel="noopener noreferrer"><img className="donate" src={venmo} alt="venmo" /></a>
          </div>
          <div className="col">
            <a href="https://paypal.me/karolbrennan" target="_blank" rel="noopener noreferrer"><img className="donate" src={paypal} alt="paypal" /></a>
          </div>
        </div>
      </section>
    )
  }
}

export default Donate;