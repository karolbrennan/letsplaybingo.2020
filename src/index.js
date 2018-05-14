import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import LetsPlayBingo from './LetsPlayBingo';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<LetsPlayBingo />, document.getElementById('root'));
registerServiceWorker();