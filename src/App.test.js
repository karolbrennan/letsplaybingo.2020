import React from 'react';
import ReactDOM from 'react-dom';
import LetsPlayBingo from './LetsPlayBingo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LetsPlayBingo />, div);
  ReactDOM.unmountComponentAtNode(div);
});
