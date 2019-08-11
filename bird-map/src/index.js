import React from 'react';
import ReactDOM from 'react-dom';
import '../src/assets/bootstrap.css';
import 'jquery/dist/jquery';
import 'bootstrap/dist/js/bootstrap';
import * as serviceWorker from './serviceWorker';
import App from './App';
import AOS from 'aos'
import 'aos/dist/aos.css';
import 'leaflet/dist/leaflet.css';
import { BrowserRouter as Router } from 'react-router-dom';
import './assets/css/all.css';
import 'antd/dist/antd.css';

AOS.init();
ReactDOM.render(<Router> <App /> </Router>, document.getElementById('root'));

serviceWorker.unregister();
