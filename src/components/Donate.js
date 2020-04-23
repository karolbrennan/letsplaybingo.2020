import React from 'react';
import venmo from '../images/venmo.jpg';
import paypal from '../images/paypalme.png';

class Donate extends React.Component {
  render() {
    return(
      <section>
        <div className="row">
          <div className="col padding-xxlg">
            <h1>Donate to Let's Play Bingo!</h1>
            <p >If you'd like to contribute toward the operating costs of Let's Play Bingo you can send donations
            of any amount via Venmo or Paypal!<br/>
            <a href="https://venmo.com/karolbrennan" target="_blank" rel="noopener noreferrer"><img className="donate" src={venmo} alt="venmo" /></a>
              <a href="https://paypal.me/karolbrennan" target="_blank" rel="noopener noreferrer"><img className="donate" src={paypal} alt="paypal" /></a>
            </p>
          </div>
        </div>
      </section>
    )
  }
}

export default Donate;