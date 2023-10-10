import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import 'font-awesome/css/font-awesome.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider's `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    // <nav className="navBar">
    //   <Link to="/">
    //     <button> <i className="fa fa-home"></i> </button>
    //   </Link>

    //   <Link to="/product">
    //     <button><i class="bi bi-shop"></i> Producto</button>
    //   </Link>


    //   {!isLoggedIn && (
    //     <>
    //       <Link to="/signup">
    //         {" "}
    //         <button>Sign Up</button>{" "}
    //       </Link>
    //       <Link to="/login">
    //         {" "}
    //         <button>Login</button>{" "}
    //       </Link>
    //     </>
    //   )}

    //   {isLoggedIn && (
    //     <>
    //       <button onClick={logOutUser}>Logout</button>

    //       <Link to="/profile">
    //         <button>Profile</button>
    //         {/* <img src="https://picsum.photos/id/402/200/300" style={{ width: 50, height: 50, borderRadius: 25}} alt="profile" /> */}
    //       </Link>

    //       <span>{user && user.name}</span>
    //     </>
    //   )}
    // </nav>

    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark navBarPg">
      <div className="container-fluid">
        <a className="navbar-brand" Link to="/profile">{user && user.name}</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item">
              <Link to="/" aria-current="page" className="nav-link active" >Inicio</Link>
            </li>

            {isLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link" Link to="/product">Productos</Link>
              </li>
            )}
          </ul>

          {isLoggedIn && (
            <form className="d-flex" role="search">
              {/* <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
            <button className="btn btn-outline-success" type="submit">Search</button> */}
              < li className="nav-item">
                <button onClick={logOutUser}>Logout</button>
              </li>
            </form>
          )}

          {!isLoggedIn && (
            <form className="d-flex" role="search">
              <Link to="/signup">
                {" "}
                <button>Sign Up</button>{" "}
              </Link>
              <Link to="/login">
                {" "}
                <button>Login</button>{" "}
              </Link>
            </form>
          )}

        </div>
      </div>
    </nav >
  );
}

export default Navbar;
