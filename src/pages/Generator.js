import React from "react";
import BingoCard from "../components/BingoCard";
import Select from "../components/Select";
import Toggle from "../components/Toggle";
import { getRandomNumberInRange } from "../helpers/Utilities";

const perPageOptions = [
  { value: "2", label: "2" },
  { value: "4", label: "4" },
  { value: "6", label: "6" },
];

const colorOptions = [
  { value: "red", label: "red" },
  { value: "orange", label: "orange" },
  { value: "yellow", label: "yellow" },
  { value: "green", label: "green" },
  { value: "blue", label: "blue" },
  { value: "purple", label: "purple" },
  { value: "pink", label: "pink" },
  { value: "aqua", label: "aqua" },
  { value: "gray", label: "gray" },
  { value: "brown", label: "brown" },
];

class Generator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      generatedCards: [],
      numberOfCards: "4",
      blackWhite: false,
      color: "blue",
      perPage: null,
    };
    this.numberOfCardsOptions = [];
    for (let i = 0; i <= 100; i++) {
      this.numberOfCardsOptions.push({
        value: i.toString(),
        label: i.toString(),
      });
    }
    window.addEventListener("beforeprint", this.printCards);
  }

  componentDidMount() {
    document.title = "Let's Play Bingo! | Card Generator";
    document.addEventListener("cardoptions", this.handleCardOptionUpdates);
  }

  componentWillUnmount() {
    document.removeEventListener("cardoptions", this.handleCardOptionUpdates);
  }

  handleCardOptionUpdates = (event) => {
    const stateObj = {};
    if (event.detail.property === "numberOfCards") {
      stateObj[event.detail.property] = parseInt(event.detail.value);
    } else {
      stateObj[event.detail.property] = event.detail.value;
    }
    this.setState(stateObj);
  };

  handleButton = (event) => {
    let cards = [];
    for (let i = 1; i <= this.state.numberOfCards; i++) {
      cards.push(this.generateCard());
    }
    this.setState({ generatedCards: cards });
    this.appendBreaks();
  };

  appendBreaks = () => {
    window.setTimeout(() => {
      const elements = document.querySelectorAll(".endOfRow");
      elements.forEach((element) => {
        const breakDiv = document.createElement("div");
        breakDiv.classList.add("break");
        element.after(breakDiv);
      });
    }, 10);
  };

  generateCard = () => {
    const columns = ["B", "I", "N", "G", "O"];
    let card = {};
    columns.map((letter, index) => {
      let chosenNumbers = [];
      let min = index === 0 ? 1 : index * 5 * 3 + 1;
      let max = (index + 1) * 3 * 5;
      for (let i = 0; i < 5; i++) {
        chosenNumbers.push(getRandomNumberInRange(min, max, chosenNumbers));
      }
      card[letter] = chosenNumbers;
      return letter;
    });
    return card;
  };

  printCards = () => {
    let style = document.createElement("style");
    switch (this.state.perPage) {
      case "2":
        style.appendChild(
          document.createTextNode(
            "@page { orientation: landscape; size: 11in 8.5in; margin-top:2in; margin-bottom: 2in; margin-left: .5in; margin-right: .5in; }"
          )
        );
        break;
      case "4":
        style.appendChild(
          document.createTextNode(
            "@page { orientation: portrait; size: 8.5in 11in; margin-top: 2in; margin-bottom: 2in; margin-left: .25in; margin-right: .25in; }"
          )
        );
        break;
      case "6":
        style.appendChild(
          document.createTextNode(
            "@page { orientation: landscape; size: 11in 8.5in; margin-top: 1in; margin-bottom: 1in; margin-left: .25in; margin-right: .25in; }"
          )
        );
        break;
      default:
        style.appendChild(
          document.createTextNode(
            "@page { orientation: portrait; size: 8.5in 11in; margin-top: 2in; margin-bottom: 2in; margin-left: .25in; margin-right: .25in; }"
          )
        );
        break;
    }
    document.head.appendChild(style);
  };

  get sectionClasses() {
    let classes =
      this.state.blackWhite === "true" ? "print-bw " : "print-color ";
    if (this.state.perPage !== null) {
      switch (this.state.perPage.toString()) {
        case "2":
          classes += "print-two ";
          break;
        case "4":
          classes += "print-four ";
          break;
        case "6":
          classes += "print-six ";
          break;
        default:
          classes += "print-four ";
          break;
      }
    }
    return classes;
  }

  get generateButtonDisabled() {
    return this.state.numberOfCards === null || this.state.color === null;
  }

  render() {
    return (
      <section className={this.sectionClasses}>
        <div className="row no-print">
          <div className="col grow">
            <h1>Card Generator</h1>
            <p>
              Generate your own cards to print for playing at home! Simply
              choose a number and a color and click Generate!
            </p>
            <p className="medium-text">
              Printing your cards will default to color and 4 cards per page.
              Use the options below to change these settings. <br />
              Printing 2 per page will result in larger cards for people who
              like bigger cards or have vision impairment.
            </p>

            <div className="row align-center justify-start">
              <div className="col colspan2 padding-horizontal-md">
                <Select
                  show={true}
                  eventName="cardoptions"
                  id="numberOfCards"
                  label="Number of Cards"
                  name="numberOfCards"
                  options={this.numberOfCardsOptions}
                  value={this.state.numberOfCards}
                />
              </div>
              <div className="col colspan2 padding-horizontal-md">
                <Select
                  show={true}
                  eventName="cardoptions"
                  id="color"
                  label="Card Colors"
                  name="color"
                  options={colorOptions}
                  value={this.state.color}
                />
              </div>
              <div className="col shrink no-text-wrap padding-horizontal-md margin-top-md">
                <button
                  className="primaryBtn"
                  onClick={this.handleButton.bind(this)}
                  disabled={this.generateButtonDisabled}>
                  Generate Cards
                </button>
              </div>
            </div>
            <div
              className={
                this.state.generatedCards.length > 0
                  ? "row align-center margin-top-lg"
                  : "hide"
              }>
              <h5>Printing Options</h5>
              <div className="row gutters-sm align-center justify-start">
                <div className="col colspan1">
                  <Select
                    show={true}
                    eventName="cardoptions"
                    id="perPage"
                    label="Cards Per Page"
                    name="perPage"
                    options={perPageOptions}
                    value={this.state.perPage}
                  />
                </div>
                <div className="col padding-top-md">
                  <Toggle
                    eventName="cardoptions"
                    label="Print in Black & White"
                    name="blackWhite"
                    value={this.state.blackWhite}
                  />
                </div>
                <div className="col shrink padding-horizontal-md padding-top-md">
                  <button
                    className="altBtn"
                    onClick={() => {
                      window.print();
                      return false;
                    }}>
                    Print Cards
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row card-block justify-center margin-vertical-lg">
          <div className="col text-center">
            {this.state.generatedCards.map((card, index) => {
              return (
                <div
                  data-color={
                    this.state.blackWhite ? "dk-gray" : this.state.color
                  }
                  className={
                    (index + 1) % parseInt(this.state.perPage) === 0
                      ? "card endOfRow"
                      : "card"
                  }
                  key={"a" + index}>
                  <BingoCard card={card} />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }
}

export default Generator;
