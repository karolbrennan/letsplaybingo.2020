import React from 'react';
class About extends React.Component {
  render() {
    return (
      <section className="pale-gray-bg">
        <div className="row no-wrap">
          <div className="col padding-xxlg">
            <h1>About</h1>
            {/* --------------- INTRO --------------- */}
            <p>
              Use this free bingo caller to host your own bingo games at home! You provide the cards, we generate the bingo numbers! 
              No downloads, no ads and <strong>completely free</strong>! 
            </p>
            <p><em>
              Thank you so much to those who have donated towards operating costs and who have reached out to me to tell me how much they enjoy this bingo caller.
              I love hearing from you! It makes me very happy to hear that a little project I started for myself in honor of my late grandmother is enjoyed by so many other people.
              My mom, grandma and I used to play bingo together using a little electronic bingo caller. It was always just a bit off and never worked quite right. 
              We also found ourselves wishing it had other features or a bigger display. So in honor of Grandma Jo, in 2017 Let's Play Bingo was born!</em><br/>
              - Karol
            </p>

            <section className="padding-top-sm dark-blue-bg"></section>

            {/* --------------- RELEASE NOTES --------------- */}
            <h2>Release Notes</h2>
            <p>Past release notes can be accessed here: <a href="/releases">Release Notes</a><br/>
              Have ideas for how to make Let's Play Bingo even better? Send a message to <a href="mailto:hello@letsplaybingo.io">hello@letsplaybingo.io</a>!
            </p>
            
            {/* --------------- FEATURES COMING SOON --------------- */}
            <h4 className="margin-bottom-none">Features Coming Soon</h4>
            <ul>
              <li>Guides for hosting bingo games</li>
              <li>Better styling for mobile friendly gameplay</li>
              <li>Persistent game data so if you navigate to another page and come back you can pick up where you left off.</li>
            </ul>

            <section className="padding-top-sm dark-blue-bg"></section>      

            {/* --------------- GAME PLAY --------------- */}
            <h2>Gameplay</h2>
            <p>Let's Play Bingo is intended for use at home or through screen sharing technologies. It does not have a database so games are not saved/stored / you can't access 
              the same game on multiple computers as it is strictly played in the user's browser. This could potentially change in the future based on demand for this kind of feature.
              LPB was created with the idea of Family Game Night, printing out physical cards and playing with loved ones. </p>

            <h3>Crazy Patterns</h3>
            <p>Any pattern that starts with the word "Crazy" means it can be played in any direction on the card.</p>
            
            <section className="padding-top-sm dark-blue-bg"></section>

            {/* --------------- Audible Bingo Caller --------------- */}
            <h2>Audible Bingo Caller</h2>
            <p>Let's Play Bingo utilizes the Web Speech Synthesis API which is an experiemental technology used to generate text-to-speech. This is primarily used for screen
              readers to read text back to blind people. Support depends on your device as well as your browser. If speech synthesis is not supported you will receive a message 
              indiciating as much and the "Enable Caller" game mode will not be available for you. Please try another browser or different device if you'd like to use this feature.</p>
            <p>If speech synthesis is available on your device/browser you ought to be able to see a list of voices that are available for use. The voice selections
              available to you can vary greatly depending on what device you are on and what the manufacturer has made available for that device. <strong>This is not something
              controlled by the Let's Play Bingo application.</strong>
            </p>
            <h3>Double Call Mode</h3>
            <p>When enabled Double Call mode will audibly call the number a second time. <em>For example:</em> the caller will read out I26 followed by "I 2 6" with each letter and number separated phonetically.</p>

            <h3>Chatty Mode</h3>
            <p>When enabled Chatty mode will enable additional chatter from the audible caller. <em>For example:</em> at the start of every game the caller will say "Let's Play Bingo!" or if using the Wild Bingo game mode, "Let's Play Wild Bingo!".</p>

            <section className="padding-top-sm dark-blue-bg"></section>

            {/* --------------- GAME MODES --------------- */}
            <h2>Game Modes</h2>
            <h3>Manual Calling Mode</h3>
            <p>This gameplay style is designed for those who have a physical bingo ball cage or caller and merely want the use of a board to display 
              the called numbers on. When activated all number generation is turned off and the user will be able to click on the numbers to mark them as active.
              Clicking on a called number a 2nd time will mark it as uncalled and update the previous number if necessary.
            </p>

            <h3>Skip Unused Numbers</h3>
            <p>
              This game mode when used in combination with selecting a pattern will skip any line (letter) of numbers that are not being used in the pattern. 
              <em>For example:</em> When playing the Small Picture Frame it will skip Bs and Os.
            </p>
            <p className="small-text">
              <em>Note:</em> it will still display the numbers on the board as if they were called, but if autoplay is on it will mark them as called but skip
               past them and call a new ball. No numbers are skipped in patterns that begin with the word Crazy because they are expected to be played in any direction.
            </p>

            <h3>Wild Bingo</h3>
            <p>
              Wild Bingo indicates that the first number called is wild, meaning you would dab every number ending in the same digit as the wild bingo number. 
              <em>For Example:</em> The wild number is G56, you would dab every number ending in 6. This game mode can be used on any pattern.
            </p>
            <p className="small-text"><em>Note:</em> Even if you select autoplay, when playing Wild Bingo the game will pause on the initial call to give players
            time to dab all of the numbers.</p>

            <h3>Evens/Odds</h3>
            <p>Much like Wild Bingo, the first number called is wild. However in this game mode, you'd dab all even or all odd numbers depending on even/odd status
              of the wild number that was first selected. 
            </p>
            <p className="small-text"><em>Note:</em> In order to be able to play this game mode wild bingo must be selected as this mode depends on that setting.</p>
          </div>
        </div>
      </section>
    )
  }
}
export default About;