
import React from 'react';

class Help extends React.Component {

  componentDidMount(){
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();
  
          document.querySelector(this.getAttribute('href')).scrollIntoView({
              behavior: 'smooth'
          });
      });
    });
  }
  
  render() {
    return(
      <section className="padding-vertical-xxlg">
        <div className="container row">
          <div id="top" className="col">
            <div className="back-to-top"><a href="#top">&#10094;</a></div>
            <h1 className="no-margin">Instructions for Let's Play Bingo</h1>

            {/* --------------- Table of Contents --------------- */}
            <p>Please use the links below to guide you in your gameplay!</p>
            <ol>
              <li><a href="#what-is-lpb">What is Let's Play Bingo?</a></li>
              <li><a href="#gameplay">How do I play?</a>
                <ul className="no-margin padding-left-xlg">
                  <li><a href="#game-setup">Game Setup</a></li>
                  <li><a href="#pattern-selection">Pattern Selection</a></li>
                  <li><a href="#gameplay-buttons">Gameplay Buttons</a></li>
                  <li><a href="#audible-caller">Audible Caller</a></li>
                  <li><a href="#audible-chime">Audible Chime</a></li>
                  <li><a href="#game-modes">Game Modes</a></li>
                </ul>
              </li>
              <li><a href="#troubleshooting">Troubleshooting</a></li>
              <li><a href="#reporting-issues">Reporting Issues</a></li>
              <li><a href="#contact">Questions, Suggestions, Comments</a></li>
            </ol>

            <section className="padding-top-sm dark-blue-bg"></section>
            {/* --------------- How do I use LPB? --------------- */}
            <h2 id="what-is-lpb">What is Let's Play Bingo?</h2>
            <p>Let's Play Bingo is a tool intended to be used for playing Bingo in a group setting - this can be either in person or online through virtual meetings with screen sharing.</p>
            <p className="small-text"><strong>Note:</strong> This app does not make use of a database, so games are not stored and you cannot access the same game across multiple computers or with other people. So in order to play with others, you have to have one designated person running the game for all players and sharing their screen so that the players can see the game board. <em>This app is <strong>not</strong> intended for gambling purposes and any perceived losses are solely the responsibility of the party/parties using this application for those purposes.</em></p>

            <section className="padding-top-sm dark-blue-bg"></section>
            {/* --------------- Game Play --------------- */}
            <h3 id="gameplay">How do I play?</h3>
            <p>If you have ever played Bingo before, this application should be pretty self explanatory. I've done my best to mimic what you experience in the bingo halls as closely as possible. If you still need help, please reference the guide below for how to use this app for hosting your own bingo games!</p>

            <section className="margin-top-xxlg padding-top-sm pale-gray-bg"></section>
            
            <h4 id="game-setup">Game Setup</h4>
            <p>First choose someone to be the caller/controller of the game board. This person will manage game settings, handle calling the numbers, starting/stopping autoplay, and reset the game as necessary when someone calls bingo.</p>
            <p>Choose what settings you wish to play with. You can learn more about game settings by reviewing the <a href="#game-modes">game modes</a> section.</p>
            <p>Use the <a href="/generator">card generation tool</a> to generate and print out bingo cards to distribute among your players. If playing virtually, you can have your players visit the site directly to get cards for themselves.</p>
            <p>Once players have their cards, the caller should share their screen so all players can see the board. Consider mirroring your screen to a television or other display by using a device such as ChromeCast, AppleTV, Roku, etc.</p>
            <p>If playing virtually, use the screen share option available in your meeting application of choice. Examples of apps to use include Zoom, Google Meet, Microsoft Teams, Skype, etc. Please refer to the application's documentation for how to share your screen in that particular app.</p>

            <section className="margin-top-xxlg padding-top-sm pale-gray-bg"></section>

            <h4 id="pattern-selection">Game Pattern Selection</h4>
            <p>On the left side of the caller is a bingo card display that can be used to show players what pattern they should be trying to match for the current bingo game.</p>
            <p>You can choose a preset pattern in the dropdown below the display (you can type in the dropdown to search!) OR you can click on the individual spaces on the bingo card to create your own custom pattern!</p>
            <p><strong>"Crazy" Patterns</strong> - Any pattern that starts with the word "Crazy" means it can be played in any direction on the card.</p>
            <p><strong>Pattern Listing</strong> you can <a href="/patterns">view all of the patterns</a>, and print them at <a href="/patterns">/patterns</a>!</p>

            <section className="margin-top-xxlg padding-top-sm pale-gray-bg"></section>

            <h4 id="gameplay-buttons">Gameplay Buttons</h4>
            <p><strong>Start New Game</strong> - this button only appears when there is not an active game in play. Clicking this button will start a brand new game by calling a single random bingo number (or all of the wild numbers if playing Wild Bingo).</p>
            <p><strong>Call Next Number</strong> - this button only appears if a game is in play. It will be disabled if autoplay is running. Clicking this button will call the next number and display it as flashing on the board.</p>
            <p><strong>Start Autoplay / Pause Autoplay</strong> - this button starts the autoplay function or pauses it depending on if it is currently running or not.</p>
            <p><strong>Reset Board</strong> - this button is disabled if the game is currently running, or if there is no game currently in play. Clicking this button will show a pop up asking you if you're sure you want to reset the board. This will wipe out the current game completely so use with caution.</p>
              
            <section className="padding-top-sm dark-blue-bg"></section>

            {/* --------------- Audible Bingo Caller --------------- */}
            <h2 id="audible-caller">Audible Caller</h2>
            <p>Let's Play Bingo utilizes an experimental technology called the Web Speech Synthesis API. This is primarily used for screen readers to read text back to vision impaired people. Support for this feature depends on your device and browser combination. If speech synthesis is not supported you will receive a message indiciating that the "Bingo Caller" option is not available for you. Please try another browser or different device if you'd like to use this feature.</p>

            <section className="margin-top-xxlg padding-top-sm pale-gray-bg"></section>

            <h4>Caller Selection</h4>
            <p>If speech synthesis is available and you have enabled the audible caller, you will see a list of voices that are available for use. The voice selections can vary greatly as they are depdendant upon what the device's manufacturer has made available.</p>
            <p className="small-text"><strong>Note:</strong> This is not something controlled by the Let's Play Bingo application.</p>

            <section className="margin-top-xxlg padding-top-sm pale-gray-bg"></section>

            <h4>Double Call Mode</h4>
            <p>When enabled Double Call mode will audibly call the number a second time. <em>For example:</em> the caller will read out I26 followed by "I 2 6" with each letter and number separated phonetically. This is meant to emulate how callers call the numbers in bingo halls.</p>

            <section className="margin-top-xxlg padding-top-sm pale-gray-bg"></section>

            <h4>Chatty Mode</h4>
            <p>When enabled Chatty mode will enable additional chatter from the audible caller. <em>For example:</em> at the start of every game the caller will say "Let's Play Bingo!" or if using the Wild Bingo game mode, "Let's Play Wild Bingo!".</p>

            <section className="padding-top-sm dark-blue-bg"></section>

            {/* --------------- Audible Chime --------------- */}
            <h2 id="audible-chime">Audible Chime</h2>
            <p>With this setting a subtle chime is played before each number is called to alert the players that it's time to mark the next number.</p>
            <p>When enabled you will see a list of chimes to choose from. When you select a chime it will play a sample of the selection.</p>
            <p className="small-text"><strong>Note:</strong> This mode can be used in combination with the audible bingo caller, or by itself. If used with the audible bingo caller it will delay the voice caller by 1 second to accomodate for playing the chime sound.</p>

            <section className="padding-top-sm dark-blue-bg"></section>

            {/* --------------- GAME MODES --------------- */}
            <h2 id="game-modes">Game Modes</h2>
            <h3>Manual Calling Mode</h3>
            <p>This gameplay style is designed for those who have a physical bingo ball cage or caller and merely want the use of a board to display 
              the called numbers on. When this game mode is active the user will be able to click on the numbers to mark them as called/active.
              Clicking on a called number a 2nd time will mark it as uncalled and update the previous number if necessary.
            </p>
            <p className="small-text"><strong>Note:</strong> This mode can ONLY be activated at the beginning before any balls are called, and the option will be disabled if a game is running. When activated it will disable all other game modes, options and buttons.</p>

            <section className="margin-top-xxlg padding-top-sm pale-gray-bg"></section>

            <h3>Skip Unused Numbers</h3>
            <p>This game mode when used in combination with selecting a pattern will skip any numbers beginning with a letter who's column is not being used in the pattern. <em>For example:</em> When playing the Small Picture Frame it will skip Bs and Os.</p>
            <p className="small-text"><strong>Note:</strong> it will still display the numbers on the board as if they were called, but if autoplay is on it will mark them as called but skip past them and call a new ball. No numbers are skipped in patterns that begin with the word Crazy because they are expected to be played in any direction.</p>

            <section className="margin-top-xxlg padding-top-sm pale-gray-bg"></section>

            <h3>Wild Bingo</h3>
            <p>Wild Bingo indicates that the first number called is wild, meaning you would mark every number ending in the same digit as the wild bingo number. <em>For Example:</em> If the wild number is G56, you would mark every number ending in 6. This game mode can be used on any pattern.</p>
            <p className="small-text"><strong>Note:</strong> Even if you select autoplay, when playing Wild Bingo the game will pause on the initial call to give players
            time to dab all of the numbers.</p>

            <h4>Wild Bingo: Evens/Odds</h4>
            <p>This mode is a sub-type for Wild Bingo. Just like wild bingo - the first number called is wild. However, in this game mode, you'd mark all even or all odd numbers depending on if the wild number is even or odd.</p>

            <section className="padding-top-sm dark-blue-bg"></section>

            <h2 id="troubleshooting">Troubleshooting</h2>
            <p>Having issues? Before sending a message please go through these steps that will normally resolve any issues.</p>

            <h4 className="no-margin">Clear your cache.</h4>
            <p className="margin-top-none">This simple step can usually solve most issues. If you are unsure of how to clear your cache here is a <a href="https://kinsta.com/knowledgebase/how-to-clear-browser-cache/" target="_blank" rel="noreferrer">very detailed article</a> that should help you.</p>
            
            <h4 className="no-margin">Check your game settings</h4>
            <p className="margin-top-none">Double check your settings to ensure that you're not inadvertently disabling functionality. <em>For example</em>, if you enable manual calling mode, all buttons will be disabled. Or if you have skip unused numbers enabled and have a blank pattern then call a number it'll call all numbers.</p>

            <h4 className="no-margin">Try a different browser</h4>
            <p className="margin-top-none">To rule out issues with the site itself, try a different browser and see if the issues persist. If they do, please send a detailed bug report to <a href="mailto:hello@letsplaybingo.io">hello@letsplaybingo.io</a>.</p>

            <section className="margin-top-xxlg padding-top-sm dark-blue-bg"></section>

            <h2 id="reporting-issues">Reporting Issues</h2>
            <p>If you come across issues with the game, please submit a detailed bug report via email to <a href="mailto:hello@letsplaybingo.io">hello@letsplaybingo.io</a>.</p>
            <p>Please follow the steps below when creating your report. With this information I will be able to address the issue much more quickly.</p>
            <ul>
              <li>What issue you're experiencing and steps to replicate it</li>
              <li>What kind of device (PC, Mac, Tablet, Phone, etc) you're using</li>
              <li>Which browser (Chrome, Safari, Edge, Firefox, etc) you're using</li>
              <li>What steps you've taken to troubleshoot the issue</li>
              <li>Photos or videos of the issue you're experiencing if you can</li>
            </ul>

            <section className="margin-top-xxlg padding-top-sm dark-blue-bg"></section>
        
            <h2 id="contact">Questions, Suggestions, and Comments</h2>
            <p>Please feel free to reach out via email with any questions, suggestions, comments, etc. I love hearing from players! Please remember that I'm just one developer, but I do my best to respond to everyone who emails me and help them however I can! Please reach out via email: <a href="mailto:hello@letsplaybingo.io">hello@letsplaybingo.io</a></p>


          </div>
        </div>
      </section>
    )
  }
}
export default Help;