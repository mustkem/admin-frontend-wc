import React from "react";
// import Logo from '../../../Images/logo.png'
import { Link } from "react-router-dom";

export default class extends React.Component {
  render() {
    return (
      <div>
        <header className="header primary-header clearfix">
          <div className="logo">
            <Link to="">SHIPCENT</Link>
          </div>
          <div className="nav-section">
            <ul className="clearfix">
              <li className="nav-item">
                <Link class="active" to="#home">
                  Features
                </Link>
              </li>
              <li className="nav-item">
                <Link to="#news">Pricing</Link>
              </li>
              <li className="nav-item">
                <Link to="#about">Rate Calcultor</Link>
              </li>
            </ul>
          </div>

          <div className="right-pannel">
            <ul className="clearfix track-shipment">
              <li>
                <Link to="/" className="link ">
                  Track Your Shipment{" "}
                </Link>
              </li>
            </ul>
            <ul className="clearfix user-sec">
              <li className="login-btn">
                <Link to="/login">Login</Link>
              </li>
              <li className="login-btn">
                <Link to="/signup">Sign Up</Link>
              </li>
              {/* <li>
                <a className="link-button" href="/signup" >Signin</a>
              </li> */}
            </ul>
          </div>
        </header>
      </div>
    );
  }
}
