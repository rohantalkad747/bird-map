import React from 'react';
import './App.css';
import Navigation  from './components/navbar/navbar';
import AccountContainer from './components/account/account.container';
import Home from './components/home/home';
import { Switch, Route, Link, BrowserRouter as Router } from 'react-router-dom';
import * as Images from './assets/logos';
import Footer from "./components/footer/footer";
import BirdContainer from "./components/maps/bird.container";
import ContributeComponent from "./components/contribute/contribute";

class App extends React.Component {
  render() {
    return (
        <div className="container app">
            <div style={{boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
                <Navigation />
                    <Switch>
                        <Route path="/" exact component={Home}/>
                        <Route path="/birdmap" component={BirdContainer}/>
                        <Route path="/account" component={AccountContainer}/>
                        <Route path="/contribute" component={ContributeComponent}/>
                    </Switch>
                <Footer />
            </div>
        </div>
    );
  }
}

export default App;
