import React from 'react';
import ReactDOM from 'react-dom';
import '../src/assets/bootstrap.css';
import 'jquery/dist/jquery';
import 'bootstrap/dist/js/bootstrap';
import * as serviceWorker from './serviceWorker';
import App from './App';
import AOS  from 'aos/dist/aos';
import 'aos/dist/aos.css';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import './index.css';

AOS.init();
ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
