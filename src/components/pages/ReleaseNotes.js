import React from 'react';

class ReleaseNotes extends React.Component {
  render() {
    return(
      <section>
        <div className="row">
          <div className="col padding-xxlg">
            <h1>Release Notes!</h1>
            <h2><span className="date">5/17/2020</span> | New game mode, bug fixes</h2>
            <ul>
              <li>Added last 5 numbers display below the game play buttons</li>
              <li>Added an evens/odds game mode - in order to play this mode wild bingo mode must be on.</li>
              <li>Fixed a typo within the code that would sometimes break the reset button</li>
              <li>Fixed an issue where the bingo board was writing out the numbers with letters for certain languages.</li>
            </ul>
            {/* ---------------------------------- */}
            <h2><span className="date">5/4/2020</span> | Thank yous and hotfixes</h2>
            <p>Thank you so much to everyone who has reached out to me and has donated to the operating costs of the site. I appreciate all of your emails and
              comments and I love hearing from you. I didn't set out on creating this app to make lots of money from it it was just a fun little project in honor of my grandma.
              I'm happy just to cover the costs of keeping it running!</p>
            <p className="medium-text">I have decided that if I receive more donations than the operating costs of this project I will be donating the excess to 
              <a href="https://kiva.org" target="_blank" rel="noopener noreferrer">Kiva.org</a>. Kiva is an international non profit with this vision: 
              <em>"We envision a financially inclusive world where all people hold the power to improve their lives."</em>  Let's Play Bingo is reached by people world wide now - something I never expected - and with the global pandemic affecting economies and entrepreneurs
              everywhere, I'd like to give back to those in need in the form of business loans to help them keep their livelihoods open.
              While this is technically "lending" and not charity, it empowers the borrowers and doesn't feel like a hand out. 
              I've been partnering with Kiva for a while now and every time I receive a repayment it goes right back into the hands of another entrepreneur in need.</p>
            <p className="medium-text">This is so close to my heart as in 2008/09 I was living in poverty, bordering homelessness and had to rely on my family to keep me and my young daughter afloat 
              while I attended school and worked full time to better my life and provide for my child. I'm happy to say that I now have a successful career as a web 
              developer/development manager. I came up from nothing and I like to give back every chance I get.</p>
              
            <h4 className="margin-bottom-lg">Hotfixes</h4>
            <h5 className="margin-top-none margin-bottom-sm">Unable to pause number calling on some devices</h5>
            <p className="margin-top-none margin-bottom-lg medium-text">I have dug into the code and believe I have this fixed, however I have personally been unable to replicate it so I'm kind of fixing it blindly.</p>
            
            <h5 className="margin-top-none margin-bottom-sm">Odd behavior with audible calling</h5>
            <p className="margin-top-none margin-bottom-sm medium-text">The audible calling uses an experimental technology called the Speech Synthesis API which is built into the browser. 
            This can sometimes get laggy depending on a variety of factors and can cause unexpected delays in calling numbers out loud. I've made some changes to hopefully help stabilize it, 
            but it can still act unexpectedly. It will help if you don't make any game option changes in the middle of playing.</p>

            {/* ---------------------------------- */}
            <h2><span className="date">4/28/2020</span> | Pandemic Patch</h2>
            <ul>
              <li>Added information to the About page to add clarification how the game works and what the game modes mean</li>
              <li>Moved the speech synthesis out of the state object to stabilize vocal calls and fix an issue with speech lag.</li>
              <li>Added two new modes for speech synthesis including Double Calls and Chatty mode.</li>
              <li>Made the text larger on the current ball display. </li>
              <li>Adjusted the CSS for heading stylings.</li>
              <li>Fixed some bugs with manual calling mode where previous calls were inaccurate.</li>
              <li>Added a proper error notice if the user's browser/device doesn't support audible calling</li>
            </ul>
            {/* ---------------------------------- */}
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