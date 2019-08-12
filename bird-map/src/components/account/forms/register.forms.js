import React from "react";
import { Link } from "react-router-dom";
import config from "../../../config";
import axios from "axios";
import loadingSnippet from "../../shared/loading.snippet";
import AlertComponent from "../../shared/alerts.js";

class RegisterForm extends React.Component {
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

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ loading: true });
    axios
      .post(`${config.serverName}/api/users/register`, this.state)
      .then(res => {
        const prevAlert = this.state.alert;
        prevAlert.setSuccess(
          "Success",
          "You've been registered! You can now login ..."
        );
        this.setState({ loading: false, alert: prevAlert });
        setTimeout(() => this.props.flipForms(), 2000);
      })
        .catch((err) => {
          const prevAlert = this.state.alert;
          prevAlert.setFailure(
              "Failure",
              err.response.data
          );
          this.setState({ loading: false, alert: prevAlert });
        });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const loading = this.state.loading ? loadingSnippet : null;
    return (
      <div
        className="login container"
        style={{ paddingTop: 50, paddingBottom: 50 }}
      >
        <div style={{ paddingBottom: 50 }}>{this.state.alert.component}</div>
        <div className="d-flex justify-content-center h-100">
          <div className="card">
            <div className="card-header d-flex justify-content-center">
              <h3>Register</h3>
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
                    placeholder="email"
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
                  <Link className="nav-link" to="/account">
                    {" "}
                    <div style={{ color: "white" }}>Register</div>
                  </Link>
                </button>
                {loading}
              </form>
            </div>
            <div className="card-footer">
              <div className="d-flex justify-content-center links">
                Have an account? &nbsp;{" "}
                <a href="#" onClick={this.props.flipForms}>
                  Sign in
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterForm;
