import "./SignupPage.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";
// import axios from "axios";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handleLocation = (e) => setLocation(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password, name, location };

    // Send a request to the server using axios

    // const authToken = localStorage.getItem("authToken");
    // axios
    //   .post(`${process.env.REACT_APP_SERVER_URL}/auth/signup`, requestBody, {
    //     headers: { Authorization: `Bearer ${authToken}` },
    //   })
      // .then((response) => {})

      // Or using a service
      authService
        .signup(requestBody)
      .then((response) => {
        // If the POST request is successful redirect to the login page
        navigate("/login");
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
            <h2 className="text-center mb-4">Sign Up</h2>
            <form onSubmit={handleSignupSubmit} className="p-4 border rounded">
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
                <label htmlFor="password">Password</label>
              </div>
  
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={name}
                  onChange={handleName}
                  placeholder="Your name"
                  required
                />
                <label htmlFor="name">Name</label>
              </div>
  
              <div className="form-floating mb-3">
                <label htmlFor="location">Location (Provincia)</label>
                <select
                  name="location"
                  id="location"
                  value={location}
                  onChange={handleLocation}
                  className="form-control"
                  required
                >
                  <option value=""></option>
          <option value="Álava">Álava</option>
          <option value="Albacete">Albacete</option>
          <option value="Alicante">Alicante</option>
          <option value="Almería">Almería</option>
          <option value="Asturias">Asturias</option>
          <option value="Ávila">Ávila</option>
          <option value="Badajoz">Badajoz</option>
          <option value="Barcelona">Barcelona</option>
          <option value="Burgos">Burgos</option>
          <option value="Cáceres">Cáceres</option>
          <option value="Cádiz">Cádiz</option>
          <option value="Cantabria">Cantabria</option>
          <option value="Castellón">Castellón</option>
          <option value="Ciudad Real">Ciudad Real</option>
          <option value="Córdoba">Córdoba</option>
          <option value="Cuenca">Cuenca</option>
          <option value="Gerona">Gerona</option>
          <option value="Granada">Granada</option>
          <option value="Guadalajara">Guadalajara</option>
          <option value="Guipúzcoa">Guipúzcoa</option>
          <option value="Huelva">Huelva</option>
          <option value="Huesca">Huesca</option>
          <option value="Islas Balears">Islas Balears</option>
          <option value="Jaén">Jaén</option>
          <option value="La Coruña">La Coruña</option>
          <option value="La Rioja">La Rioja</option>
          <option value="Las Palmas">Las Palmas</option>
          <option value="León">León</option>
          <option value="Lérida">Lérida</option>
          <option value="Lugo">Lugo</option>
          <option value="Madrid">Madrid</option>
          <option value="Málaga">Málaga</option>
          <option value="Murcia">Murcia</option>
          <option value="Navarra">Navarra</option>
          <option value="Orense">Orense</option>
          <option value="Palencia">Palencia</option>
          <option value="Pontevedra">Pontevedra</option>
          <option value="Salamanca">Salamanca</option>
          <option value="Santa Cruz de Tenerife">Santa Cruz de Tenerife</option>
          <option value="Segovia">Segovia</option>
          <option value="Sevilla">Sevilla</option>
          <option value="Soria">Soria</option>
          <option value="Tarragona">Tarragona</option>
          <option value="Teruel">Teruel</option>
          <option value="Toledo">Toledo</option>
          <option value="Valencia">Valencia</option>
          <option value="Valladolid">Valladolid</option>
          <option value="Vizcaya">Vizcaya</option>
          <option value="Zamora">Zamora</option>
          <option value="Zaragoza">Zaragoza</option>
        </select>
        </div>


        <button type="submit" className="btn btn-primary">
              Sign Up
            </button>

            {errorMessage && (
              <p className="error error-message">{errorMessage}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
