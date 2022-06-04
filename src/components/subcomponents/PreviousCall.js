const PreviousCall = ({ props }) => {
  const previousCall = props;
  if (previousCall) {
    let numbers = ["0"];
    if (Object.prototype.hasOwnProperty.call(previousCall, "number")) {
      numbers = previousCall.number.toString().split("");
    }
    if (numbers.length === 1) {
      return (
        <div className="col shrink previous-call-display text-center">
          <div className="callNumber notranslate">
            <div>
              <span>&nbsp;</span>
              <span>{numbers[0]}</span>
            </div>
          </div>
          <div className="callNumber-text uppercase">Previous Call</div>
        </div>
      );
    } else {
      return (
        <div className="col shrink previous-call-display text-center">
          <div className="callNumber notranslate">
            {numbers.map((number, index) => (
              <span key={"call" + number + index}>{number}</span>
            ))}
          </div>
          <div className="callNumber-text uppercase">Previous Call</div>
        </div>
      );
    }
  } else {
    return (
      <div className="col shrink previous-call-display text-center">
        <div className="callNumber notranslate">
          <div>
            <span>&nbsp;</span>
            <span>&nbsp;</span>
          </div>
        </div>
        <div className="callNumber-text uppercase">Previous Call</div>
      </div>
    );
  }
};
export default PreviousCall;
