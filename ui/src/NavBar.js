import React, { useState } from "react";
import logo_text from "./images/logo_text.png";
import logo from "./images/logo_transparent.png";


const NavBar = () => {
  const [collapse, setCollapse] = useState(true);
  const [modalLogin, setModalLogin] = useState(false);
  const [modalSignup, setModalSignup] = useState(false);

  const handleNavbarCollapse = (e) => {
    setCollapse((collapse) => !collapse)
  };

  const handleModalLogin = (e) => {
    e.stopPropagation();
    setModalLogin((modal) => !modal)
  };

  const handleModalSignup = (e) => {
    e.stopPropagation();
    setModalSignup((modal) => !modal)
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src={logo_text} alt="Hydropin page logo" style={{ height: '80px' }} />
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
                <a className="nav-link" href="#">Maps</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">News</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">About</a>
              </li>
            </ul>
            <span>
              <ul className="navbar-nav" id="navbar-right">
                <li className="nav-item">
                  <a className="nav-link login-button" type="button" onClick={handleModalLogin}>Log in</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" type="button" onClick={handleModalSignup}>Sign up</a>
                </li>
              </ul>
            </span>

          </div>
        </div>
      </nav>

      <div className={`modal fade ${modalLogin ? 'show' : ''}`} id="loginModal" tabindex="-1" style={{ display: modalLogin ? 'block' : 'none', backgroundColor: 'rgba(0,0,0,0.25)' }} onClick={handleModalLogin}>
        <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
          <div className="modal-content">
            <div className="modal-head">
              <div className="modal-logo">
                <img src={logo} width="50px" />
                <button type="button" className="btn-close" onClick={handleModalLogin}></button>
              </div>
              <h1>Welcome to Hydropin</h1>
            </div>
            <div className="modal-body mb-5">
              <form>
                <div className="mb-3">
                  <label for="email" className="form-label">Email address</label>
                  <input type="email" className="form-control" id="email" />
                </div>
                <div className="mb-5">
                  <label for="password" className="form-label">Password</label>
                  <input type="password" className="form-control" id="password" />
                  <div className="form-text">Forgot your password?</div>
                </div>
                <div class="d-grid gap-2"><button type="submit" className="btn btn-danger">Log in</button></div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className={`modal fade ${modalSignup ? 'show' : ''}`} id="signupModal" tabindex="-1" style={{ display: modalSignup ? 'block' : 'none', backgroundColor: 'rgba(0,0,0,0.25)' }} onClick={handleModalSignup}>
        <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
          <div className="modal-content">
            <div className="modal-head">
              <div className="modal-logo">
                <img src={logo} width="50px" />
                <button type="button" className="btn-close" onClick={handleModalSignup}></button>
              </div>
              <h1>Welcome to Hydropin</h1>
            </div>
            <div className="modal-body mb-5">
              <form>
              <div className="mb-3">
                  <label for="first-name" className="form-label">First Name</label>
                  <input type="text" className="form-control" id="first-name" />
                </div>
                <div className="mb-3">
                  <label for="last-name" className="form-label">Last Name</label>
                  <input type="text" className="form-control" id="last-name" />
                </div>
                <div className="mb-3">
                  <label for="email" className="form-label">Email address</label>
                  <input type="email" className="form-control" id="email" />
                </div>
                <div className="mb-5">
                  <label for="password" className="form-label">Password</label>
                  <input type="password" className="form-control" id="password" />
                </div>
                <div class="d-grid gap-2"><button type="submit" className="btn btn-danger">Sign me up</button></div>
              </form>
            </div>
          </div>
        </div>
      </div>

    </>
  )
};

export default NavBar;