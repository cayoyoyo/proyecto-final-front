import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark navBarPg">
      <div className="container-fluid">

        <Link to={isLoggedIn ? "/profile" : "/"} className="navbar-brand">
          {isLoggedIn ? user.name : "Mi Sitio"}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >


          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item">
              <Link to="/" aria-current="page" className="nav-link active">
                Inicio
              </Link>
            </li>
            {isLoggedIn && (
              <li className="nav-item">
                <Link to="/product" className="nav-link">
                  Productos
                </Link>
              </li>
            )}
          </ul>

          <form className="d-flex" role="search">
            {isLoggedIn ? (
              <ul className="navbar-nav">
                <li className="nav-item">
                  <button onClick={logOutUser} className="nav-link">
                    Logout
                  </button>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/signup" className="nav-link">
                    Sign Up
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>
              </ul>
            )}
          </form>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
