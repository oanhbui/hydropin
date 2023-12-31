import React, { useEffect, useState } from "react";
import logo_text from "../images/logo_text.png";
import logo from "../images/logo_transparent.png";
import LogInForm from "./LogInForm";
import { useFormik } from 'formik';
import * as API from '../api';
import SignUpForm from "./SignUpForm";
import SearchBar from "./SearchBar";

const NavBar = ({ loggedInUser, setLoggedInUser, handleCenterPointChange }) => {
  const [collapse, setCollapse] = useState(true);
  const [modalLogin, setModalLogin] = useState(false);
  const [modalSignup, setModalSignup] = useState(false);


  const handleNavbarCollapse = (e) => {
    setCollapse((collapse) => !collapse)
  };

  const handleModalLogin = (e) => {
    if (e) {
      e.stopPropagation();
    }
    setModalLogin((modal) => !modal)
  };

  const handleModalSignup = (e) => {
    if (e) {
      e.stopPropagation();
    }
    setModalSignup((modal) => !modal)
  };

  const handleLogout = (e) => {
    setLoggedInUser(null);
    API.logOut()
  }

  return (
    <>
      <nav className="navbar fixed-top navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src={logo_text} alt="Hydropin page logo" />
          </a>
          <button className="navbar-toggler" type="button" onClick={handleNavbarCollapse} >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${collapse ? '' : 'show'}`} id="navbar-buttons">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0" id="navbar-left">
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#map">Maps</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#news">News</a>
              </li>
            </ul>
            <div className="navbar-nav ms-4 container-fluid">
              <SearchBar handleCenterPointChange={handleCenterPointChange} />
            </div>


            <ul className="navbar-nav align-right" id="navbar-right">
              {loggedInUser ?
                <>
                  <li className="nav-item user-avatar">
                    Welcome! {loggedInUser.first_name}
                  </li>
                  <li className="nav-item">
                    <a className="nav-link login-button" type="button" onClick={handleLogout}>Log out</a>
                  </li>
                </>

                :
                <>
                  <li className="nav-item">
                    <a className="nav-link login-button" type="button" onClick={handleModalLogin}>Log in</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" type="button" onClick={handleModalSignup}>Sign up</a>
                  </li>
                </>
              }
            </ul>


          </div>
        </div>
      </nav>

      <LogInForm modalLogin={modalLogin} handleModalLogin={handleModalLogin} setLoggedInUser={setLoggedInUser} />
      <SignUpForm modalSignup={modalSignup} handleModalSignup={handleModalSignup} setLoggedInUser={setLoggedInUser} />

    </>
  )
};

export default NavBar;