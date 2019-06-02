import { BrowserRouter as Router, Link } from "react-router-dom"
import * as Images from "../../assets/logos"
import React from "react"

class Footer extends React.Component {
  constructor(props) {
    super(props)
    this.date = new Date().getFullYear()
  }
  render() {
    return (
      <div className="container" style={{ backgroundColor: "#f7f7f9" }}>
        <footer data-aos="zoom-out-up">
          <div className="row">
            <div className="col-md-4 col-xl-5">
              <div className="pr-xl-4">
                <Link to="/">
                  {" "}
                  <img
                    className="logo"
                    src={Images.Logo}
                    alt="Logo"
                    style={{
                      height: 100,
                      width: 200,
                      marginBottom: 10,
                      marginTop: 10,
                      boxShadow:
                        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                    }}
                  />{" "}
                </Link>
                <p className="rights">
                  <span>© </span>
                  <span className="copyright-year">{this.date}</span>
                  <span> </span>
                  <span>BirdMap</span>
                  <span>. </span>
                  <span>All Rights Reserved.</span>
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <h3>Contacts</h3>
              <dl className="contact-list">
                <dt>Address:</dt>
                <dd> York University, Suite 155, M4C 2P3, Toronto, ON</dd>
              </dl>
              <dl className="contact-list">
                <dt>email:</dt>
                <dd>
                  <a href="mailto:rtalkad@live.com">support@birdmap.com</a>
                </dd>
              </dl>
              <dl className="contact-list">
                <dt>phones:</dt>
                <dd>
                  <a href="tel:#">(416) 693 7871</a>
                </dd>
              </dl>
            </div>
            <div className="col-md-4 col-xl-3">
              <h3>Links</h3>
              <ul className="nav-list" style={{ listStyle: "none" }}>
                <li>
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="#">About</a>
                </li>
                <li>
                  <a href="#">Maps</a>
                </li>
                <li>
                  <a href="#">Submit</a>
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    )
  }
}

export default Footer
