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

const Vertical = (props) => {
  return (
    <main className={props.layout}>
      <div className="row justify-start gutters-lg">
        <div className="col">
          <BingoBoard
            board={props.board}
            manual={props.settings.manual}
          />
        </div>
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
          <Countdown
            call={props.currentCall?.number}
            delay={props.settings.delay}
            running={props.running}
            totalCalls={props.totalCalls}
          />
          <Controls
            automatic={props.settings.automaticCalling}
            popout={props.settings.popOutControls}
            running={props.running}
            settings={props.settings}
            totalCalls={props.totalCalls}
          />
        </div>
        <div className="col shrink">
          <CurrentCall
            ball={props.currentCall}
            showTitle={true}
          />
          <PreviousCalls
            balls={props.called}
            numToShow={props.settings.previousCallsToShow}
            orientation="vertical"
          />
        </div>
      </div>
    </main>
  );
};
export default Vertical;
