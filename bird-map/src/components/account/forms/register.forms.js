import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
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
              <h3>Register</h3>
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
                    type="text"
                    className="form-control"
                    placeholder="username"
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
                    className="form-control"
                    placeholder="password"
                  ></input>
                </div>
                <button
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
                    <div style={{ color: "white" }}>Sign in</div>
                  </Link>
                </button>
              </form>
            </div>
            <div className="card-footer">
              <div className="d-flex justify-content-center links">
                Have an account? &nbsp;{" "}
                <a href="#" onClick={this.props.flipForms}>
                  Login
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
