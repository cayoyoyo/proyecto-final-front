import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/auth.context";
import "./ProfilePage.css";

function ProfilePage() {
  const { user, isLoading } = useContext(AuthContext);
  const [profileUser, setProfileUser] = useState(null);
  const [displayState, setDisplayState] = useState({}); // Estado para controlar la visibilidad de los productos

  function infoUser() {
    if (!isLoading) {
      const storedToken = localStorage.getItem("authToken");

      const userId = user._id;
      const apiUrl = `http://localhost:5005/profile/${userId}`;

      axios
        .get(apiUrl, { headers: { Authorization: `Bearer ${storedToken}` } })
        .then((response) => {
          console.log(response.data);
          setProfileUser(response.data);
        })
        .catch((error) => {
          console.error("Error al obtener los datos del usuario:", error);
        });
    }
  }

  useEffect(() => {
    infoUser();
  }, [user, isLoading]);

  const handleRemoveFavorite = (productId) => {
    const apiUrl = `http://localhost:5005/profile/${profileUser._id}/favorites`;

    axios
      .post(apiUrl, {
        productId,
        action: "remove",
      })
      .then(() => {
        return axios.get(`http://localhost:5005/profile/${profileUser._id}/`);
      })
      .then((user) => {
        setProfileUser(user.data);
        console.log("user Test Axios ", user.data);
      })
      .catch((error) => {
        console.error("Error al eliminar el producto de favoritos:", error);
      });
  };

  const toggleDisplay = (productId) => {
    setDisplayState((prevState) => ({
      ...prevState,
      [productId]: !prevState[productId], // Invierte el estado del producto
    }));
  };

  return (
    <div>
      {isLoading ? (
        <div>Cargando...</div>
      ) : profileUser ? (
        <div>
          <h2>Perfil de {profileUser.name}</h2>
          {console.log("profileUser ===> ", profileUser)}
          {/* ... */}


          <h5>Location: {profileUser.location}</h5>
          <h5>e-mail: {profileUser.email}</h5>

          <h5>Favoritos:</h5>
          <ul className="product-list favUserUl">

            {profileUser.favoriteProducts &&
              profileUser.favoriteProducts.length > 0 ? (
              profileUser.favoriteProducts.map((product, index) => (
                <li key={product._id}>
                  <div className={`product-card ${index === 0 ? "sticky-product" : ""}`}>
                    <button className="btn-delete" onClick={() => handleRemoveFavorite(product._id)}>
                      <i class="bi bi-trash3-fill"></i>
                    </button>
                    <div className="product-image " >
                      {product.images && product.images.length > 0 ? (
                        <img className="profile-image" src={product.images[0]} alt={product.title} />
                      ) : (
                        <div>No hay imagen disponible</div>
                      )}
                    </div>

                    <p className="titleProducto">{product.title}</p>
                    <button
                      className="addProducto"
                      onClick={() => toggleDisplay(product._id)}
                    >
                      {displayState[product._id] ? "ver mas" : "ver mas"}
                    </button>

                    {/* <div
                      className={`product-details ${displayState[product._id] ? "active" : ""
                        }`}
                    > */}
                    <div className={`product-details ${displayState[product._id] ? "active overlay" : ""}`}>

                      <div>
                        <p>{product.description}</p>
                        <p>Precio: ${product.price}</p>
                        <p>Condición: {product.condition}</p>
                        <p>Disponible: {product.available ? "Sí" : "No"}</p>
                        <p>
                          Fecha de publicación:{" "}
                          {new Date(
                            product.publicationDate
                          ).toLocaleDateString()}
                        </p>
                        <button
                          className="addProducto"
                          onClick={() => toggleDisplay(product._id)}
                        >
                          {displayState[product._id] ? "ver menos" : ""}
                        </button>
                      </div>

                    </div>
                  </div>
                </li>
              ))
            ) : (
              <li>No hay productos favoritos</li>
            )}
          </ul>


          <h5>Productos en Venta:</h5>
          <ul className="product-list">
            {profileUser.productsForSale &&
              profileUser.productsForSale.length > 0 ? (
              profileUser.productsForSale.map((product, index) => (
                <li key={product._id}>
                  <div className="product-card">
                    <Link to={`/product/${product._id}/edit`}>
                      <button className="editProductPerfil"><i class="bi bi-pencil-square btn-profile-edit"></i></button>
                    </Link>
                    <div className="product-image">
                      {product.images && product.images.length > 0 ? (
                        <img
                          className="profile-image"
                          src={product.images[0]}
                          alt={product.title}
                        />
                      ) : (
                        <div>No hay imagen disponible</div>
                      )}
                    </div>
                    <p className="titleProducto">{product.title}</p>
                    <button
                      className="toggle-product-details"
                      onClick={() => toggleDisplay(product._id)}
                    >
                      {displayState[product._id] ? "Detalles -" : "Detalles +"}
                    </button>
                    <div
                      className={`product-details ${displayState[product._id] ? "active" : ""
                        }`}
                    >
                      <p>Descripción: {product.description}</p>
                      <p>Precio: ${product.price}</p>
                      <p>Condición: {product.condition}</p>
                      <p>
                        Disponible: {product.available ? "Sí" : "No"}
                      </p>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <li>No hay productos en venta</li>
            )}
          </ul>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default ProfilePage;
