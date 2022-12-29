import React from "react";

class ReleaseNotes extends React.Component {
	render() {
		return (
			<section>
				<div className="container row">
					<div className="col padding-xxlg">
						<h1>Release Notes!</h1>
						{/* ---------------------------------- */}
						<h2>
							<span className="date">12/29/2022</span> | Minor improvement |<span className="version">v3.4.2</span>
							<span className="tag bugfix">bug fix</span>
						</h2>
						<ul>
							<li>Changed the color of the play/pause buttons to be more clear.</li>
						</ul>
						{/* ---------------------------------- */}
						<h2>
							<span className="date">9/13/2022</span> | Bug fixes |<span className="version">v3.4.1</span>
							<span className="tag bugfix">bug fixes</span>
						</h2>
						<ul>
							<li>Fixed a bug where if Skip Unused Numbers was enabled gameplay would break.</li>
							<li>
								Fixed an issue with the Railroad Tracks pattern where Gs were not being called instead of Os when "skip unused
								numbers" was selected.
							</li>
							<li>Fixed the tracking of how many total calls there have been when skipping unused numbers</li>
						</ul>
						{/* ---------------------------------- */}
						<h2>
							<span className="date">5/22/2022</span> | New Game Mode! |<span className="version">v3.4.0</span>
							<span className="tag release">release</span>
						</h2>
						<ul>
							<li>
								Added new{" "}
								<a href="https://90ball.letsplaybingo.io" target="_blank" rel="noreferrer">
									90 Ball
								</a>{" "}
								game version!
							</li>
						</ul>
						{/* ---------------------------------- */}
						<h2>
							<span className="date">5/21/2022</span> | New Patterns! |<span className="version">v3.3.0</span>
							<span className="tag release">release</span>
						</h2>
						<ul>
							<li>Added lots of new patterns!</li>
							<li>
								Added <a href="/patterns">page that shows all patterns.</a>
							</li>
							<li>Added a way to "shuffle" the board just for fun!</li>
						</ul>
						{/* ---------------------------------- */}
						<h2>
							<span className="date">5/19/2022</span> | Bug fixes |<span className="version">v3.2.2</span>
							<span className="tag bugfix">bug fixes</span>
						</h2>
						<ul>
							<li>Fixed an issue where Ns were still called even though only the freespace was marked in a pattern.</li>
						</ul>
						{/* ---------------------------------- */}
						<h2>
							<span className="date">5/8/2022</span> | Bug fixes |<span className="version">v3.2.1</span>
							<span className="tag bugfix">bug fixes</span>
						</h2>
						<ul>
							<li>Optimized the chime files to make them shorter and smaller files.</li>
							<li>Added 4 additional pop style chime options.</li>
							<li>
								Fixed a bug where when you had both the audible chime and caller enabled it would cause a delay that would end up
								skipping audio.
							</li>
							<li>Fixed a bug where if you didn't choose a caller the audible calling would be messed up.</li>
							<li>
								Fixed mobile navigation font size and added wrapping so it doesn't go off the screen causing a horizontal scrollbar.
							</li>
							<li>Fixed bingo pattern size on mobile, it was very distorted.</li>
							<li>Removed social links since those accounts aren't active.</li>
							<li>Fixed the mobile modal positioning.</li>
							<li>Cleaned up some code, optimized CSS</li>
							<li>Combined the about and donation pages.</li>
							<li>Rearranged menu items</li>
							<li>
								Updated some styling and formatting on the Release Notes, added version numbers and tags for releases vs bug fixes.
								Added a link to them in the footer.
							</li>
						</ul>

						{/* ---------------------------------- */}
						<h2>
							<span className="date">4/1/2022</span> | This isn't an April Fool's Joke! |<span className="version">v3.2.0</span>
							<span className="tag release">release</span>
						</h2>
						<ul>
							<li>Added a way to show the full history of balls called (see show full history link below the last 5 calls).</li>
							<li>Added a confirmation alert before games are reset to prevent accidental resets on click.</li>
							<li>
								Added a way for games to be stored locally so if you accidentally refresh or navigate away from the game your game
								will be stored. Games now can ONLY reset if you explicitly click reset game and confirm.
							</li>
							<li>Improved the mobile view so it doesn't look so horrible. This still needs some more work.</li>
							<li>Added a small reminder of what the Wild Ball is for Wild Bingo game mode (shown below the current ball graphic).</li>
							<li>
								Added a new subtle chime option that can be played when balls are called along with 10 chime options! This can also be
								used in conjunction with the vocal caller as a heads up that a new ball is coming!
							</li>
							<li>
								Upgraded the core technology behind the game and fixed some bugs such as voice failing to set on vocal calls randomly.
							</li>
						</ul>
						<p>
							I know I haven't updated this in an incredibly long time and this is long over due. The pandemic was rough for my mental
							health and then I went through 2 pregnancy losses. September of 2021 brought us our little rainbow baby so we have been
							enjoying watching him grow and discover the world around him! :)
						</p>
						<p>
							Thanks to everyone who has continued to play and reach out to me via email. I never expected this site to end up with so
							many users. I am so glad it was able to bring people together during the uncertainty in the last 2 years. Thanks for
							playing, stay safe and healthy!
						</p>
						{/* ---------------------------------- */}
						<h2>
							<span className="date">5/17/2020</span> | New game mode, bug fixes |<span className="version">v3.1.0</span>
							<span className="tag release">release</span>
						</h2>
						<ul>
							<li>Added an evens/odds game mode - in order to play this mode wild bingo mode must be on.</li>
							<li>Added last 5 numbers display below the game play buttons</li>
							<li>Fixed a typo within the code that would sometimes break the reset button</li>
							<li>Fixed an issue where the bingo board was writing out the numbers with letters for certain languages.</li>
						</ul>
						{/* ---------------------------------- */}
						<h2>
							<span className="date">5/4/2020</span> | Bug fixes |<span className="version">v3.0.2</span>
							<span className="tag bugfix">bug fixes</span>
						</h2>
						<ul>
							<li>
								Unable to pause number calling on some devices
								<p>
									I have dug into the code and believe I have this fixed, however I have personally been unable to replicate it so
									I'm kind of fixing it blindly.
								</p>
							</li>
							<li>
								Odd behavior with audible calling
								<p>
									The audible calling uses an experimental technology called the Speech Synthesis API which is built into the
									browser. This can sometimes get laggy depending on a variety of factors and can cause unexpected delays in calling
									numbers out loud. I've made some changes to hopefully help stabilize it, but it can still act unexpectedly. It
									will help if you don't make any game option changes in the middle of playing.
								</p>
							</li>
						</ul>

						{/* ---------------------------------- */}
						<h2>
							<span className="date">4/28/2020</span> | Pandemic Patch |<span className="version">v3.0.1</span>
							<span className="tag bugfix">bug fixes</span>
						</h2>
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
						<h2>
							<span className="date">4/25/2020</span> | The Pandemic Update! |<span className="version">v3.0.0</span>
							<span className="tag release">release</span>
						</h2>
						<ul>
							<li>
								A brand new <a href="/generate">card generation tool</a>!!! You asked, I listened!
								<p>
									You can now generate your own bingo cards and print them at home on any standard printer! All cards are created
									individually and completely at random and the chances of duplicate cards are extremely slim.
								</p>
							</li>
							<li>
								New design and layout!
								<p>
									The new layout and design optimizes the available space when sharing or projecting to a big screen, making playing
									Let's Play Bingo with your friends and family that much easier!
								</p>
							</li>
							<li>
								New patterns and number skipping!
								<p>
									More preset patterns and the ability to skip numbers that are not used in the selected or custom pattern! <br />
									<em>
										Be sure to turn this feature off if you're doing back to back patterns in a single game without a board reset!
									</em>
								</p>
							</li>
							<li>
								A manual display board option for those who have a number generation tool and only need a way to display called
								numbers.
							</li>
						</ul>

						{/* ---------------------------------- */}
						<h2>Previous Versions</h2>
						<ul>
							<li>
								<span className="version">v2.0.0</span> May 14, 2018 - <a href="https://classic.letsplaybingo.io">Classic</a> edition
								built in ReactJS{" "}
							</li>
							<li>
								<span className="version">v1.0.0</span> Jan 1, 2017 - Pure Object Oriented JavaScript App -{" "}
								<a href="https://codepen.io/karolbrennan/pen/GxKZWX">Codepen</a>
							</li>
						</ul>
					</div>
				</div>
			</section>
		);
	}
}

export default ReleaseNotes;
