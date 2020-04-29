import React from 'react';

class ReleaseNotes extends React.Component {
  render() {
    return(
      <section>
        <div className="row">
          <div className="col padding-xxlg">
            <h1>Release Notes!</h1>
            
            <h2><span className="date">4/28/2020</span> | Pandemic Patch</h2>
            <ul>
              <li>Added information to the About page to ass clarification how the game works and what the game modes mean</li>
              <li>Moved the speech synthesis out of the state object to stabilize vocal calls and fix an issue with speech lag.</li>
              <li>Added two new modes for speech synthesis including Double Calls and Chatty mode.</li>
              <li>Made the text larger on the current ball display. </li>
              <li>Adjusted the CSS for heading stylings.</li>
              <li>Fixed some bugs with manual calling mode where previous calls were inaccurate.</li>
              <li>Added a proper error notice if the user's browser/device doesn't support audible calling</li>
            </ul>
            <h2><span className="date">4/25/2020</span> | The Pandemic Update!</h2>
            <ul>
                <li>A brand new <a href="/generate">card generation tool</a>!!! You asked, we listened!
                  <p>You can now generate your own bingo cards and print them at home on any standard printer! All cards are created individually and completely at random and the chances of duplicate cards are extremely slim.</p>
                </li>
                <li>New design and layout!
                  <p>The new layout and design optimizes the available space when sharing or projecting to a big screen, making playing Let's Play Bingo with your friends and family that much easier!</p></li>
                <li>New patterns and number skipping!
                  <p>More preset patterns and the ability to skip numbers that are not used in the selected or custom pattern! <br/>
                  <em>Be sure to turn this feature off if you're doing back to back patterns in a single game without a board reset!</em></p></li>
                <li>A manual display board option for those who have a number generation tool and only need a way to display called numbers.</li>
              </ul>
          </div>
        </div>
      </section>
    )
  }
}

export default ReleaseNotes;