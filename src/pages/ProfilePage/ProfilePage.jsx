/*eslint-disable*/
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/auth.context";
import "./ProfilePage.css";
import EditProfile from "../../components/EditProfile/EditProfile";
import { Card, Button, Container, Row, Col, Collapse } from "react-bootstrap";

function ProfilePage() {
  const { user, isLoading } = useContext(AuthContext);
  const [profileUser, setProfileUser] = useState(null);
  const [displayState, setDisplayState] = useState({}); // Estado para controlar la visibilidad de los productos
  const [isEditing, setIsEditing] = useState(false);

  function infoUser() {
    if (!isLoading) {
      const storedToken = localStorage.getItem("authToken");

      const userId = user._id;
      const apiUrl = `${process.env.REACT_APP_SERVER_URL}/profile/${userId}`;

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
    const apiUrl = `${process.env.REACT_APP_SERVER_URL}/profile/${profileUser._id}/favorites`;

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
        return axios.get(
          `${process.env.REACT_APP_SERVER_URL}/profile/${profileUser._id}/`
        );
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
    const apiUrl = `${process.env.REACT_APP_SERVER_URL}/profile/${userId}/edit-profile`;

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
          <Card
            style={{
              width: "14rem",
              marginTop: "50px",
              marginLeft: "80px",
              marginRight: "60px",
            }}
          >
            <Card.Img
              variant="top"
              src={`${profileUser.avatar}?t=${Date.now()}`}
            />
            <Card.Body>
              <Card.Title>Perfil de {profileUser.name}</Card.Title>
              <Card.Text>
              Ubicación: {profileUser.location}
                <br />
             {profileUser.email}
              </Card.Text>
              {isEditing ? (
                <EditProfile
                  user={profileUser}
                  onSave={handleSaveProfile}
                  onCancel={handleCancelEdit}
                />
              ) : (
                <Button variant="primary" onClick={handleEditProfile} style={{ backgroundColor: "#66CCFF", border: "none" }}>
                  Editar Perfil
                </Button>
              )}
            </Card.Body>
          </Card>

          <Container className="fav-container">
            <h5 className="sticky-top bg-white p-2">Favoritos</h5>
            <Row xs={1} sm={2} md={3} lg={2}>
              {profileUser.favoriteProducts.map((product, index) => (
                <Col key={product._id}>
                  <Card className="product-card">
                    <Link to={`/product/${product._id}`}>
                      <Card.Img
                        className="product-img"
                        variant="top"
                        src={
                          product.images && product.images.length > 0
                            ? product.images[0]
                            : "placeholder.jpg"
                        }
                      />{" "}
                    </Link>
                    <Card.Body>
                      <Card.Title className="titulofav">{product.title}</Card.Title>
                      <Card.Text>
                        Precio: ${product.price}
                        <br />
                        Disponible: {product.available ? "Sí" : "No"}
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <Button
                        variant="danger"
                        onClick={() => handleRemoveFavorite(product._id)}
                      >
                        Eliminar
                      </Button>
                    </Card.Footer>
                  </Card>
                  {index === 1 && <hr className="my-3" />}
                </Col>
              ))}
            </Row>
          </Container>

          <Container className="fav-container">
            <h5 className="sticky-top bg-white p-2">Productos en Venta</h5>
            <Row xs={1} sm={2} md={3} lg={2}>
              {profileUser.productsForSale &&
              profileUser.productsForSale.length > 0 ? (
                profileUser.productsForSale.map((product, index) => (
                  <Col key={product._id}>
                    <Card className="product-card">
                      <Link to={`/product/${product._id}/edit`}>
                        <Card.Img
                          className="product-img"
                          variant="top"
                          src={
                            product.images && product.images.length > 0
                              ? product.images[0]
                              : "placeholder.jpg"
                          }
                        />
                      </Link>
                      <Card.Body>
                        <Card.Title className="titulofav">{product.title}</Card.Title>
                        <Card.Text>
                          Precio: ${product.price}
                          <br />
                          Disponible: {product.available ? "Sí" : "No"}
                        </Card.Text>
                      </Card.Body>
                      <Card.Footer>
                        <Button style={{color: "#000", backgroundColor: "rgb(232, 235, 238)", border: "none" }}
                          variant="danger"
                          onClick={() => toggleDisplay(product._id)}
                        >
                          {displayState[product._id]
                            ? "Ocultar Detalles"
                            : "Mostrar Detalles"}
                        </Button>
                      </Card.Footer>
                      <Collapse in={displayState[product._id]}>
                        <div className="product-details">
                          <Card.Text>
                            Descripción: {product.description}
                            <br />
                            Condición: {product.condition}
                          </Card.Text>
                        </div>
                      </Collapse>
                    </Card>
                    {index === 1 && <hr className="my-3" />}
                  </Col>
                ))
              ) : (
                <li>No hay productos en venta</li>
              )}
            </Row>
          </Container>
        </div>
      ) : (
        <div>No se pudo cargar el perfil del usuario.</div>
      )}
    </div>
  );
}

export default ProfilePage;
