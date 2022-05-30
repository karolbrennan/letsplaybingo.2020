import React from "react";
import paypal from "../../images/paypalme.png";
import venmo from "../../images/venmo.jpg";
/**
 * Rendered the about page
 */
class About extends React.Component {
  render() {
    return (
      <section className="page padding-vertical-xxlg">
        <div className="container row">
          <div className="col">
            <h1 className="no-margin">About</h1>
            <p>
              Use this free bingo caller to host your own bingo games at home!
              No downloads, no ads and <strong>completely free</strong>!
            </p>
          </div>
        </div>
        <div className="container row no-wrap">
          <div className="col padding-vertical-lg">
            {/* --------------- INTRO --------------- */}
            <h3 className="no-margin">Why Let's Play Bingo?</h3>
            <p>
              When I was a kid, my grandmother was living with us and she{" "}
              <strong>loved</strong> bingo. My mom would take her to the bingo
              hall and I would often tag along. When we couldn't get to the
              hall, we would use this little electronic bingo caller and paper
              cards we bought from a bingo supply store to play at home, betting
              pocket change on games. My grandmother passed away when I was 18,
              and I rarely went to bingo after that, but those are some of my
              fonded memories.
            </p>
            <p>
              In 2017 I decided to build a little bingo caller just for fun and
              created{" "}
              <a
                href="https://codepen.io/karolbrennan/pen/GxKZWX"
                target="_blank"
                rel="noreferrer">
                the original version
              </a>
              . My hopes were that my little applicaton could help bring
              families together on game night to play bingo the way I played
              with my mom and grandma. It quickly turned into a passion project
              that I have spent the last several years improving upon.
            </p>
            <h3 className="margin-top-xxlg margin-bottom-none">March 2020</h3>
            <p>
              During the height of the pandemic - when everyone was forced into
              quaranting across the world - Let's Play Bingo started to really
              gain traction. I began getting emails from people all over the
              world thanking me for this little app I made and how it had helped
              keep their families in touch over virtual game nights. It was
              truly my biggest dreams for the site come alive.
            </p>
            <p>
              So I want to say a very sincere thank you to everyone who has
              reached out about the game. Thank you for sending me suggestions,
              alerting me to bugs, making donations, and sending me sweet little
              notes describing how you're using Let's Play Bingo to enrich your
              life or the lives of those around you. It really warms my heart. ❤
            </p>
            <p>
              - Karol
              <br />
              <em>In loving memory of Grandma Josephine</em>
            </p>
          </div>
        </div>
        <div className="container row no-wrap padding-top-lg">
          <div className="col">
            <h1 className="no-margin">Donate to Let's Play Bingo!</h1>
            <p>
              Let's Play Bingo is completely <strong>free</strong>. If you'd
              like to contribute toward operating costs we are accepting
              donations of any amount via Venmo or Paypal!
              <br />
              <em className="x-small-text">
                If you choose to donate via paypal please mark it as a
                "personal" payment. When marked as "goods" Paypal requires me to
                send tracking info, which obviously I don't have. Thank you! ❤
              </em>
            </p>

            <div className="row no-wrap justify-start">
              <div className="col padding-lg">
                <a
                  href="https://venmo.com/karolbrennan"
                  target="_blank"
                  rel="noopener noreferrer">
                  <img
                    className="donate"
                    src={venmo}
                    alt="venmo"
                  />
                </a>
              </div>
              <div className="col padding-lg">
                <a
                  href="https://paypal.me/karolbrennan"
                  target="_blank"
                  rel="noopener noreferrer">
                  <img
                    className="donate"
                    src={paypal}
                    alt="paypal"
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="col padding-left-xxlg">
            {/* --------------- RELEASE NOTES --------------- */}
            <h2 className="margin-vertical-md">
              Want to help improve the game?
            </h2>
            <p>
              Do you have ideas for how to make Let's Play Bingo even better?
              New game modes? New patterns? Something else?
            </p>
            <p>
              Send a message to{" "}
              <a href="mailto:hello@letsplaybingo.io">hello@letsplaybingo.io</a>
              ! I'd love to hear from you!
            </p>
          </div>
        </div>
      </section>
    );
  }
}
export default About;
