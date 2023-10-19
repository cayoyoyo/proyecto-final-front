/*eslint-disable*/

import "./SignupPage.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleConfirmPassword = (e) => setConfirmPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handleLocation = (e) => setLocation(e.target.value);

  const categories = [
    "Álava",
    "Albacete",
    "Alicante",
    "Almería",
    "Asturias",
    "Ávila",
    "Badajoz",
    "Barcelona",
    "Burgos",
    "Cáceres",
    "Cádiz",
    "Cantabria",
    "Castellón",
    "Ciudad Real",
    "Córdoba",
    "Cuenca",
    "Gerona",
    "Granada",
    "Guadalajara",
    "Guipúzcoa",
    "Huelva",
    "Huesca",
    "Islas Balears",
    "Jaén",
    "La Coruña",
    "La Rioja",
    "Las Palmas",
    "León",
    "Lérida",
    "Lugo",
    "Madrid",
    "Málaga",
    "Murcia",
    "Navarra",
    "Orense",
    "Palencia",
    "Pontevedra",
    "Salamanca",
    "Santa Cruz de Tenerife",
    "Segovia",
    "Sevilla",
    "Soria",
    "Tarragona",
    "Teruel",
    "Toledo",
    "Valencia",
    "Valladolid",
    "Vizcaya",
    "Zamora",
    "Zaragoza",
  ];

  const handleSignupSubmit = (e) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      // Muestra un mensaje de error o realiza alguna acción en caso de que las contraseñas no coincidan
      setErrorMessage("Las contraseñas no coinciden");
      return;
    }
  
    // Create an object representing the request body
    const requestBody = { email, password, name, location };
  
    // Envía una solicitud al servidor utilizando axios o tu servicio
  
    // const authToken = localStorage.getItem("authToken");
    // axios
    //   .post(`${process.env.REACT_APP_SERVER_URL}/auth/signup`, requestBody, {
    //     headers: { Authorization: `Bearer ${authToken}` },
    //   })
    // .then((response) => {})
  
    // O usa un servicio
    authService
      .signup(requestBody)
      .then((response) => {
        // Si la solicitud POST es exitosa, redirige a la página de inicio de sesión
        navigate("/login");
      })
      .catch((error) => {
        // Si la solicitud se resuelve con un error, establece el mensaje de error en el estado
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };
  

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-5 col-md-7 col-sm-9">
          <h2 className="text-center mb-4">Crea una cuenta</h2>
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
              <label htmlFor="email">Dirección de email</label>
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

            <div className="form-floating mb-3">
  <input
    type="password"
    className="form-control"
    id="confirmPassword"
    name="confirmPassword"
    value={confirmPassword} 
    onChange={handleConfirmPassword} 
    placeholder="Confirm your password"
    required
  />
  <label htmlFor="confirmPassword">Confirmar contraseña</label>
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
              <label htmlFor="name">Nombre</label>
            </div>

            <div className="form-floating mb-3">
              <label htmlFor="location" className={`form-label custom-label`}>
                Ubicación (Provincia)
              </label>
              <select
                name="location"
                id="location"
                value={location}
                onChange={handleLocation}
                className="form-select"
                style={{ height: "90px" }}
                required
              >
                <option value=""></option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="btn btn-primary">
              Crear cuenta
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
