/**
 * Returns a list of preset patterns
 *
 * @var  {Object}
 */
export function getPresetPatterns() {
  return [
    {
      value: "Custom",
      label: "Custom",
      unusedLetters: [],
      pattern: {
        B: [false, false, false, false, false],
        I: [false, false, false, false, false],
        N: [false, false, false, false, false],
        G: [false, false, false, false, false],
        O: [false, false, false, false, false],
      },
    },
    {
      value: "6 Pack As Shown",
      label: "6 Pack As Shown",
      unusedLetters: ["G", "O"],
      pattern: {
        B: [true, true, false, false, false],
        I: [true, true, false, false, false],
        N: [true, true, false, false, false],
        G: [false, false, false, false, false],
        O: [false, false, false, false, false],
      },
    },
    {
      value: "6 Pack Anywhere",
      label: "6 Pack Anywhere",
      unusedLetters: [],
      pattern: {
        B: [false, false, false, false, false],
        I: [false, false, false, false, false],
        N: [false, false, false, false, false],
        G: [false, true, true, true, false],
        O: [false, true, true, true, false],
      },
    },
    {
      value: "8 Pack As Shown",
      label: "8 Pack As Shown",
      unusedLetters: ["O"],
      pattern: {
        B: [false, false, false, true, true],
        I: [false, false, false, true, true],
        N: [false, false, false, true, true],
        G: [false, false, false, true, true],
        O: [false, false, false, false, false],
      },
    },
    {
      value: "8 Pack Anywhere",
      label: "8 Pack Anywhere",
      unusedLetters: [],
      pattern: {
        B: [true, true, false, false, false],
        I: [true, true, false, false, false],
        N: [true, true, false, false, false],
        G: [true, true, false, false, false],
        O: [false, false, false, false, false],
      },
    },
    {
      value: "9 Pack As Shown",
      label: "9 Pack As Shown",
      unusedLetters: ["B", "I"],
      pattern: {
        B: [false, false, false, false, false],
        I: [false, false, false, false, false],
        N: [false, false, true, true, true],
        G: [false, false, true, true, true],
        O: [false, false, true, true, true],
      },
    },
    {
      value: "9 Pack Anywhere",
      label: "9 Pack Anywhere",
      unusedLetters: [],
      pattern: {
        B: [false, false, false, false, false],
        I: [true, true, true, false, false],
        N: [true, true, true, false, false],
        G: [true, true, true, false, false],
        O: [false, false, false, false, false],
      },
    },
    {
      value: "Add Subtract",
      label: "Add & Subtract",
      unusedLetters: ["B", "O"],
      pattern: {
        B: [false, false, false, false, false],
        I: [false, true, false, false, true],
        N: [true, true, true, false, true],
        G: [false, true, false, false, true],
        O: [false, false, false, false, false],
      },
    },
    {
      value: "Airplane",
      label: "Airplane",
      unusedLetters: ["N"],
      pattern: {
        B: [false, true, true, true, false],
        I: [false, false, true, false, false],
        N: [false, false, true, false, false],
        G: [true, true, true, true, true],
        O: [false, false, true, false, false],
      },
    },
    {
      value: "Anchor",
      label: "Anchor",
      unusedLetters: [],
      pattern: {
        B: [false, false, false, true, true],
        I: [true, false, false, false, true],
        N: [true, true, true, true, true],
        G: [true, false, false, false, true],
        O: [false, false, false, true, true],
      },
    },
    {
      value: "Arrowhead",
      label: "Arrowhead",
      unusedLetters: ["B", "I"],
      pattern: {
        B: [false, false, false, false, false],
        I: [false, false, false, false, false],
        N: [true, false, false, false, false],
        G: [true, true, false, false, false],
        O: [true, true, true, false, false],
      },
    },
    {
      value: "Blackout",
      label: "Blackout",
      unusedLetters: [],
      pattern: {
        B: [true, true, true, true, true],
        I: [true, true, true, true, true],
        N: [true, true, true, true, true],
        G: [true, true, true, true, true],
        O: [true, true, true, true, true],
      },
    },
    {
      value: "BO",
      label: "B and O",
      unusedLetters: ["I", "N", "G"],
      pattern: {
        B: [true, true, true, true, true],
        I: [false, false, false, false, false],
        N: [false, false, false, false, false],
        G: [false, false, false, false, false],
        O: [true, true, true, true, true],
      },
    },
    {
      value: "Bow Tie",
      label: "Bow Tie",
      unusedLetters: ["N"],
      pattern: {
        B: [true, true, true, true, true],
        I: [false, true, true, true, false],
        N: [false, false, true, false, false],
        G: [false, true, true, true, false],
        O: [true, true, true, true, true],
      },
    },
    {
      value: "Brackets",
      label: "Brackets",
      unusedLetters: ["N"],
      pattern: {
        B: [true, true, false, true, true],
        I: [true, false, false, false, true],
        N: [false, false, false, false, false],
        G: [true, false, false, false, true],
        O: [true, true, false, true, true],
      },
    },
    {
      value: "Broken Frame",
      label: "Broken Frame",
      unusedLetters: ["I", "G"],
      pattern: {
        B: [true, false, true, false, true],
        I: [false, false, false, false, false],
        N: [true, false, false, false, true],
        G: [false, false, false, false, false],
        O: [true, false, true, false, true],
      },
    },
    {
      value: "Candlestick",
      label: "Candlestick",
      unusedLetters: [],
      pattern: {
        B: [true, true, true, false, false],
        I: [false, false, true, false, true],
        N: [true, true, true, true, true],
        G: [false, false, true, false, true],
        O: [true, true, true, false, false],
      },
    },
    {
      value: "Cent Sign",
      label: "Cent Sign",
      unusedLetters: ["B", "O"],
      pattern: {
        B: [false, false, false, false, false],
        I: [false, true, true, true, false],
        N: [true, true, false, true, true],
        G: [false, true, false, true, false],
        O: [false, false, false, false, false],
      },
    },
    {
      value: "Checkerboard",
      label: "Checkerboard",
      unusedLetters: [],
      pattern: {
        B: [true, false, true, false, true],
        I: [false, true, false, true, false],
        N: [true, false, true, false, true],
        G: [false, true, false, true, false],
        O: [true, false, true, false, true],
      },
    },
    {
      value: "Clover",
      label: "Clover",
      unusedLetters: [],
      pattern: {
        B: [false, true, true, true, false],
        I: [true, true, false, true, false],
        N: [true, false, true, true, true],
        G: [true, true, false, true, false],
        O: [false, true, true, true, false],
      },
    },
    {
      value: "Clover Leaf",
      label: "Clover Leaf",
      unusedLetters: ["N"],
      pattern: {
        B: [true, true, false, true, true],
        I: [true, true, false, true, true],
        N: [false, false, false, false, false],
        G: [true, true, false, true, true],
        O: [true, true, false, true, true],
      },
    },
    {
      value: "Champagne Glass",
      label: "Champagne Glass",
      unusedLetters: [],
      pattern: {
        B: [true, false, false, false, false],
        I: [true, true, false, false, true],
        N: [true, true, true, true, true],
        G: [true, true, false, false, true],
        O: [true, false, false, false, false],
      },
    },
    {
      value: "Checkmark",
      label: "Checkmark",
      unusedLetters: ["N"],
      pattern: {
        B: [false, false, true, true, true],
        I: [false, false, false, true, false],
        N: [false, false, true, false, false],
        G: [false, true, false, false, false],
        O: [true, false, false, false, false],
      },
    },
    {
      value: "Coverall",
      label: "Coverall",
      unusedLetters: [],
      pattern: {
        B: [true, true, true, true, true],
        I: [true, true, true, true, true],
        N: [true, true, true, true, true],
        G: [true, true, true, true, true],
        O: [true, true, true, true, true],
      },
    },
    {
      value: "Crazy Arrow",
      label: "Crazy Arrow",
      unusedLetters: [],
      pattern: {
        B: [false, false, false, false, true],
        I: [false, false, false, true, false],
        N: [true, false, true, false, false],
        G: [true, true, false, false, false],
        O: [true, true, true, false, false],
      },
    },
    {
      value: "Crazy Arrowhead",
      label: "Crazy Arrowhead",
      unusedLetters: [],
      pattern: {
        B: [false, false, false, false, false],
        I: [false, false, false, false, false],
        N: [true, false, false, false, false],
        G: [true, true, false, false, false],
        O: [true, true, true, false, false],
      },
    },
    {
      value: "Crazy Kite",
      label: "Crazy Kite",
      unusedLetters: ["N"],
      pattern: {
        B: [false, false, false, true, true],
        I: [false, false, false, true, true],
        N: [false, false, true, false, false],
        G: [false, true, false, false, false],
        O: [true, false, false, false, false],
      },
    },
    {
      value: "Crazy L",
      label: "Crazy L",
      unusedLetters: [],
      pattern: {
        B: [false, false, false, false, true],
        I: [false, false, false, false, true],
        N: [false, false, false, false, true],
        G: [false, false, false, false, true],
        O: [true, true, true, true, true],
      },
    },
    {
      value: "Crazy T",
      label: "Crazy T",
      unusedLetters: [],
      pattern: {
        B: [true, true, true, true, true],
        I: [false, false, true, false, false],
        N: [false, false, true, false, false],
        G: [false, false, true, false, false],
        O: [false, false, true, false, false],
      },
    },
    {
      value: "Cross",
      label: "Cross",
      unusedLetters: [],
      pattern: {
        B: [false, true, false, false, false],
        I: [false, true, false, false, false],
        N: [true, true, true, true, true],
        G: [false, true, false, false, false],
        O: [false, true, false, false, false],
      },
    },
    {
      value: "Diamond",
      label: "Diamond",
      unusedLetters: [],
      pattern: {
        B: [false, false, true, false, false],
        I: [false, true, false, true, false],
        N: [true, false, false, false, true],
        G: [false, true, false, true, false],
        O: [false, false, true, false, false],
      },
    },
    {
      value: "Diamond Filled",
      label: "Diamond Filled",
      unusedLetters: [],
      pattern: {
        B: [false, false, true, false, false],
        I: [false, true, true, true, false],
        N: [true, true, true, true, true],
        G: [false, true, true, true, false],
        O: [false, false, true, false, false],
      },
    },
    {
      value: "Diamond Inside",
      label: "Diamond Inside",
      unusedLetters: ["B", "O"],
      pattern: {
        B: [false, false, false, false, false],
        I: [false, false, true, false, false],
        N: [false, true, true, true, false],
        G: [false, false, true, false, false],
        O: [false, false, false, false, false],
      },
    },
    {
      value: "Dog Bone",
      label: "Dog Bone",
      unusedLetters: ["N"],
      pattern: {
        B: [false, true, true, true, false],
        I: [false, false, true, false, false],
        N: [false, false, true, false, false],
        G: [false, false, true, false, false],
        O: [false, true, true, true, false],
      },
    },
    {
      value: "Double Bingo",
      label: "Double Bingo",
      unusedLetters: [],
      pattern: {
        B: [false, false, true, false, false],
        I: [true, true, true, true, true],
        N: [false, false, true, false, false],
        G: [false, false, true, false, false],
        O: [false, false, true, false, false],
      },
    },
    {
      value: "Double Chevron",
      label: "Double Chevron",
      unusedLetters: [],
      pattern: {
        B: [false, false, true, false, true],
        I: [false, true, false, true, false],
        N: [true, false, true, false, false],
        G: [false, true, false, true, false],
        O: [false, false, true, false, true],
      },
    },
    {
      value: "Double X",
      label: "Double X",
      unusedLetters: [],
      pattern: {
        B: [true, false, true, false, false],
        I: [false, true, false, false, false],
        N: [true, false, true, false, true],
        G: [false, false, false, true, false],
        O: [false, false, true, false, true],
      },
    },
    {
      value: "Field Goal",
      label: "Field Goal",
      unusedLetters: [],
      pattern: {
        B: [true, true, true, false, false],
        I: [false, false, true, false, false],
        N: [true, false, true, true, true],
        G: [false, false, true, false, false],
        O: [true, true, true, false, false],
      },
    },
    {
      value: "Flag",
      label: "Flag",
      unusedLetters: [],
      pattern: {
        B: [true, true, true, true, true],
        I: [true, true, true, false, false],
        N: [true, true, true, false, false],
        G: [true, true, true, false, false],
        O: [true, true, true, false, false],
      },
    },
    {
      value: "Four Corners",
      label: "Four Corners",
      unusedLetters: ["I", "N", "G"],
      pattern: {
        B: [true, false, false, false, true],
        I: [false, false, false, false, false],
        N: [false, false, false, false, false],
        G: [false, false, false, false, false],
        O: [true, false, false, false, true],
      },
    },
    {
      value: "Four Corners Small",
      label: "Four Corners Small",
      unusedLetters: ["B", "N", "O"],
      pattern: {
        B: [false, false, false, false, false],
        I: [false, true, false, true, false],
        N: [false, false, false, false, false],
        G: [false, true, false, true, false],
        O: [false, false, false, false, false],
      },
    },
    {
      value: "GO",
      label: "GO",
      unusedLetters: ["B", "I", "N"],
      pattern: {
        B: [false, false, false, false, false],
        I: [false, false, false, false, false],
        N: [false, false, false, false, false],
        G: [true, true, true, true, true],
        O: [true, true, true, true, true],
      },
    },
    {
      value: "Hardway",
      label: "Hardway",
      unusedLetters: [],
      pattern: {
        B: [false, true, false, false, false],
        I: [false, true, false, false, false],
        N: [false, true, false, false, false],
        G: [false, true, false, false, false],
        O: [false, true, false, false, false],
      },
    },
    {
      value: "Heart",
      label: "Heart",
      unusedLetters: [],
      pattern: {
        B: [false, true, true, false, false],
        I: [true, true, true, true, false],
        N: [false, true, true, true, true],
        G: [true, true, true, true, false],
        O: [false, true, true, false, false],
      },
    },
    {
      value: "Hourglass",
      label: "Hourglass",
      unusedLetters: [],
      pattern: {
        B: [true, false, false, false, true],
        I: [true, true, false, true, true],
        N: [true, false, true, false, true],
        G: [true, true, false, true, true],
        O: [true, false, false, false, true],
      },
    },
    {
      value: "ING Game",
      label: "ING Game",
      unusedLetters: ["B", "O"],
      pattern: {
        B: [false, false, false, false, false],
        I: [true, true, true, true, true],
        N: [true, true, true, true, true],
        G: [true, true, true, true, true],
        O: [false, false, false, false, false],
      },
    },
    {
      value: "Ladder",
      label: "Ladder",
      unusedLetters: ["B", "O"],
      pattern: {
        B: [false, false, false, false, false],
        I: [true, true, true, true, true],
        N: [false, true, false, true, false],
        G: [true, true, true, true, true],
        O: [false, false, false, false, false],
      },
    },
    {
      value: "Large Frame",
      label: "Large Frame",
      unusedLetters: [],
      pattern: {
        B: [true, true, true, true, true],
        I: [true, false, false, false, true],
        N: [true, false, false, false, true],
        G: [true, false, false, false, true],
        O: [true, true, true, true, true],
      },
    },
    {
      value: "Layer Cake",
      label: "Layer Cake",
      unusedLetters: [],
      pattern: {
        B: [true, false, true, false, true],
        I: [true, false, true, false, true],
        N: [true, false, true, false, true],
        G: [true, false, true, false, true],
        O: [true, false, true, false, true],
      },
    },
    {
      value: "Letter X",
      label: "Letter X",
      unusedLetters: ["N"],
      pattern: {
        B: [true, false, false, false, true],
        I: [false, true, false, true, false],
        N: [false, false, true, false, false],
        G: [false, true, false, true, false],
        O: [true, false, false, false, true],
      },
    },
    {
      value: "Love Letter",
      label: "Love Letter",
      unusedLetters: [],
      pattern: {
        B: [true, true, true, true, true],
        I: [false, false, false, false, true],
        N: [false, false, false, false, true],
        G: [true, true, false, false, true],
        O: [true, true, false, false, true],
      },
    },
    {
      value: "Lucky 7",
      label: "Lucky 7",
      unusedLetters: [],
      pattern: {
        B: [true, false, false, false, true],
        I: [true, false, false, true, false],
        N: [true, false, true, false, false],
        G: [true, true, false, false, false],
        O: [true, false, false, false, false],
      },
    },
    {
      value: "Number Sign",
      label: "Number Sign",
      unusedLetters: [],
      pattern: {
        B: [false, true, false, true, false],
        I: [true, true, true, true, true],
        N: [false, true, false, true, false],
        G: [true, true, true, true, true],
        O: [false, true, false, true, false],
      },
    },
    {
      value: "One Away",
      label: "One Away",
      unusedLetters: [],
      pattern: {
        B: [true, true, true, true, true],
        I: [true, true, true, true, true],
        N: [true, true, true, true, true],
        G: [true, true, true, false, true],
        O: [true, true, true, true, true],
      },
    },
    {
      value: "Percent Sign",
      label: "Percent Sign",
      unusedLetters: ["N"],
      pattern: {
        B: [true, true, false, false, true],
        I: [true, true, false, true, false],
        N: [false, false, true, false, false],
        G: [false, true, false, true, true],
        O: [true, false, false, true, true],
      },
    },
    {
      value: "Picnic Table",
      label: "Picnic Table",
      unusedLetters: [],
      pattern: {
        B: [true, false, false, false, true],
        I: [true, true, false, true, false],
        N: [true, false, true, false, false],
        G: [true, true, false, true, false],
        O: [true, false, false, false, true],
      },
    },
    {
      value: "Plus Sign",
      label: "Plus Sign",
      unusedLetters: [],
      pattern: {
        B: [false, false, true, false, false],
        I: [false, false, true, false, false],
        N: [true, true, true, true, true],
        G: [false, false, true, false, false],
        O: [false, false, true, false, false],
      },
    },
    {
      value: "Postage Stamps",
      label: "Postage Stamps",
      unusedLetters: ["N"],
      pattern: {
        B: [true, true, false, false, false],
        I: [true, true, false, false, false],
        N: [false, false, false, false, false],
        G: [false, false, false, true, true],
        O: [false, false, false, true, true],
      },
    },
    {
      value: "Pyramid",
      label: "Pyramid",
      unusedLetters: [],
      pattern: {
        B: [false, false, false, false, true],
        I: [false, false, false, true, true],
        N: [false, false, true, true, true],
        G: [false, false, false, true, true],
        O: [false, false, false, false, true],
      },
    },
    {
      value: "Railroad Tracks",
      label: "Railroad Tracks",
      unusedLetters: ["B", "N", "O"],
      pattern: {
        B: [false, false, false, false, false],
        I: [true, true, true, true, true],
        N: [false, false, false, false, false],
        G: [true, true, true, true, true],
        O: [false, false, false, false, false],
      },
    },
    {
      value: "Regular or 4 Corners",
      label: "Regular or 4 Corners",
      unusedLetters: [],
      pattern: {
        B: [true, false, false, false, true],
        I: [false, true, false, false, false],
        N: [false, false, true, false, false],
        G: [false, false, false, true, false],
        O: [true, false, false, false, true],
      },
    },
    {
      value: "Small Frame",
      label: "Small Frame",
      unusedLetters: ["B", "O"],
      pattern: {
        B: [false, false, false, false, false],
        I: [false, true, true, true, false],
        N: [false, true, false, true, false],
        G: [false, true, true, true, false],
        O: [false, false, false, false, false],
      },
    },
    {
      value: "Smile",
      label: "Smile",
      unusedLetters: [],
      pattern: {
        B: [false, false, false, true, false],
        I: [false, true, false, false, true],
        N: [false, false, true, false, true],
        G: [false, true, false, false, true],
        O: [false, false, false, true, false],
      },
    },
    {
      value: "Sputnik",
      label: "Sputnik",
      unusedLetters: [],
      pattern: {
        B: [true, false, false, false, true],
        I: [false, true, true, true, false],
        N: [false, true, true, true, false],
        G: [false, true, true, true, false],
        O: [true, false, false, false, true],
      },
    },
    {
      value: "Staircase",
      label: "Staircase",
      unusedLetters: [],
      pattern: {
        B: [false, false, false, false, true],
        I: [false, false, false, true, true],
        N: [false, false, true, true, true],
        G: [false, true, true, true, true],
        O: [true, true, true, true, true],
      },
    },
    {
      value: "Stamp and 4 Corners",
      label: "Stamp and 4 Corners",
      unusedLetters: ["N"],
      pattern: {
        B: [true, false, false, false, true],
        I: [false, false, false, false, false],
        N: [false, false, false, false, false],
        G: [true, true, false, false, false],
        O: [true, true, false, false, true],
      },
    },
    {
      value: "Stamp and Line",
      label: "Stamp and Line",
      unusedLetters: [],
      pattern: {
        B: [true, true, false, false, true],
        I: [true, true, false, true, false],
        N: [false, false, true, false, false],
        G: [false, true, false, false, false],
        O: [true, false, false, false, false],
      },
    },
    {
      value: "Starburst",
      label: "Starburst",
      unusedLetters: [],
      pattern: {
        B: [true, false, true, false, true],
        I: [false, true, true, true, false],
        N: [true, true, true, true, true],
        G: [false, true, true, true, false],
        O: [true, false, true, false, true],
      },
    },
    {
      value: "Top and Bottom",
      label: "Top and Bottom",
      unusedLetters: [],
      pattern: {
        B: [true, false, false, false, true],
        I: [true, false, false, false, true],
        N: [true, false, false, false, true],
        G: [true, false, false, false, true],
        O: [true, false, false, false, true],
      },
    },
    {
      value: "Top Hat",
      label: "Top Hat",
      unusedLetters: [],
      pattern: {
        B: [false, false, false, false, true],
        I: [false, true, true, true, true],
        N: [false, true, true, true, true],
        G: [false, true, true, true, true],
        O: [false, false, false, false, true],
      },
    },
    {
      value: "Tree",
      label: "Tree",
      unusedLetters: [],
      pattern: {
        B: [false, false, false, true, false],
        I: [false, true, true, true, false],
        N: [true, true, true, true, true],
        G: [false, true, true, true, false],
        O: [false, false, false, true, false],
      },
    },
    {
      value: "Triangle Game",
      label: "Triangle Game",
      unusedLetters: [],
      pattern: {
        B: [true, true, true, true, true],
        I: [true, true, true, true, false],
        N: [true, true, true, false, false],
        G: [true, true, false, false, false],
        O: [true, false, false, false, false],
      },
    },
    {
      value: "Turtle",
      label: "Turtle",
      unusedLetters: [],
      pattern: {
        B: [false, true, false, false, true],
        I: [false, true, true, true, false],
        N: [true, true, true, true, false],
        G: [false, true, true, true, false],
        O: [false, true, false, false, true],
      },
    },
    {
      value: "Two Brackets",
      label: "Two Brackets",
      unusedLetters: ["N"],
      pattern: {
        B: [true, true, false, false, false],
        I: [true, false, false, false, false],
        N: [false, false, false, false, false],
        G: [false, false, false, false, true],
        O: [false, false, false, true, true],
      },
    },
    {
      value: "Umbrella",
      label: "Umbrella",
      unusedLetters: [],
      pattern: {
        B: [false, true, true, false, false],
        I: [true, true, false, false, true],
        N: [true, true, true, true, true],
        G: [true, true, false, false, false],
        O: [false, true, true, false, false],
      },
    },
    // { value: "",
    //   label: "",
    //   unusedLetters: [],
    //   pattern: {
    //     B: [false, false, false, false, false],
    //     I: [false, false, false, false, false],
    //     N: [false, false, false, false, false],
    //     G: [false, false, false, false, false],
    //     O: [false, false, false, false, false]
    //   },
    // },
  ];
}

export function getPatternInfo(patternName) {
  const presets = getPresetPatterns();
  let returnValue = null;
  presets.forEach((preset) => {
    if (preset.value === patternName) {
      returnValue = preset;
    }
  });
  if (returnValue === null) {
    returnValue = getBlankPattern();
  }
  return returnValue;
}

/**
 * Takes a custom pattern and returns an array of unused letters
 *
 * @param   {Object}  pattern  pattern object
 *
 * @return  {Array}           array of unused letters
 */
export function getCustomUnusedLetters(pattern) {
  const unusedLetters = [];
  Object.keys(pattern).forEach((letter) => {
    if (pattern[letter].includes(true)) {
      const daubs = [];
      pattern[letter].forEach((space, index) => {
        if (space === true) {
          daubs.push(index);
        }
      });
      if (daubs.length === 1 && daubs[0] === 2) {
        unusedLetters.push(letter);
      }
    } else {
      unusedLetters.push(letter);
    }
  });
  return unusedLetters;
}

export function getBlankPattern() {
  return {
    value: "blank",
    label: "Select One",
    unusedLetters: [],
    pattern: {
      B: [false, false, false, false, false],
      I: [false, false, false, false, false],
      N: [false, false, false, false, false],
      G: [false, false, false, false, false],
      O: [false, false, false, false, false],
    },
  };
}
