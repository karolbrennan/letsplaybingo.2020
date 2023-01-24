import React from "react";
import { getLogo } from "../helpers/Utilities";
import { Link } from "react-router-dom";
// Components -----------------------------------------------
import Countdown from "../components/Countdown";
import BingoBoard from "../components/BingoBoard";
import CallInfo from "../components/CallInfo";
import Controls from "../components/Controls";
import CurrentCall from "../components/CurrentCall";
import CurrentPattern from "../components/CurrentPattern";
import PreviousCalls from "../components/PreviousCalls";

const Classic = (props) => {
  return (
    <main className={props.layout}>
      <div className="row no-wrap align-start gutters-md">
        <div className="col shrink">
          <div className="home-link text-center margin-bottom-xlg">
            <Link to="/">{getLogo()}</Link>
          </div>
          <CallInfo
            totalCalls={props.totalCalls}
            previousCall={props.previousCall}
          />
          <CurrentPattern
            pattern={props.settings.pattern}
            showSelect={false}
            showTitle={
              props.settings.pattern !== "blank" &&
              props.settings.pattern.value !== "blank"
            }
          />
          <Controls
            automatic={props.settings.automaticCalling}
            popout={props.settings.popOutControls}
            previousCall={props.previousCall}
            running={props.running}
            settings={props.settings}
            totalCalls={props.totalCalls}
          />
        </div>
        <div className="col grow">
          <BingoBoard
            board={props.board}
            manual={props.settings.manual}
          />
          <div className="margin-xxlg"></div>
          <div className="row justify-center">
            <div
              className={
                props.settings.showCurrentCall ? "col colspan2" : "hide"
              }>
              <CurrentCall
                ball={props.currentCall}
                showTitle={true}
              />
            </div>
            <div
              className={
                props.settings.showPreviousCalls ? "col grow" : "hide"
              }>
              <PreviousCalls
                balls={props.called}
                numToShow={props.settings.previousCallsToShow}
                orientation="horizontal"
              />
            </div>
            <div
              className={
                props.settings.showCountdown ? "col colspan2" : "hide"
              }>
              <Countdown
                call={props.currentCall?.number}
                delay={props.settings.delay}
                running={props.running}
                totalCalls={props.totalCalls}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Classic;
