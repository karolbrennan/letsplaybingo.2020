import React from 'react';
import logo from './images/logo.svg';

/**
 * Generates the needed bingo balls
 *
 * @var  {Object}
 */
export const generateBingoBalls = () => {
  let board = {};
  let letters = ["B", "I", "N", "G", "O"];
  let count = 1;
  letters.forEach(letter => {
    board[letter] = [];
    for(let i = 1; i <= 15; i++) {
      let obj = {
        letter: letter,
        color: getColor(letter),
        number: count,
        display: letter + count,
        called: false,
        active: false
      }
      board[letter].push(obj);
      count++;
    }
  })

  function getColor(letter) {
    switch(letter){
      case "B":
        return 'blue';
      case "I": 
        return 'red';
      case "N": 
        return 'white';
      case "G":
        return 'green';
      case "O":
        return 'yellow';
      default:
        return 'white';
    }
  }
  return board;
}

/**
 * Generates a random number between 1-75
 *
 * @var  {Integer}
 */
export const getRandomBingoNumber = () => {
  return Math.floor(Math.random() * 75) + 1;
}

/**
 * Returns language code for use with the speech synthesis api
 *
 * @var  {String}
 */
export const getLanguageText = (text) => {
  switch (text) {
    case 'ar-SA':
      return 'Arabic (Saudi Arabia)';
    case 'cs-CZ':
      return 'Czech (Czech Republic)';
    case 'da-DK':
      return 'Danish (Denmark)';
    case 'de-DE':
      return 'German';
    case 'el-GR':
      return 'Greek (Greece)';
    case 'en':
      return 'English';
    case 'en-AU':
      return 'English (Australia)';
    case 'en-GB':
      return 'UK English';
    case 'en-IE':
      return 'English (Ireland)';
    case 'en-IN':
      return 'English (India)';
    case 'en-US':
      return 'US English';
    case 'en-ZA':
      return 'English (South Africa)';
    case 'es-AR':
      return 'Spanish (Argentina)';
    case 'es-ES':
      return 'Spanish (Spain)';
    case 'es-MX':
      return 'Spanish (Mexico)';
    case 'es-US':
      return 'Spanish (United States)';
    case 'fi-FI':
      return 'Finnish (Finland)';
    case 'fr-CA':
      return 'French (Canada)';
    case 'fr-FR':
      return 'French (France)';
    case 'he-IL':
      return 'Hebrew';
    case 'hi-IN':
      return 'Hindi (India)';
    case 'hu-HU':
      return 'Hungarian (Hungary)';
    case 'id-ID':
      return 'Indonesian';
    case 'it-IT':
      return 'Italian';
    case 'ja-JP':
      return 'Japanese';
    case 'ko-KR':
      return 'Korean (Korea)';
    case 'nb-NO':
      return 'Norwegian (Bokm?l) (Norway)';
    case 'nl-BE':
      return 'Dutch (Belgium)';
    case 'nl-NL':
      return 'Dutch (Netherlands)';
    case 'pl-PL':
      return 'Polish (Poland)';
    case 'pt-PT':
      return 'Portuguese (Portugal)';
    case 'pt-BR':
      return 'Portuguese (Brazil)';
    case 'ro-RO':
      return 'Romanian (Romania)';
    case 'ru-RU':
      return 'Russian (Russia)';
    case 'sk-SK':
      return 'Slovak (Slovakia)';
    case 'sv-SE':
      return 'Swedish';
    case 'th-TH':
      return 'Thai (Thailand)';
    case 'tr-TR':
      return 'Turkish (Turkey)';
    case 'zh-CN':
      return 'Chinese (S)';
    case 'zh-HK':
      return 'Chinese (Hong Kong)';
    case 'zh-TW':
      return 'Chinese (T)';
    default:
      return text;
  }
};

/**
 * Returns a list of preset patterns
 *
 * @var  {Object}
 */
export const getPresetPatterns = () => {
  return [
    { value: "Custom", 
      label: "Custom", 
      pattern: {
        B: [false, false, false, false, false],
        I: [false, false, false, false, false],
        N: [false, false, false, false, false],
        G: [false, false, false, false, false],
        O: [false, false, false, false, false]
      }
    },
    { value: "Regular or 4 Corners",
      label: "Regular or 4 Corners",
      pattern: {
        B: [true, false, false, false, true],
        I: [false, true, false, false, false],
        N: [false, false, true, false, false],
        G: [false, false, false, true, false],
        O: [true, false, false, false, true]
      }
    },
    { value: "Letter X",
      label: "Letter X",
      pattern: {
        B: [true, false, false, false, true],
        I: [false, true, false, true, false],
        N: [false, false, true, false, false],
        G: [false, true, false, true, false],
        O: [true, false, false, false, true]
      }
    },
    { value: "Clover",
      label: "Clover",
      pattern: {
        B: [true, true, false, true, true],
        I: [true, true, false, true, true],
        N: [false, false, true, false, false],
        G: [true, true, false, true, true],
        O: [true, true, false, true, true]
      }
    },
    { value: "Brackets",
      label: "Brackets",
      pattern: {
        B: [true, true, false, true, true],
        I: [true, false, false, false, true],
        N: [false, false, false, false, false],
        G: [true, false, false, false, true],
        O: [true, true, false, true, true]
      }
    },
    { value: "Bow Tie",
      label: "Bow Tie",
      pattern: {
        B: [true, true, true, true, true],
        I: [false, true, true, true, false],
        N: [false, false, true, false, false],
        G: [false, true, true, true, false],
        O: [true, true, true, true, true]
      }
    },
    { value: "Crazy Arrow",
      label: "Crazy Arrow",
      pattern: {
        B: [false, false, false, false, true],
        I: [false, false, false, true, false],
        N: [true, false, true, false, false],
        G: [true, true, false, false, false],
        O: [true, true, true, false, false]
      }
    },
    { value: "Layer Cake",
      label: "Layer Cake",
      pattern: {
        B: [true, false, true, false, true],
        I: [true, false, true, false, true],
        N: [true, false, true, false, true],
        G: [true, false, true, false, true],
        O: [true, false, true, false, true]
      }
    },
    { value: "Postage Stamps",
      label: "Postage Stamps",
      pattern: {
        B: [true, true, false, false, false],
        I: [true, true, false, false, false],
        N: [false, false, false, false, false],
        G: [false, false, false, true, true],
        O: [false, false, false, true, true]
      }
    },
    { value: "Sputnik",
      label: "Sputnik",
      pattern: {
        B: [true, false, false, false, true],
        I: [false, true, true, true, false],
        N: [false, true, true, true, false],
        G: [false, true, true, true, false],
        O: [true, false, false, false, true]
      }
    },
    { value: "Diamond",
      label: "Diamond",
      pattern: {
        B: [false, false, true, false, false],
        I: [false, true, false, true, false],
        N: [true, false, false, false, true],
        G: [false, true, false, true, false],
        O: [false, false, true, false, false]
      }
    },
    { value: "Filled in Diamond",
      label: "Filled in Diamond",
      pattern: {
        B: [false, false, true, false, false],
        I: [false, true, true, true, false],
        N: [true, true, true, true, true],
        G: [false, true, true, true, false],
        O: [false, false, true, false, false]
      }
    },
    { value: "Blackout",
      label: "Blackout",
      pattern: {
        B: [true, true, true, true, true],
        I: [true, true, true, true, true],
        N: [true, true, true, true, true],
        G: [true, true, true, true, true],
        O: [true, true, true, true, true]
      }
    },
    { value: "Crazy L",
      label: "Crazy L",
      pattern: {
        B: [false, false, false, false, true],
        I: [false, false, false, false, true],
        N: [false, false, false, false, true],
        G: [false, false, false, false, true],
        O: [true, true, true, true, true]
      }
    },
    { value: "Crazy T",
      label: "Crazy T",
      pattern: {
        B: [true, true, true, true, true],
        I: [false, false, true, false, false],
        N: [false, false, true, false, false],
        G: [false, false, true, false, false],
        O: [false, false, true, false, false]
      }
    },
    { value: "Dog Bone",
      label: "Dog Bone",
      pattern: {
        B: [false, true, true, true, false],
        I: [false, false, true, false, false],
        N: [false, false, true, false, false],
        G: [false, false, true, false, false],
        O: [false, true, true, true, false]
      }
    },
    { value: "6 Pack",
      label: "6 Pack",
      pattern: {
        B: [true, true, false, false, false],
        I: [true, true, false, false, false],
        N: [true, true, false, false, false],
        G: [false, false, false, false, false],
        O: [false, false, false, false, false]
      }
    },
    { value: "8 Pack",
      label: "8 Pack",
      pattern: {
        B: [false, false, false, true, true],
        I: [false, false, false, true, true],
        N: [false, false, false, true, true],
        G: [false, false, false, true, true],
        O: [false, false, false, false, false]
      }
    },
    { value: "9 Pack",
      label: "9 Pack",
      pattern: {
        B: [false, false, false, false, false],
        I: [false, false, false, false, false],
        N: [false, false, true, true, true],
        G: [false, false, true, true, true],
        O: [false, false, true, true, true]
      }
    },
    { value: "Small Frame",
      label: "Small Frame",
      pattern: {
        B: [false, false, false, false, false],
        I: [false, true, true, true, false],
        N: [false, true, false, true, false],
        G: [false, true, true, true, false],
        O: [false, false, false, false, false]
      }
    },
    { value: "Large Frame",
      label: "Large Frame",
      pattern: {
        B: [true, true, true, true, true],
        I: [true, false, false, false, true],
        N: [true, false, false, false, true],
        G: [true, false, false, false, true],
        O: [true, true, true, true, true]
      }
    },
    { value: "Crazy Kite",
      label: "Crazy Kite",
      pattern: {
        B: [false, false, false, true, true],
        I: [false, false, false, true, true],
        N: [false, false, true, false, false],
        G: [false, true, false, false, false],
        O: [true, false, false, false, false]
      }
    },
    // {
    //   value: "",
    //   label: "",
    //   pattern: {
    //     B: [false, false, false, false, false],
    //     I: [false, false, false, false, false],
    //     N: [false, false, false, false, false],
    //     G: [false, false, false, false, false],
    //     O: [false, false, false, false, false]
    //   },
  ]
}

/**
 * Returns the default bingo ball display
 *
 * @return  {JSX}  JSX element
 */
export const getLogoBallDisplay = () => {
  return (
    <div className="ball-display white relative notranslate">
      <div className="content">
        <span>
          <img src={logo} alt="Lets Play Bingo Logo"/>
        </span>
      </div>
    </div>
  )
}
  
/**
 * Returns a bingo ball display using the selected ball object
 *
 * @return  {JSX}  JSX element
 */
export const getBallDisplay = (ball) => {
  return(
    <div className={"ball-display " + ball.color + " relative notranslate"}>
      <div className="content">
        <span>
          {ball.letter}<br />{ball.number}
        </span>
      </div>
    </div>
  )
}