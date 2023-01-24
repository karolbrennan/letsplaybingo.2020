import React from "react";
import { NavLink } from "react-router-dom";
import { dispatchCustomEvent } from "../helpers/Utilities";

/**
 * Menu class
 * Renders the navigational menu that's used across the site
 * Maintains a state for indicating if the menu is open or not
 * Listens for the settings panel to be opened, if it is, it closes this menu
 */
class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
    };
  }

  componentDidMount() {
    document.addEventListener("settingspanel-open", () => {
      this.setState({ menuOpen: false });
    });
  }

  componentWillUnmount() {
    document.removeEventListener("settingspanel-open", () => {
      this.setState({ menuOpen: false });
    });
  }

  toggleMenu = (event) => {
    this.setState({ menuOpen: !this.state.menuOpen });
    dispatchCustomEvent("menu-open", !this.state.menuOpen);
  };

  render() {
    return (
      <div>
        <div
          className={
            this.state.menuOpen === true ? "backdrop" : "backdrop hide"
          }
          onClick={this.toggleMenu}></div>
        <div className="relative">
          <div
            className={
              this.state.menuOpen === true
                ? "menu-container open"
                : "menu-container closed"
            }>
            <button
              className="icon-button"
              title="Menu"
              onClick={this.toggleMenu}>
              <i
                className={
                  this.state.menuOpen === true
                    ? "fi fi-br-cross"
                    : "fi fi-br-menu-burger"
                }
              />
            </button>
            <div className="menu-dropdown">
              <ul className="menu">
                <li>
                  <NavLink
                    to="/"
                    style={({ isActive }) => ({
                      className: isActive ? "active" : "",
                    })}
                    onClick={this.toggleMenu}>
                    <i className="fi fi-br-gamepad" />
                    Bingo Caller
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/play"
                    style={({ isActive }) => ({
                      className: isActive ? "active" : "",
                    })}
                    onClick={this.toggleMenu}>
                    <i className="fi fi-br-caret-circle-right" />
                    Play Along
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/generator"
                    style={({ isActive }) => ({
                      className: isActive ? "active" : "",
                    })}
                    onClick={this.toggleMenu}>
                    <i className="fi fi-br-download" />
                    Get Bingo Cards
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/patterns"
                    style={({ isActive }) => ({
                      className: isActive ? "active" : "",
                    })}
                    onClick={this.toggleMenu}>
                    <i className="fi fi-br-grid" />
                    Patterns
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/help"
                    style={({ isActive }) => ({
                      className: isActive ? "active" : "",
                    })}
                    onClick={this.toggleMenu}>
                    <i className="fi fi-br-interrogation" />
                    Help
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/contact"
                    style={({ isActive }) => ({
                      className: isActive ? "active" : "",
                    })}
                    onClick={this.toggleMenu}>
                    <i className="fi fi-br-envelope" />
                    Contact
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/about"
                    style={({ isActive }) => ({
                      className: isActive ? "active" : "",
                    })}
                    onClick={this.toggleMenu}>
                    <i className="fi fi-br-info" />
                    About
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/releases"
                    style={({ isActive }) => ({
                      className: isActive ? "active" : "",
                    })}
                    onClick={this.toggleMenu}>
                    <i className="fi fi-br-info" />
                    Release Notes
                  </NavLink>
                </li>
                <li className="separator">
                  <a
                    href="https://classic.letsplaybingo.io"
                    target="_blank"
                    rel="noreferrer"
                    onClick={this.toggleMenu}>
                    <i className="fi fi-br-stars" />
                    Classic
                  </a>
                </li>
                <li>
                  <a
                    href="https://previous.letsplaybingo.io"
                    target="_blank"
                    rel="noreferrer"
                    onClick={this.toggleMenu}>
                    <i className="fi fi-br-time-past" />
                    Previous Version
                  </a>
                </li>
                <li>
                  <a
                    href="https://90ball.letsplaybingo.io"
                    target="_blank"
                    rel="noreferrer"
                    onClick={this.toggleMenu}>
                    <i className="fi fi-br-sparkles" />
                    90 Ball
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Menu;
