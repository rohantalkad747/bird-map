import  React from 'react';
import * as Images from "../../assets/logos";
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import './navbar.css';

class Navigation extends React.Component {
    
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <li className="nav-header" style={{listStyleType: 'none', marginBottom: 20}}>
                        <a href="#"><img src={Images.Logo} className="logo" style={{width: '35%', height: '35%', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}} /> </a>
                    </li>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                            <li className="nav-item active">
                            <a className="nav-link" href="/"> Home <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#"> About </a>
                            </li>
                            <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Maps
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a className="dropdown-item" href="/birdmap">Birds</a>
                                <a className="dropdown-item" href="#">Nests</a>
                            </div>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Submit</a>
                            </li>
                            <li className="nav-item">
                            <button className="search-box" id='search-box' style={{backgroundColor: 'black', marginBottom: 20}}> <div style={{color: 'white'}}>Donate</div></button>
                            </li>
                            <li className="nav-item">
                            <button className="search-box" id='search-box' style={{backgroundColor: 'black'}}> <div style={{color: 'white'}}>Login</div></button>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Navigation;