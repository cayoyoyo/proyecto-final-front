import { useEffect, useState, useContext } from "react";
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
          console.log(response.data)
          setProfileUser(response.data);
        })
        .catch((error) => {
          console.error("Error al obtener los datos del usuario:", error);
        });
    }

  }

  useEffect(() => {
    infoUser()
  }, [user, isLoading]);

  const handleRemoveFavorite = (productId) => {
    const apiUrl = `http://localhost:5005/profile/${profileUser._id}/favorites`;

    axios
      .post(apiUrl, {
        productId,
        action: "remove"
      })
      .then(() => {
        return axios.get(`http://localhost:5005/profile/${profileUser._id}/`)
      })
      .then((user) => {
        setProfileUser(user.data)
        console.log("user Test Axios ", user.data)
      })
      .catch((error) => {
        console.error("Error al eliminar el producto de favoritos:", error);
      });
  };

  const toggleDisplay = (productId) => {
    setDisplayState((prevState) => ({
      ...prevState,
      [productId]: !prevState[productId] // Invierte el estado del producto
    }));
  };

  return (
    <div>
      {isLoading ? (
        <div>Cargando...</div>
      ) : profileUser ? (
        <div>
          <h2>Perfil de {profileUser.name}</h2>
          {/* Otras partes del perfil */}
          {/* ... */}
          <h3 >Favoritos de {profileUser.name}</h3>
          <ul className="product-list favUserUl">

            {profileUser.favoriteProducts &&
              profileUser.favoriteProducts.length > 0 ? (
              profileUser.favoriteProducts.map((product) => (
                <li key={product._id}>
                  <div className="product-card ">
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
                      {displayState[product._id] ? "ver menos" : "ver mas"}
                    </button>

                    <div className={`product-details ${displayState[product._id] ? 'active' : ''}`}>
                      <div>
                        <p>{product.description}</p>
                        <p>Precio: ${product.price}</p>
                        <p>Condición: {product.condition}</p>
                        <p>Disponible: {product.available ? "Sí" : "No"}</p>
                        <p>
                          Fecha de publicación:{" "}
                          {new Date(product.publicationDate).toLocaleDateString()}
                        </p>
                      </div>
                      <button onClick={() => handleRemoveFavorite(product._id)}>
                        Eliminar de favoritos
                      </button>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <li>No hay productos favoritos</li>
            )}
          </ul>
        </div>
      ) : (
        <div>No se pudo cargar el perfil del usuario.</div>
      )}
    </div>
  );
}

export default ProfilePage;

