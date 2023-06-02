import React from "react";
import buyacoffee from "../../images/buyacoffee.png";
import venmo from "../../images/venmo.jpeg";
import paypal from "../../images/paypalme.jpeg";

class Donate extends React.Component {
	render() {
		return (
			<section className="padding-vertical-xxlg">
				<div className="container row">
					<div className="col">
						<h1 className="no-margin">Donate to Let's Play Bingo!</h1>
						<p>
							Let's Play Bingo is completely <strong>free</strong> and always will be. If you'd like to contribute toward operating
							costs we are accepting donations of any amount via Venmo or Paypal!
						</p>

						<div className="row no-wrap justify-start">
							<div className="col">
								<h2>Love the app? Want to show your support?</h2>
								<p>
									<span className="notranslate">Let's Play Bingo</span> is completely <strong>ad free</strong> and is run by a
									single developer. If you'd like to contribute toward the costs associated with running a website like this, or
									want to tip the developer just to say thanks, I am accepting donations via Buy Me A Coffee, Paypal, or Venmo!
								</p>
								<p>
									<a href="https://www.buymeacoffee.com/letsplaybingo" target="_blank" rel="noopener noreferrer">
										<img className="qr-code" src={buyacoffee} alt="buy a coffee" />
									</a>
									<a href="https://venmo.com/karolbrennan" target="_blank" rel="noopener noreferrer">
										<img className="qr-code" src={venmo} alt="venmo" />
									</a>
									<a href="https://paypal.me/karolbrennan" target="_blank" rel="noopener noreferrer">
										<img className="qr-code" src={paypal} alt="paypal" />
									</a>
								</p>
								<p>
									<strong>Buy Me a Coffee</strong> allows you to make a donation using a credit/debit card processed securely
									through{" "}
									<a href="https://stripe.com" target="_blank" rel="noopener noreferrer">
										Stripe
									</a>{" "}
									with no need to log in or create an account!
								</p>
								<p>
									<strong>Paypal</strong> allows you to donate automatically on a weekly or monthly basis!
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>
		);
	}
}

export default Donate;
