import React from "react";
import axios from "axios";
import config from "../../../config";
import AlertComponent from "../../shared/alerts.js";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      alert: new AlertComponent()
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    axios
      .post(`${config.serverName}/api/users/authenticate`, {
        email: this.state.email,
        password: this.state.password
      })
      .then(() => {
        const prevAlert = this.state.alert;
        prevAlert.setSuccess("Success", "You have logged in!");
        this.setState({
          alert: prevAlert
        });
      })
      .catch(err => {
        const prevAlert = this.state.alert;
        prevAlert.setFailure("Invalid Credentials", err.message);
        this.setState({
          alert: prevAlert
        });
      });
  }

  render() {
    return (
      <div
        className="login container"
        style={{ paddingTop: 50, paddingBottom: 50 }}
      >
        <div style={{ paddingBottom: 50}}>
          {this.state.alert.component}
        </div>
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
                      <i className="fas fa-user" />
                    </span>
                  </div>
                  <input
                    type="email"
                    name="email"
                    onChange={this.handleChange}
                    className="form-control"
                    placeholder="e-mail"
                  />
                </div>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-key" />
                    </span>
                  </div>
                  <input
                    type="password"
                    name="password"
                    onChange={this.handleChange}
                    className="form-control"
                    minLength="5"
                    placeholder="password"
                  />
                </div>
                <button
                  type="submit"
                  onClick={this.handleSubmit}
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
