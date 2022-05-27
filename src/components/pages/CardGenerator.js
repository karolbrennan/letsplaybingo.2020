import React from "react";
import Select from "react-select";
import BingoCard from "../subcomponents/BingoCard";
/**
 * Renders the card generation tool
 * This allows users to generate bingo cards
 * that they can then print and play with
 */
class CardGenerator extends React.Component {
  /**
   * constructor
   *
   * @param   {Object}  props
   */
  constructor(props) {
    super(props);
    this.state = {
      blackWhite: false, // black and white setting
      color: null, // color of the generated cards
      generatedCards: [], // array of generated cards
      numberOfCards: null, // number of cards to generate
      perPage: null,
    };
    // run the print cards method before printing
    window.addEventListener("beforeprint", this.handlePrintPreparation);
  }

  /**
   * Method used to generate the bingo "board" containing numbers 1-75
   *
   * @return  {Object}  Object with all bingo numbers
   */
  generateBingoBoard = () => {
    let letters = ["B", "I", "N", "G", "O"];
    let numbers = {};
    let count = 1;
    letters.forEach((letter) => {
      numbers[letter] = [];
      for (let i = 1; i <= 15; i++) {
        numbers[letter].push(count);
        count++;
      }
    });
    return numbers;
  };

  /**
   * Handler for the number of cards selection
   *
   * @param   {Event}  event  change event from the number of cards select
   */
  handleNumberSelect = (event) => {
    this.setState({ numberOfCards: parseInt(event.value) });
  };

  /**
   * Handles the card color selection
   *
   * @param   {Event}  event  change event from the card color select
   */
  handleColorSelect = (event) => {
    this.setState({ color: event.value });
  };

  /**
   * Handles the selection of per page for printing
   *
   * @param   {Event}  event  change event from perPage select
   */
  handlePerPageSelect = (event) => {
    this.setState({ perPage: event });
  };

  /**
   * Handles the black and white print option checkbox
   *
   * @param   {Event}  e  click event from the black/white checkbox
   */
  handleBWCheckbox = (e) => {
    this.setState({ blackWhite: e.currentTarget.checked });
  };

  /**
   * Handles the generate button click event
   *
   * @param   {Event}  event  click event from the generate button
   */
  handleButton = (event) => {
    let cards = [];
    for (let i = 1; i <= this.state.numberOfCards; i++) {
      cards.push(this.generateCard());
    }
    this.setState({ generatedCards: cards });
  };

  /**
   * Generates bingo cards
   *
   * @return  {Object}  Card object repesenting a bingo card
   */
  generateCard = () => {
    // retrieve the generated bingo board used to select random numbers
    let board = this.generateBingoBoard();
    let card = {}; // object to represent a bingo card
    // loop through the board letter by letter
    Object.keys(board).map((letter) => {
      let chosenNumbers = []; // array to store the 5 selected numbers that will show on our card
      // loop 5 times to choose random numbers to add to the card
      for (let i = 0; i < 5; i++) {
        chosenNumbers.push(
          board[letter].splice(
            Math.floor(Math.random() * board[letter].length),
            1
          )
        );
      }
      // add the chosen numbers to the card
      card[letter] = chosenNumbers;
      // return the letter
      return letter;
    });
    // return the generated card
    return card;
  };

  /**
   * Handles pre-print processing
   * This allows us to add styles as needed to the printing pdf
   * Example: changing the orientation and margins as needed
   */
  handlePrintPreparation = () => {
    let style = document.createElement("style");
    switch (this.state.perPage.value) {
      case "2":
        style.appendChild(
          document.createTextNode(
            "@page { orientation: landscape; size: landscape; margin: 1in .5in; }"
          )
        );
        break;
      case "4":
        style.appendChild(
          document.createTextNode(
            "@page { orientation: portrait; size: portrait; margin: 1in .5in; }"
          )
        );
        break;
      case "6":
        style.appendChild(
          document.createTextNode(
            "@page { orientation: landscape; size: landscape; margin: 0.4in 0.25in; }"
          )
        );
        break;
      default:
        style.appendChild(
          document.createTextNode(
            "@page { orientation: portrait; size: portrait; margin: 1in .5in; }"
          )
        );
        break;
    }
    document.head.appendChild(style);
  };

  /**
   * Returns an option list used for the per page select
   *
   * @return  {Array}  List of available options
   */
  get perPageOptions() {
    let options = [
      { value: "2", label: "2" },
      { value: "4", label: "4" },
      { value: "6", label: "6" },
    ];
    return options;
  }

  /**
   * Returns the options list for number of cards selection
   *
   * @return  {Array}  List of available options
   */
  get numberOfCardsOptions() {
    let options = [];
    for (let i = 0; i <= 100; i++) {
      options.push({ value: i.toString(), label: i.toString() });
    }
    return options;
  }

  /**
   * Returns an option list for card colors
   *
   * @return  {Array}  list of available options
   */
  get colorOptions() {
    return [
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
  }

  /**
   * Returns class names based upon settings used to help apply
   * appropriate styles for printing
   *
   * @return  {String}  class list
   */
  get sectionClasses() {
    let classes =
      "padding-vertical-xxlg pale-gray-bg " + this.state.blackWhite === "true"
        ? "print-bw "
        : "print-color ";
    if (this.state.perPage !== null) {
      switch (this.state.perPage.value) {
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

  /**
   * Getter to determine if the generation button should be disabled
   *
   * @return  {Boolean}  true | false
   */
  get generateButtonDisabled() {
    return this.state.numberOfCards === null || this.state.color === null;
  }

  /**
   * Renders the UI for generating cards
   *
   * @return  {JSX}  Card Generator
   */
  render() {
    return (
      <section className={this.sectionClasses}>
        <div className="container row no-print">
          <div className="col">
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

            <div className="row justify-start align-center extra-pale-gray-bg padding-xlg">
              <div className="col shrink padding-horizontal-md">
                <Select
                  className="number-select"
                  placeholder="Number of Cards"
                  onChange={this.handleNumberSelect}
                  options={this.numberOfCardsOptions}
                />
              </div>
              <div className="col shrink padding-horizontal-md">
                <Select
                  className="number-select"
                  placeholder="Card Colors"
                  onChange={this.handleColorSelect}
                  options={this.colorOptions}
                />
              </div>
              <div className="col shrink padding-horizontal-md margin-right-xlg">
                <button
                  className="primaryBtn"
                  onClick={this.handleButton.bind(this)}
                  disabled={this.generateButtonDisabled}>
                  Generate Cards
                </button>
              </div>
              <div className="col shrink padding-horizontal-lg">
                <h5>Printing Options</h5>
              </div>
              <div className="col shrink padding-horizontal-md">
                <Select
                  className="number-select single"
                  placeholder="Per Page"
                  onChange={this.handlePerPageSelect}
                  options={this.perPageOptions}
                />
              </div>
              <div className="col shrink padding-horizontal-md">
                <label
                  className={
                    this.state.blackWhite ? "toggle checked" : "toggle"
                  }>
                  <span className="toggle-span"></span>
                  <span>Print in Black/White</span>
                  <input
                    type="checkbox"
                    onChange={this.handleBWCheckbox}
                    checked={this.state.blackWhite}></input>
                </label>
              </div>
              <div className="col padding-horizontal-md text-right">
                <button
                  data-visibility={
                    this.state.generatedCards.length > 0 ? "show" : "hide"
                  }
                  className="secondaryBtn"
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
        <div className="row card-block justify-center margin-vertical-lg">
          <div className="col text-center">
            {this.state.generatedCards.map((card, index) => {
              return (
                <div
                  data-color={
                    this.state.blackWhite ? "dk-gray" : this.state.color
                  }
                  className="card"
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

export default CardGenerator;
