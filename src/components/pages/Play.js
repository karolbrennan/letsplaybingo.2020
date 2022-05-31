import React from "react";
import Select from "react-select";
import "../../sass/play.scss";
/**
 * Renders the play along component
 * This allows users to generate bingo cards
 * that they can then daub on screen to play along
 */
class Play extends React.Component {
  /**
   * constructor
   *
   * @param   {Object}  props
   */
  constructor(props) {
    super(props);
    let savedValues = localStorage.getItem("letsplaybingo-cards");
    if (savedValues) {
      this.state = JSON.parse(savedValues);
    } else {
      this.state = {
        dauberColor: "blue", // color of dauber
        cardColor: null, // color of the generated cards
        generatedCards: [], // array of generated cards
        originalCards: [],
        numberOfCards: null, // number of cards to generate
      };
    }
  }

  componentDidUpdate() {
    localStorage.setItem("letsplaybingo-cards", JSON.stringify(this.state));
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
  handleNumberOfCardsSelect = (event) => {
    this.setState({ numberOfCards: parseInt(event.value) });
  };

  /**
   * Handles the card color selection
   *
   * @param   {Event}  event  change event from the card color select
   */
  handleCardColorSelect = (event) => {
    this.setState({ cardColor: event.value });
  };

  /**
   * Handles the dauber color selection
   *
   * @param   {Event}  event  change event from the dauber color select
   */
  handleDauberColorSelect = (event) => {
    this.setState({ dauberColor: event.value });
  };

  /**
   * Handles the generate button click event
   *
   * @param   {Event}  event  click event from the generate button
   */
  generateCards = (event) => {
    let cards = [];
    for (let i = 1; i <= this.state.numberOfCards; i++) {
      let card = { id: "card" + i };
      card.card = this.generateCard();
      cards.push(card);
    }
    this.setState({ generatedCards: cards, orginalCards: [...cards] });
  };

  /**
   * Generates a single bingo card
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
      let numberObjects = [];
      chosenNumbers.forEach((number) => {
        numberObjects.push({ number: number[0], daubed: false });
      });
      // add the chosen numbers to the card
      card[letter] = numberObjects;
      // return the letter
      return letter;
    });
    // return the generated card
    return card;
  };

  handleDaub = (card, letter, number) => {
    let updatedCards = [];
    this.state.generatedCards.forEach((generatedCard) => {
      if (generatedCard.id === card.id) {
        Object.keys(generatedCard.card[letter]).forEach((space) => {
          const cardSpace = generatedCard.card[letter][space];
          if (cardSpace.number === number) {
            generatedCard.card[letter][space].daubed =
              !generatedCard.card[letter][space].daubed;
          }
        });
      }
      updatedCards.push(generatedCard);
    });
    this.setState({ generatedCards: updatedCards });
  };

  clearCards = () => {
    let clearedCards = [];
    this.state.generatedCards.forEach((card) => {
      Object.keys(card.card).forEach((letter) => {
        card.card[letter].forEach((number, index) => {
          card.card[letter][index].daubed = false;
        });
      });
      clearedCards.push(card);
    });
    this.setState({ generatedCards: clearedCards });
  };

  /**
   * Returns the options list for number of cards selection
   *
   * @return  {Array}  List of available options
   */
  get numberOfCardsOptions() {
    let options = [];
    for (let i = 1; i <= 100; i++) {
      options.push({ value: i.toString(), label: i.toString() });
    }
    return options;
  }

  /**
   * Returns an option list for colors
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
   * Returns a JSX element representing a freespace
   *
   * @return  {JSX}  [return description]
   */
  get freeSpace() {
    return (
      <div className="freespace">
        <span>Free</span>
        <span>Space</span>
      </div>
    );
  }

  get cardColor() {
    let returnValue = null;
    this.colorOptions.forEach((color) => {
      if (color.value === this.state.cardColor) {
        returnValue = color;
      }
    });
    return returnValue;
  }

  get dauberColor() {
    let returnValue = null;
    this.colorOptions.forEach((color) => {
      if (color.value === this.state.dauberColor) {
        returnValue = color;
      }
    });
    return returnValue;
  }

  get numberOfCards() {
    let returnValue = null;
    if (this.state.numberOfCards !== null) {
      this.numberOfCardsOptions.forEach((number) => {
        if (number.value === this.state.numberOfCards.toString()) {
          returnValue = number;
        }
      });
    }
    return returnValue;
  }

  /**
   * Renders the UI for generating cards
   *
   * @return  {JSX}  Card Generator
   */
  render() {
    return (
      <section className="page padding-bottom-xxlg">
        <div className="container">
          <div className="row">
            <div className="col">
              <h1>Play Along!</h1>
              <p>
                Generate your own cards to play along right on the screen! Just
                make your selections and click generate!
              </p>
              <p className="medium-text">
                Once your cards are generated, simply click on the numbers to
                daub them! Once you get a bingo, if you're playing through a
                virtual meeting app you can share your screen to show that
                you've got a valid bingo!
              </p>

              <div className="row justify-start align-center extra-pale-gray-bg padding-xlg">
                <div className="col shrink padding-horizontal-md">
                  <Select
                    className="number-select"
                    placeholder="Number of Cards"
                    value={this.numberOfCards}
                    onChange={this.handleNumberOfCardsSelect}
                    options={this.numberOfCardsOptions}
                  />
                </div>
                <div className="col shrink padding-horizontal-md">
                  <Select
                    className="number-select"
                    placeholder="Card Color"
                    value={this.cardColor}
                    onChange={this.handleCardColorSelect}
                    options={this.colorOptions}
                  />
                </div>
                <div className="col shrink padding-horizontal-md margin-right-xlg">
                  <button
                    className="primary-button"
                    onClick={this.generateCards}
                    disabled={this.generateButtonDisabled}>
                    Generate Cards
                  </button>
                </div>
                <div className="col shrink padding-horizontal-md">
                  <Select
                    className="number-select"
                    placeholder="Dauber Color"
                    value={this.dauberColor}
                    onChange={this.handleDauberColorSelect}
                    options={this.colorOptions}
                  />
                </div>
                <div className="col shrink padding-horizontal-md margin-right-xlg">
                  <button
                    className="primary-button"
                    onClick={this.clearCards}
                    disabled={!this.state.generatedCards}>
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
                    data-color={this.state.cardColor}
                    className="card"
                    key={"a" + index}>
                    <div className="row">
                      {Object.keys(card.card).map((letter) => (
                        <div
                          className="col"
                          key={"let" + letter}>
                          <div className="card-letter">{letter}</div>
                          <div className="card-numbers">
                            {Object.values(card.card[letter]).map(
                              (space, index) => (
                                <div
                                  className="card-number"
                                  key={letter + space.number}>
                                  <button
                                    onClick={this.handleDaub.bind(
                                      this,
                                      card,
                                      letter,
                                      space.number
                                    )}>
                                    <span
                                      className={
                                        space.daubed === true
                                          ? this.state.dauberColor +
                                            " space daubed "
                                          : "space"
                                      }>
                                      {/* If we are looking at the N column, check if it's the middle space (free space) */}
                                      {letter === "N" && index === 2
                                        ? this.freeSpace
                                        : space.number}
                                    </span>
                                  </button>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Play;
