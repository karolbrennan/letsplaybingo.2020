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

const Stacked = (props) => {
  return (
    <main className={props.layout}>
      <div className="row gutters-md">
        <div className="col grow">
          <BingoBoard
            board={props.board}
            manual={props.settings.manual}
          />
        </div>
      </div>
      <div className="margin-xxlg"></div>
      <div className="row align-stretch justify-start gutters-md">
        <div className="col shrink">
          <CallInfo
            totalCalls={props.totalCalls}
            previousCall={props.previousCall}
          />
        </div>
        <div className="col">
          <CurrentPattern
            pattern={props.settings.pattern}
            showSelect={false}
            showTitle={
              props.settings.pattern !== "blank" &&
              props.settings.pattern.value !== "blank"
            }
          />
        </div>
        <div className="col shrink padding-horizontal-md">
          <Link to="/">{getLogo()}</Link>
          <Controls
            automatic={props.settings.automaticCalling}
            popout={props.settings.popOutControls}
            running={props.running}
            settings={props.settings}
            totalCalls={props.totalCalls}
          />
        </div>
        <div className="col">
          <CurrentCall
            ball={props.currentCall}
            showTitle={true}
          />
        </div>
        <div className="col grow">
          <PreviousCalls
            balls={props.called}
            numToShow={props.settings.previousCallsToShow}
            orientation="horizontal"
          />
        </div>
        <div className="col shrink">
          <Countdown
            call={props.currentCall?.number}
            delay={props.settings.delay}
            running={props.running}
            totalCalls={props.totalCalls}
          />
        </div>
      </div>
    </main>
  );
};
export default Stacked;
