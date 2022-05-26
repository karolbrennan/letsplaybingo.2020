import logo from "../../images/logo.svg";
export default function Header() {
  return (
    <header>
      <div className="container row align-center">
        <div className="col shrink">
          <a href="/">
            <img
              src={logo}
              alt="Let's Play Bingo!"
              className="logo"
            />
          </a>
        </div>
        <div className="col grow padding-md no-text-wrap text-right">
          <ul className="menu">
            <li>
              <a href="/">Play</a>
            </li>
            <li>
              <a href="/generator">Card Generator</a>
            </li>
            <li>
              <a href="/help">Help</a>
            </li>
            <li>
              <a href="/about">About / Donate</a>
            </li>
            <li>
              <a
                href="https://90ball.letsplaybingo.io"
                target="_blank"
                rel="noreferrer">
                90 Ball
              </a>
            </li>
            <li>
              <a
                href="https://classic.letsplaybingo.io"
                target="_blank"
                rel="noreferrer">
                Classic
              </a>
            </li>
          </ul>
        </div>
        <div className="col shrink text-right margin-left-lg final-element">
          <div id="google_translate_element"></div>
        </div>
      </div>
    </header>
  );
}
