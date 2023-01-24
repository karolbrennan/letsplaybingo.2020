import React from "react";
import BingoCard from "../components/BingoCard";
import Select from "../components/Select";
import { getRandomNumberInRange } from "../helpers/Utilities";

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

const cardSizeOptions = [
  { value: "small", label: "small" },
  { value: "medium", label: "medium" },
  { value: "large", label: "large" },
  { value: "xlarge", label: "xlarge" },
];

class Play extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      generatedCards: [],
      numberOfCards: "6",
      cardSize: "small",
      color: "blue",
      dauber: "yellow",
    };
    this.numberOfCardsOptions = [];
    for (let i = 0; i <= 100; i++) {
      this.numberOfCardsOptions.push({
        value: i.toString(),
        label: i.toString(),
      });
    }
  }

  componentDidMount() {
    document.title = "Let's Play Bingo! | Play Along";
    document.addEventListener("playalong", this.handleCardOptionUpdates);
  }
  componentWillUnmount() {
    document.removeEventListener("playalong", this.handleCardOptionUpdates);
  }

  clearCards = () => {
    document.querySelectorAll(".daubed").forEach((element) => {
      element.classList.remove("daubed");
    });
  };
  handleCardOptionUpdates = (event) => {
    const stateObj = {};
    if (event.detail.property === "numberOfCards") {
      stateObj[event.detail.property] = parseInt(event.detail.value);
    } else {
      stateObj[event.detail.property] = event.detail.value;
    }
    this.setState(stateObj);
  };

  handleButton = () => {
    let cards = [];
    for (let i = 1; i <= this.state.numberOfCards; i++) {
      cards.push(this.generateCard());
    }
    this.setState({ generatedCards: cards });
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

  get generateButtonDisabled() {
    return this.state.numberOfCards === null || this.state.color === null;
  }

  get sectionClasses() {
    return `play-along ${this.state.cardSize} ${this.state.dauber}-dauber`;
  }

  render() {
    return (
      <section className={this.sectionClasses}>
        <div className="row">
          <div className="col grow">
            <h1>Play Along!</h1>
            <p>
              Now you can play along by marking digital cards right on the
              screen!
            </p>

            <div className="row align-center justify-start">
              <div className="col colspan2 padding-horizontal-md">
                <Select
                  show={true}
                  eventName="playalong"
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
                  eventName="playalong"
                  id="color"
                  label="Card Colors"
                  name="color"
                  options={colorOptions}
                  value={this.state.color}
                />
              </div>
              <div className="col colspan2 padding-horizontal-md">
                <Select
                  show={true}
                  eventName="playalong"
                  id="cardSize"
                  label="Card Size"
                  name="cardSize"
                  options={cardSizeOptions}
                  value={this.state.cardSize}
                />
              </div>
              <div className="col colspan2 padding-horizontal-md">
                <Select
                  show={true}
                  eventName="playalong"
                  id="dauber"
                  label="Dauber Colors"
                  name="dauber"
                  options={colorOptions}
                  value={this.state.dauber}
                />
              </div>
            </div>
            <div className="row align-center justify-start">
              <div className="col shrink no-text-wrap padding-horizontal-md margin-top-md">
                <button
                  className="primary-button"
                  onClick={this.handleButton.bind(this)}
                  disabled={this.generateButtonDisabled}>
                  Generate Cards
                </button>
              </div>
              <div className="col shrink no-text-wrap padding-horizontal-md margin-top-md">
                <button
                  className="secondary-button"
                  onClick={this.clearCards.bind(this)}>
                  Clear Cards
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row card-block justify-center margin-vertical-lg">
          <div className="col text-center">
            {this.state.generatedCards.map((card, index) => {
              return (
                <div
                  data-color={this.state.color}
                  className="card"
                  key={"a" + index}>
                  <BingoCard
                    card={card}
                    daubable={true}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }
}

export default Play;
