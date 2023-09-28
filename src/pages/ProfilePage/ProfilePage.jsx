import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/auth.context";
import "./ProfilePage.css";

function ProfilePage() {
  const { user, isLoading } = useContext(AuthContext);
  const [profileUser, setProfileUser] = useState(null);

  useEffect(() => {
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
  }, [user, isLoading]);

  const handleRemoveFavorite = (productId) => {
    const apiUrl = `http://localhost:5005/profile/${profileUser._id}/favorites/remove`;

    axios
      .delete(apiUrl, { data: { productId } })
      .then((response) => {
        // Actualiza los datos del usuario en el estado después de la eliminación
        setProfileUser(response.data.user);
      })
      .catch((error) => {
        console.error("Error al eliminar el producto de favoritos:", error);
      });
  };

  return (
    <div>
      {isLoading ? (
        <div>Cargando...</div>
      ) : profileUser ? (
        <div>
          <h2>Perfil de {profileUser.name}</h2>
          <p>Nombre: {profileUser.name}</p>
          <p>Email: {profileUser.email}</p>
          <p>Ubicación: {profileUser.location || "No especificada"}</p>

          {/* <h3>Productos Favoritos {profileUser.favoriteProducts}</h3> */}
          <ul className="product-list">
            {profileUser.favoriteProducts &&
            profileUser.favoriteProducts.length > 0 ? (
              profileUser.favoriteProducts.map((product) => (
                <li key={product._id}>
                  <div className="product-card">
                    <div className="product-image">
                      {product.images && product.images.length > 0 ? (
                        <img src={product.images[0]} alt={product.title} />
                      ) : (
                        <div>No hay imagen disponible</div>
                      )}
                    </div>
                    <div className="product-details">
                      <h3>{product.title}</h3>
                      <p>{product.description}</p>
                      <p>Precio: ${product.price}</p>
                      <p>Condición: {product.condition}</p>
                      <p>Disponible: {product.available ? "Sí" : "No"}</p>
                      <p>
                        Fecha de publicación:{" "}
                        {new Date(product.publicationDate).toLocaleDateString()}
                      </p>
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
