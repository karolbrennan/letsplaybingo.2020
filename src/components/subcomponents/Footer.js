export default function Footer() {
  return (
    <footer>
      <div className="container row three-cols align-center">
        <div className="col">
          <div className="addthis_inline_share_toolbox"></div>
        </div>
        <div className="col text-center">
          &copy; 2017 - {new Date().getFullYear()}{" "}
          <a href="mailto:hello@letsplaybingo.io">Let's Play Bingo</a>
        </div>
        <div className="col text-right">
          For entertainment purposes only.
          <br />
          <a href="/releases">Release Notes</a> |{" "}
          <a href="/terms">Terms of Use</a> |{" "}
          <a href="/privacy">Cookies &amp; Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}
