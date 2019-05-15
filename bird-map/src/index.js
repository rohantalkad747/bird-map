import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';
import App from './App';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

import './index.css';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
