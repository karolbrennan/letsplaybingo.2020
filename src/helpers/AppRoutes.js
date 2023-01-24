import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { checkCacheForPropertyValue } from "../helpers/CacheManagement";
import Header from "../components/Header";
import Footer from "../components/Footer";

// ----- Pages
import About from "../pages/About";
import Caller from "../pages/Caller";
import Contact from "../pages/Contact";
import Generator from "../pages/Generator";
import Help from "../pages/Help";
import Patterns from "../pages/Patterns";
import Play from "../pages/Play";
import Privacy from "../pages/Privacy";
import ReleaseNotes from "../pages/ReleaseNotes";
import Terms from "../pages/Terms";

class AppRoutes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: "lpb",
      hideFooter: false,
    };
    const cachedSettings = checkCacheForPropertyValue("settings");
    if (cachedSettings !== null) {
      if (Object.prototype.hasOwnProperty.call(cachedSettings, "theme")) {
        this.state.theme = cachedSettings.theme;
      }
      if (Object.prototype.hasOwnProperty.call(cachedSettings, "hideFooter")) {
        this.state.hideFooter = cachedSettings.hideFooter;
      }
    }
    document.addEventListener("settingssaved", this.handleSettingsSaved);
  }

  componentWillUnmount() {
    document.removeEventListener("settingssaved", this.handleSettingsSaved);
  }

  handleSettingsSaved = (event) => {
    const newSettings = event.detail;
    this.setState({
      theme: newSettings.theme,
      hideFooter: newSettings.hideFooter,
    });
  };

  render() {
    return (
      <div className={`body-container ${this.state.theme}`}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route
              path="/about"
              element={<About />}
            />
            <Route
              exact
              path="/"
              element={<Caller />}
            />
            <Route
              path="/generator"
              element={<Generator />}
            />
            <Route
              path="/contact"
              element={<Contact />}
            />
            <Route
              path="/help"
              element={<Help />}
            />
            <Route
              path="/patterns"
              element={<Patterns />}
            />
            <Route
              path="/play"
              element={<Play />}
            />
            <Route
              path="/privacy"
              element={<Privacy />}
            />
            <Route
              path="/releases"
              element={<ReleaseNotes />}
            />
            <Route
              path="/terms"
              element={<Terms />}
            />
          </Routes>
          <Footer hideFooter={this.state.hideFooter} />
        </BrowserRouter>
      </div>
    );
  }
}

export default AppRoutes;
