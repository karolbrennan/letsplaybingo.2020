import React from "react";
import paypal from "../assets/images/paypalme.png";
import venmo from "../assets/images/venmo.jpg";
import { useEffect } from "react";

export default function About() {
  useEffect(() => {
    document.title = "Let's Play Bingo! | About";
  });

  return (
    <section>
      <div className="container row">
        <div className="col">
          <h1 className="no-margin">About</h1>
          <p>
            Let's Play Bingo is a free bingo calling application with absolutely
            ZERO ADS. It can be used to host bingo games from anywhere: at home,
            at church, at the senior center, at the bar, even online through
            zoom or live streaming. With so many customizations to make your
            game your own it is the most powerful application of its kind
            available and is used all over the world. Send your friends the link
            so they can print their own bingo cards or follow along on screen
            with the new play along feature!
          </p>
        </div>
      </div>
      <div className="container row no-wrap">
        <div className="col padding-vertical-lg">
          {/* --------------- INTRO --------------- */}
          <h3 className="no-margin">
            Why <span className="notranslate">Let's Play Bingo</span>?
          </h3>
          <p>
            When I was a kid, my grandmother was living with us and she{" "}
            <strong>loved</strong> bingo. My mom would take her to the bingo
            hall and I would often tag along. When we couldn't get to the hall,
            we would use this little electronic bingo caller and paper cards we
            bought from a bingo supply store to play at home, betting pocket
            change on games. My grandmother passed away when I was 18, and I
            rarely went to bingo after that, but those are some of my fondest
            memories.
          </p>
          <p>
            In 2017 I decided to build a little bingo caller just for fun and
            created the original version of{" "}
            <a
              href="https://codepen.io/karolbrennan/pen/GxKZWX"
              target="_blank"
              rel="noreferrer"
              className="notranslate">
              Let's Play Bingo
            </a>
            . My hopes were that my little project could help bring families
            together on game night to play bingo the way I played with my mom
            and grandma at home. It quickly became the one application I've
            built that I am proudest on and I have spent the last several years
            working to improve it in my spare time.
          </p>
          <h3>March 2020</h3>
          <p>
            During the height of the pandemic - when everyone was forced into
            quaranting across the world -{" "}
            <span className="notranslate">Let's Play Bingo</span> started to
            really gain traction. I began getting emails from people all over
            the world thanking me for this little app I made and how it had
            helped keep their families in touch over virtual game nights. It was
            truly my biggest dreams for the site come alive.
          </p>
          <p>
            So I want to say a very sincere thank you to everyone who has
            reached out about the game. Thank you for sending me suggestions,
            alerting me to bugs, making donations, and sending me sweet little
            notes describing how you're using{" "}
            <span className="notranslate">Let's Play Bingo</span> to enrich your
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
          <h1 className="no-margin">
            Donate to <span className="notranslate">Let's Play Bingo</span>!
          </h1>
          <p>
            <span className="notranslate">Let's Play Bingo</span> is completely{" "}
            <strong>ad free</strong>. If you'd like to contribute toward
            operating costs or just want to say thanks, I am accepting donations
            via Venmo or Paypal!
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
                  alt="Venmo QR Code"
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
                  alt="Paypal.me name karolbrennan"
                />
              </a>
            </div>
          </div>

          <p>
            <em className="margin-top-sm x-small-text">
              If you choose to donate via paypal please mark it as a "personal"
              payment. When marked as "goods" Paypal requires me to send
              tracking info, which obviously I don't have. Thank you! ❤
            </em>
          </p>
        </div>
        <div className="col padding-left-xxlg">
          <h2>Want to help improve the game?</h2>
          <p>
            Do you have ideas for how to make{" "}
            <span className="notranslate">Let's Play Bingo</span> even better?
            New game modes? New patterns? Something else?
          </p>
          <p>
            Send a message to{" "}
            <a href="mailto:hello@letsplaybingo.io">hello@letsplaybingo.io</a>
            !<br />
            I'd love to hear from you!
          </p>

          <h4>Credits</h4>
          <p className="x-small-text">
            UIcons by{" "}
            <a
              href="https://www.flaticon.com/uicons"
              target="_blank">
              Flaticon
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
