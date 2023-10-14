/*eslint-disable*/
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/auth.context";
import "./ProfilePage.css";
import EditProfile from "../../components/EditProfile/EditProfile";
import { Card, Button, Carousel } from "react-bootstrap";

function ProfilePage() {
  const { user, isLoading } = useContext(AuthContext);
  const [profileUser, setProfileUser] = useState(null);
  const [displayState, setDisplayState] = useState({}); // Estado para controlar la visibilidad de los productos
  const [isEditing, setIsEditing] = useState(false);

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
        const productToRemove = document.querySelector(
          `.product-card-${productId}`
        );
        if (productToRemove) {
          productToRemove.classList.add("product-card-exit");

          // Luego, espera a que termine la animación y elimina el producto
          productToRemove.addEventListener("animationend", () => {
            if (productToRemove.parentNode) {
              productToRemove.parentNode.removeChild(productToRemove);
            }
          });
        }
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

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleSaveProfile = (formData) => {
    const storedToken = localStorage.getItem("authToken");

    const userId = profileUser._id;
    const apiUrl = `http://localhost:5005/profile/${userId}/edit-profile`;

    axios
      .put(apiUrl, formData, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log("Perfil actualizado:", response.data);
        setProfileUser({
          ...profileUser,
          avatar: response.data.avatar,
        });

        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error al actualizar el perfil:", error);
      });
  };

  return (
    <div>
      {isLoading ? (
        <div>Cargando...</div>
      ) : profileUser ? (
        <div className="profile">
          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src={`${profileUser.avatar}?t=${Date.now()}`}
            />
            <Card.Body>
              <Card.Title>Perfil de {profileUser.name}</Card.Title>
              <Card.Text>
                Location: {profileUser.location}
                <br />
                E-mail: {profileUser.email}
              </Card.Text>
              {isEditing ? (
                <EditProfile
                  user={profileUser}
                  onSave={handleSaveProfile}
                  onCancel={handleCancelEdit}
                />
              ) : (
                <Button variant="primary" onClick={handleEditProfile}>
                  Editar Perfil
                </Button>
              )}
            </Card.Body>
          </Card>

          <ul className="product-list favUserUl">
            <h5>Favoritos</h5>
            {profileUser.favoriteProducts &&
            profileUser.favoriteProducts.length > 0 ? (
              profileUser.favoriteProducts.map((product, index) => (
                <li key={product._id}>
                  <div
                    className={`product-card ${
                      index === 0 ? "sticky-product" : ""
                    }`}
                  >
                    <button
                      className="btn-delete"
                      onClick={() => handleRemoveFavorite(product._id)}
                    >
                      <i class="bi bi-trash3-fill"></i>
                    </button>
                    <div className="product-image ">
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
                      {displayState[product._id] ? "Detalles" : "Detalles"}
                      <button
                        className="btn-delete"
                        onClick={() => handleRemoveFavorite(product._id)}
                      >
                        <i class="bi bi-trash3-fill"></i>
                      </button>
                    </button>
                    <div
                      className={`product-details ${
                        displayState[product._id] ? "active" : ""
                      }`}
                    >
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

          <ul className="product-list">
            <h5>Productos en Venta</h5>
            {profileUser.productsForSale &&
            profileUser.productsForSale.length > 0 ? (
              profileUser.productsForSale.map((product, index) => (
                <li key={product._id}>
                  <div className="product-card">
                    <Link to={`/product/${product._id}/edit`}>
                      <button className="editProductPerfil">
                        <i class="bi bi-pencil-square btn-profile-edit"></i>
                      </button>
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
                      className={`product-details ${
                        displayState[product._id] ? "active" : ""
                      }`}
                    >
                      <p>Descripción: {product.description}</p>
                      <p>Precio: ${product.price}</p>
                      <p>Condición: {product.condition}</p>
                      <p>Disponible: {product.available ? "Sí" : "No"}</p>
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
        <div>No se pudo cargar el perfil del usuario.</div>
      )}
    </div>
  );
}

export default ProfilePage;
