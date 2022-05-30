export default function Footer() {
  return (
    <footer className="light-links">
      <div className="container row three-cols align-start">
        <div className="col">
          <p>Love Let's Play Bingo? Tell your friends!</p>
          <div className="addthis_inline_share_toolbox margin-top-sm"></div>
        </div>
        <div className="col text-center">
          <p>&copy; 2017 - {new Date().getFullYear()}&nbsp;</p>
          <p>
            <a
              href="mailto:hello@letsplaybingo.io"
              className="plain">
              Let's Play Bingo
            </a>
          </p>
        </div>
        <div className="col text-right">
          <p>For entertainment purposes only.</p>
          <p>
            <a
              href="/releases"
              className="plain">
              Release Notes
            </a>{" "}
            |{" "}
            <a
              href="/terms"
              className="plain">
              Terms of Use
            </a>{" "}
            |{" "}
            <a
              href="/privacy"
              className="plain">
              Cookies &amp; Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
