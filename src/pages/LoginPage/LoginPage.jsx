import "./LoginPage.css";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import authService from "../../services/auth.service";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    // Send a request to the server using axios
    /* 
    axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/login`)
      .then((response) => {})
    */

    // Or using a service
    authService
      .login(requestBody)
      .then((response) => {
        // If the POST request is successful store the authentication token,
        // after the token is stored authenticate the user
        // and at last navigate to the home page
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((error) => {
        // If the request resolves with an error, set the error message in the state
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="container my-5">
    <div className="row justify-content-center">
      <div className="col-lg-5 col-md-7 col-sm-9">
        <h2 className="text-center mb-4">Iniciar sesión</h2>
        <form onSubmit={handleLoginSubmit} className="p-4 border rounded">
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={handleEmail}
              placeholder="Your email"
              required
            />
            <label htmlFor="email">Email</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              onChange={handlePassword}
              placeholder="Your password"
              required
            />
            <label htmlFor="password">Contraseña</label>
          </div>

          <button type="submit" className="btn btn-primary">
          Iniciar sesión
          </button>

          {errorMessage && (
            <p className="error error-message">{errorMessage}</p>
          )}
        </form>
        <p>¿Aún no tienes una cuenta?</p>
        <Link to={"/signup"}> Registrarse</Link>
      </div>
    </div>
  </div>

  );
}

export default LoginPage;
