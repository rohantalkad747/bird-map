import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";

class LoginForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    this.triggerLogin = this.triggerLogin.bind(this);
  }

  triggerLogin(event) {
    event.preventDefault();
    this.setState({value: event.target.value});
    // const email = e.target.values.username;
    // const pass = e.target.values.password;
  }

  render() {
    return (
      <div
        className="login container"
        style={{ paddingTop: 50, paddingBottom: 50 }}
      >
        <div className="d-flex justify-content-center h-100">
          <div className="card">
            <div className="card-header d-flex justify-content-center">
              <h3>Sign In</h3>
            </div>
            <div className="card-body">
              <form>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-user"></i>
                    </span>
                  </div>
                  <input
                    type="email"
                    value={this.state.email}
                    className="form-control"
                    placeholder="e-mail"
                  ></input>
                </div>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-key"></i>
                    </span>
                  </div>
                  <input
                    type="password"
                    value={this.state.password}
                    className="form-control"
                    placeholder="password"
                  ></input>
                </div>
                <button
                  onClick={ this.triggerLogin }
                  className="search-box"
                  id="search-box"
                  style={{
                    backgroundColor: "black",
                    width: 120,
                    marginLeft: 90
                  }}
                >
                    {" "}
                    <div style={{ color: "white" }}>Sign in</div>
                </button>
              </form>
            </div>
            <div className="card-footer">
              <div className="d-flex justify-content-center links">
                Don't have an account? &nbsp;{" "}
                <a href="#" onClick={this.props.flipForms}>
                  Sign Up
                </a>
              </div>
              <div className="d-flex justify-content-center">
                <a href="#">Forgot your password?</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;
