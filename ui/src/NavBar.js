import React from "react";
import logo from "./images/logo_text.png";


const NavBar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src={logo} alt="Hydropin page logo" style={{ height: '80px' }} />
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbar-buttons">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0" id="navbar-left">
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Maps</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">News</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">About</a>
              </li>
            </ul>
            <ul className="navbar-nav" id="navbar-right">
              <li className="nav-item">
                <a className="nav-link login-button" aria-current="page" href="#">Log in</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Sign up</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
};

export default NavBar;