import React from 'react';
import './App.css';
import Navigation  from './components/navbar/navbar';
import Home from './components/home/home';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import * as Images from './assets/logos';
import Footer from "./components/footer/footer";
import BirdMap from "./components/maps/birdmap";


function App() {
  return (
      <div className="container app">
          <div style={{boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
              <Navigation />
              <Router>
                  <div>
                      <Route exact path="/" component={Home}/>
                      <Route exact path="/birdmap" component={BirdMap}/>
                  </div>
              </Router>
              <Footer />
          </div>
      </div>
  );
}

export default App;
