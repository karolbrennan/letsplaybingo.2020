import React from "react";
import { NavLink } from "react-router-dom";
import { dispatchCustomEvent } from "../helpers/Utilities";
import Menu from "./Menu";

/**
 * Header class
 * Renders the header of the site
 * Listens for the settings panel to be toggled and uses a state to determine if it is.
 */
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      settingsPanelOpen: false,
    };
  }

  toggleSettingsPanel = () => {
    dispatchCustomEvent("togglesettingspanel", !this.state.settingsPanelOpen);
    this.setState({ settingsPanelOpen: !this.state.settingsPanelOpen });
  };

  render() {
    return (
      <header>
        <div className="row gutters-sm justify-spread no-wrap align-center">
          <div className="col grow text-left">
            <div className="header-icon">
              <button
                className="icon-button"
                title="Home"
                onClick={() => {
                  window.open("/", "_top");
                }}>
                <svg
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  viewBox="0 0 512 512">
                  <path
                    d="M462,115.6L319.5,19.4c-38.3-26-88.6-26-126.9,0L50,115.6c-31.3,21.1-50,56.3-50,94.1v188.9C0.1,461.2,50.8,511.9,113.5,512
	h285.1c62.6-0.1,113.4-50.8,113.5-113.5V209.6C512,171.9,493.3,136.7,462,115.6z M448,398.5c0,27.3-22.2,49.4-49.5,49.5H113.5
	C86.2,448,64,425.8,64,398.5V209.6c0-16.4,8.2-31.8,21.8-41l142.5-96.1c16.7-11.3,38.6-11.3,55.3,0l142.5,96.2
	c13.6,9.1,21.8,24.5,21.9,40.9V398.5z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="col shrink header-icon">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "show" : "hide")}>
              <button
                className="icon-button"
                title="Settings"
                onClick={this.toggleSettingsPanel}>
                <i className="fi fi-br-settings-sliders" />
              </button>
            </NavLink>
          </div>
          <div className="col shrink header-icon">
            <div className="translate-button primary-button icon-button">
              <i className="fi fi-br-world" />
              <div
                id="google_translate_element"
                title="Translation"></div>
            </div>
          </div>
          <div className="col shrink header-icon">
            <Menu />
          </div>
        </div>
      </header>
    );
  }
}
export default Header;
