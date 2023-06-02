import React from "react";
import buyacoffee from "../../images/buyacoffee.png";
import venmo from "../../images/venmo.jpeg";
import paypal from "../../images/paypalme.jpeg";
class About extends React.Component {
	render() {
		return (
			<section className="padding-vertical-xxlg">
				<div className="container row no-wrap">
					<div className="col">
						<h1 className="no-margin">About</h1>
						{/* --------------- INTRO --------------- */}
						<p>
							Use this free bingo caller to host your own bingo games at home! You provide the cards, we generate the bingo numbers! No
							downloads, no ads and <strong>completely free</strong>!
						</p>
						<p>
							<em>
								Thank you so much to those who have donated towards operating costs and who have reached out to me to tell me how much
								they enjoy this bingo caller. I love hearing from you! It makes me very happy to hear that a little project I started
								for myself in honor of my late grandmother is enjoyed by so many other people. My mom, grandma and I used to play
								bingo together using a little electronic bingo caller. It was always just a bit off and never worked quite right. We
								also found ourselves wishing it had other features or a bigger display. So in honor of Grandma Jo, in 2017 Let's Play
								Bingo was born!
							</em>
							<br />- Karol
						</p>
					</div>
				</div>
				<div className="container row no-wrap">
					<div className="col">
						<h2>Love the app? Want to show your support?</h2>
						<p>
							<span className="notranslate">Let's Play Bingo</span> is completely <strong>ad free</strong> and is run by a single
							developer. If you'd like to contribute toward the costs associated with running a website like this, or want to tip the
							developer just to say thanks, I am accepting donations via Buy Me A Coffee, Paypal, or Venmo!
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
							<strong>Buy Me a Coffee</strong> allows you to make a donation using a credit/debit card processed securely through{" "}
							<a href="https://stripe.com" target="_blank" rel="noopener noreferrer">
								Stripe
							</a>{" "}
							with no need to log in or create an account!
						</p>
						<p>
							<strong>Paypal</strong> allows you to donate automatically on a weekly or monthly basis!
						</p>
					</div>
					<div className="col padding-left-xxlg">
						{/* --------------- RELEASE NOTES --------------- */}
						<h2 className="margin-vertical-md">Got Ideas?</h2>
						<p>
							Do you have ideas for how to make Let's Play Bingo even better? Send a message to{" "}
							<a href="mailto:hello@letsplaybingo.io">hello@letsplaybingo.io</a>!
						</p>
					</div>
				</div>
			</section>
		);
	}
}
export default About;
