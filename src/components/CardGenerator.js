import React from 'react';
import Select from 'react-select';
import BingoCard from './BingoCard';

class CardGenerator extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      generatedCards: [],
      numberOfCards: null,
      blackWhite: false,
      color: null,
      perPage: null
    }
    window.addEventListener("beforeprint", this.printCards);
  }

  generateBingoNumbers = () => {
    let letters = ["B", "I", "N", "G", "O"];
    let numbers = {};
    let count = 1;
    letters.forEach((letter) => {
      numbers[letter] = [];
      for(let i = 1; i <= 15; i++) {
        numbers[letter].push(count);
        count++;
      }
    })
    return numbers;
  }

  handleNumberSelect = (event) => {
    this.setState({numberOfCards: parseInt(event.value)});
  }
  handleColorSelect = (event) => {
    this.setState({color: event.value});
  }
  handlePerPageSelect = (event) => {
    this.setState({perPage: event});
  }
  handleBWCheckbox = (e) => {
    this.setState({blackWhite: e.currentTarget.checked});
  }

  handleButton = (event) => {
    let cards = [];
    for(let i = 1; i <= this.state.numberOfCards; i++){
      cards.push(this.generateCard());
    }
    this.setState({generatedCards: cards});
  }

  generateCard = () => {
    let numbers = this.generateBingoNumbers();
    let card = {};
    Object.keys(numbers).map(letter => {
      let chosenNumbers = [];
      for(let i = 0; i<5; i++){
        chosenNumbers.push(numbers[letter].splice(Math.floor(Math.random()*numbers[letter].length), 1));
      }
      card[letter] = chosenNumbers;
      return letter;
    });
    return card;
  }

  printCards = () => {
    let style = document.createElement('style');
    switch(this.state.perPage.value){
      case "2":
        style.appendChild(document.createTextNode('@page { orientation: landscape; size: landscape; margin: 1in .5in; }'));
        break;
      case "4":
        style.appendChild(document.createTextNode('@page { orientation: portrait; size: portrait; margin: 1in .5in; }'));
        break;
      case "6":
        style.appendChild(document.createTextNode('@page { orientation: landscape; size: landscape; margin: 0.4in 0.25in; }'));
        break;
      default:
        style.appendChild(document.createTextNode('@page { orientation: portrait; size: portrait; margin: 1in .5in; }'));
        break;
    }
    document.head.appendChild(style);
  }

  get perPageOptions() {
    let options = [
      {value: "2", label: "2"},
      {value: "4", label: "4"},
      {value: "6", label: "6"}
    ];
    return options;
  }

  get numberOfCardsOptions() {
    let options = [];
    for(let i = 0; i <= 100; i++){
      options.push({value: i.toString(), label: i.toString()});
    }
    return options;
  }

  get colorOptions(){
    return [
      {value: "red", label: "red"},
      {value: "orange", label: "orange"},
      {value: "yellow", label: "yellow"},
      {value: "green", label: "green"},
      {value: "blue", label: "blue"},
      {value: "purple", label: "purple"},
      {value: "pink", label: "pink"},
      {value: "aqua", label: "aqua"},
      {value: "gray", label: "gray"},
      {value: "brown", label: "brown"}
    ]
  }

  get sectionClasses() {
    let classes = "pale-gray-bg " + this.state.blackWhite === "true" ? "print-bw " : "print-color ";
    if(this.state.perPage !== null){
      switch(this.state.perPage.value){
        case "2":
          classes+= 'print-two ';
          break;
        case "4":
          classes+= 'print-four ';
          break;
        case "6":
          classes+= 'print-six ';
          break;
        default:
          classes+= 'print-four ';
          break;
      }
    }
    return classes;
  }

  get generateButtonDisabled(){
    return this.state.numberOfCards === null || this.state.color === null;
  }

  render() {
    return(
      <section className={this.sectionClasses}>
        <div className="row no-print">
          <div className="col padding-xxlg">
            <h1>Card Generator</h1>
            <p>Generate your own cards to print for playing at home! Simply choose a number and a color and click Generate!</p>
            <p className="medium-text">Printing your cards will default to color and 4 cards per page. Use the options below to change these settings. <br/>
              Printing 2 per page will result in larger cards for people who like bigger cards or have vision impairment.</p>
          
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
                <button className="primaryBtn" onClick={this.handleButton.bind(this)} disabled={this.generateButtonDisabled}>Generate Cards</button>
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
                <label className={this.state.blackWhite ? 'toggle checked' : 'toggle'}>
                  <span className="toggle-span"></span>
                  <span>Print in Black/White</span>
                  <input type="checkbox" onChange={this.handleBWCheckbox} checked={this.state.blackWhite}></input>
                </label>
              </div>
              <div className="col padding-horizontal-md text-right">
                <button data-visibility={this.state.generatedCards.length > 0 ? 'show' : 'hide'} className="altBtn" onClick={() => {window.print();return false;}}>Print Cards</button>
              </div>
            </div>
          </div>
        </div>
        <div className="row card-block justify-center margin-vertical-lg">
            <div className="col">
              {this.state.generatedCards.map((card, index) => {
                  return( 
                    <div data-color={this.state.blackWhite ? 'dk-gray' : this.state.color} className="card" key={"a" + index}>
                      <BingoCard card={card} />
                    </div>
                  )
                })}
            </div>
          </div>
      </section>
    )
  }
}

export default CardGenerator;