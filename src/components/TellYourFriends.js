import React from 'react';

class TellYourFriends extends React.Component {
  componentDidMount(){
    let addthisScript = document.createElement('script');
    addthisScript.setAttribute('src', 'https://s7.addthis.com/js/300/addthis_widget.js#pubid=ra-586d4324ccbaf284');
    document.body.appendChild(addthisScript);
  }
  render(){
    return(
      <div className="tell-your-friends padding-lg">
        <h3 className="margin-top-none margin-bottom-md">Love Let's Play Bingo? Tell your friends!</h3>
        <div className="addthis_inline_share_toolbox"></div>
      </div>
    )
  }
}
export default TellYourFriends;