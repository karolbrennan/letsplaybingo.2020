import React from "react";
/**
 * Renders the release notes for the site
 */
class ReleaseNotes extends React.Component {
  /**
   * When the component mounts, enable some nice smooth scrolling
   * for the anchors on the page
   */
  componentDidMount() {
    document.title = "Let's Play Bingo! | Release Notes";
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute("href")).scrollIntoView({
          behavior: "smooth",
        });
      });
    });
  }

  render() {
    return (
      <section>
        <div className="back-to-top">
          <a href="#top">&#10094;</a>
        </div>
        <div className="container row">
          <div className="col colspan12">
            <h1 id="top">Release Notes!</h1>
          </div>
        </div>
        <div className="container row desktop-no-wrap mobile-force-wrap">
          <div className="col colspan8">
            {/* ------------- Table of Contents ------------ */}
            <div className="table-of-contents margin-bottom-xxlg">
              <h3>Table of Contents</h3>
              <ul>
                <li>
                  <a href="#r112023">3/1/2023 - 6th Anniversary Edition!</a>
                </li>
                {/* <li><a href="#r">// - <span className="version"></span></a></li> */}
              </ul>
            </div>
            {/* ---------------------------------- */}
            <div className="release-block">
              <h2 id="r112023">
                <span className="date">3/1/2023</span>
                <span className="spacer"></span>
                6th Anniversary Edition!
                <span className="version">v.4.0.0</span>
                <span className="tag release">release</span>
              </h2>
              <p>
                This is a brand new edition of Let's Play Bingo. It has
                undergone a complete rewrite.
                <br />
                Check out some of the biggest improvements:
              </p>
              <ul>
                <li>The menu has been moved to a dropdown menu.</li>
                <li>
                  The game settings have been moved off screen to a slide out
                  panel to help clean up the main UI.
                </li>
                <li>
                  New settings panel with lots of new options!
                  <ul>
                    <li>Pattern selection</li>
                    <li>Full screen mode</li>
                    <li>Pop out game control box</li>
                    <li>Hide on screen controls</li>
                    <li>Hide footer</li>
                    <li>Current calls display</li>
                    <li>Previous calls display options</li>
                    <li>Countdown to next number</li>
                    <li>Themes</li>
                    <li>Layouts</li>
                    <li>Upgraded the time between calls controller.</li>
                  </ul>
                </li>
                <li>
                  Upgraded the technology used for bingo calls and card
                  generation to now utilize the browser's built in cryptographic
                  randomizer for better randomization.
                </li>
              </ul>
            </div>
          </div>
          <div className="col colspan4">
            <div className="release-aside transparent-background">
              <h2>Other Versions</h2>
              <div className="version-block">
                <h4>
                  Previous Edition <span className="version">v.3.0.0</span>
                </h4>
                <strong>Released:</strong> April 25, 2020
                <br />
                <strong>Retired:</strong> December 31, 2022
                <br />
                <strong>Link:</strong>{" "}
                <a
                  href="https://previous.letsplaybingo.io"
                  target="_blank">
                  Previous Edition
                </a>
                <br />
                <p>
                  This was the 2nd edition built in ReactJS that featured a lot
                  of upgrades from the classic edition. This edition is retired
                  and will no longer be updated, but you can still use it at the
                  link above.
                </p>
              </div>
              <div className="version-block">
                <h4>
                  Classic Edition <span className="version">v.2.0.0</span>
                </h4>
                <strong>Released:</strong> May 14, 2018
                <br />
                <strong>Link:</strong>{" "}
                <a
                  href="https://classic.letsplaybingo.io"
                  target="_blank">
                  Classic Edition
                </a>
                <br />
                <p>
                  This was the 1st edition built in ReactJS. It is a very basic
                  caller without a lot of features. It is rarely updated, only
                  for serious issues.
                </p>
              </div>
              <div className="version-block">
                <h4>
                  Original Edition <span className="version">v.1.0.0</span>
                </h4>
                <strong>Released:</strong> January 1, 2017
                <br />
                <strong>Link:</strong>{" "}
                <a
                  href="https://codepen.io/karolbrennan/pen/GxKZWX"
                  target="_blank">
                  Original Edition
                </a>
                <br />
                <p>
                  This was the very first edition of this bingo caller created
                  in plain object oriented JavaScript. Currently lives on
                  CodePen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default ReleaseNotes;
