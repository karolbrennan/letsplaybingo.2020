import React from "react";
import { Link } from "react-router-dom";

/**
 * Renders the footer
 *
 * @param   {Object}  props  Includes boolean for hideFooter
 *
 * @return  {JSX}         Returns the footer element
 */
export default function Footer(props) {
  return (
    <footer className={props.hideFooter ? "hide" : "light-links"}>
      <div className="row text-center">
        <div className="col">
          <p>For entertainment purposes only.</p>
          <p className="notranslate">
            &copy; 2017 - {new Date().getFullYear()} &nbsp;
            <a href="https://agirlcreatedllc">A Girl Created This, LLC</a>
          </p>
          <p>
            <Link to="/releases">Release Notes</Link>
            <span className="margin-horizontal-sm">|</span>
            <Link to="/terms">Terms of Use</Link>
            <span className="margin-horizontal-sm">|</span>
            <Link to="/privacy">Cookies &amp; Privacy Policy</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
