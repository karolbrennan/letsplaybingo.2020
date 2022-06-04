const TotalCalls = ({ props }) => {
  let numbers = props.toString().split("");
  if (numbers.length === 1) {
    return (
      <div className="col shrink total-call-display text-center">
        <div className="callNumber notranslate">
          <div>
            <span>&nbsp;</span>
            <span>{numbers[0]}</span>
          </div>
        </div>
        <div className="callNumber-text uppercase">Total Calls</div>
      </div>
    );
  } else {
    return (
      <div className="col shrink total-call-display text-center">
        <div className="callNumber notranslate">
          {numbers.map((number, index) => (
            <span key={"numDisplay" + number + index}>{number}</span>
          ))}
        </div>
        <div className="callNumber-text uppercase">Total Calls</div>
      </div>
    );
  }
};
export default TotalCalls;
