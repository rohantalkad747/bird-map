import React from "react";
import * as Images from "../../assets/logos";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import "./navbar.css";

class Navigation extends React.Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <li
            className="nav-header"
            style={{ listStyleType: "none", marginBottom: 20 }}
          >
            <a href="#">
              <Link to="/">
                <img
                  src={Images.Logo}
                  className="logo"
                  style={{
                    width: "35%",
                    height: "35%",
                    boxShadow:
                      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
                  }}
                />
              </Link>
            </a>
          </li>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  {" "}
                  Home <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Maps
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link className="dropdown-item" to="/birdmap">
                    View
                  </Link>
                  <Link className="dropdown-item" to="/contribute">
                    Contribute
                  </Link>
                </div>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/graph">
                  Graphs
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/donate">
                  Donate
                </Link>
              </li>
              <li className="nav-item">
                <button
                  className="search-box"
                  id="search-box"
                  style={{ backgroundColor: "black" }}
                >
                  <Link to="/account" >
                    {" "}
                    <div style={{ color: "white" }}>Account</div>
                  </Link>
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navigation;
