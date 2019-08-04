import React from "react";
import { Link } from "react-router-dom";
import config from "../../../config";
import axios from "axios";

const loadingSnippet = (
  <div className="d-flex align-items-center">
    <strong>Loading...</strong>
    <div
      className="spinner-border ml-auto"
      role="status"
      aria-hidden="true"
    ></div>
  </div>
);

const success = (
  <div className="alert alert-success alert-dismissible fade show" role="alert">
    The next step is to verify your email ...
    <button
      type="button"
      className="close"
      data-dismiss="alert"
      aria-label="Close"
    >
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
);

const failure = (
  <div className="alert alert-danger alert-dismissible fade show" role="alert">
    Oops ... something went wrong.
    <button
      type="button"
      className="close"
      data-dismiss="alert"
      aria-label="Close"
    >
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
);

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    this.setState({ loading: true });
    axios
      .post(`${config.serverName}/api/users/register`, this.state)
      .then((res) => {
        this.setState({ loading: false });
        this.props.flipForms();
        console.log(res);
    });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const loading = this.state.loading ? loadingSnippet : null;
    let alert;
    if (this.state.success) alert = success;
    else if (this.state.success === false) alert = failure;
    return (
      <div
        className="login container"
        style={{ paddingTop: 50, paddingBottom: 50 }}
      >
        {alert}
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
