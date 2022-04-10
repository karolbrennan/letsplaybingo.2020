
import React from 'react';

class Help extends React.Component {
  render() {
    return(
      <section className="padding-xxlg pale-gray-bg">
        <h1 className="no-margin">Need help?</h1>
          <h5 className="margin-bottom-lg">Questions, Suggestions, Comments, Reporting Issues</h5>
          <p>Please feel free to reach out via email, on Facebook, Instagram, Twitter, etc with any questions, comments, concerns, etc! I love hearing from players!
          I'm just one developer, but I do my best to respond to everyone who emails me and help them however I can!</p>
          <p className="small-text">If you come across any issues with the game, please submit a detailed report either via email to <a href="mailto:hello@letsplaybingo.io">hello@letsplaybingo.io</a> or
            via <a href="https://github.com/karolbrennan/letsplaybingo/issues" target="_blank" rel="noopener noreferrer">GitHub</a>. When making a bug report please include how you came across the bug,
            what device you are using, PC/Mac/Laptop/Desktop/Tablet/Mobile/etc and which browser (Chrome, Safari, Edge, Firefox). If it's a stylistic issue please also include what size screen you are viewing on.</p>
          <p className="small-text">This site is still undergoing some stylistic updates to make it mobile friendly, so watch for that. I wanted to get the desktop version released as quickly as possible.</p>
      </section>
    )
  }
}
export default Help;