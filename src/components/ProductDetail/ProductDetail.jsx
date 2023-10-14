import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/auth.context";
import FavoritosButton from "../FavoriteButton/FavoriteButton";
import Chat from "../Chat/Chat"; // Importa el componente Chat
import "./ProductDetail.css";

function ProductDetail() {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [response, setResponse] = useState(false);

  const [user2Id, setUser2Id] = useState(null);
  const [user2, setuser2] = useState(null);
  console.log("vendedor === ", user2);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Agrega una variable de usuario actual (debes obtener esta información de tu sistema de autenticación)

  const API_URL = "http://localhost:5005";

  useEffect(() => {
    axios
      .get(`${API_URL}/product/${id}`)
      .then((ProductDetail) => {
        setProduct(ProductDetail.data);
        setUser2Id(ProductDetail.data.seller._id)
        setResponse(true);
        return ProductDetail.data.seller._id
      })
      .then((user2) => {

        axios
          .get(`http://localhost:5005/profile/${user2}`)
          .then((response) => {
            console.log("setuser2 ", response.data);
            setuser2(response.data);
          })

      })
      .catch((err) => console.log(err));


  }, [id]);

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  const navigateImage = (step) => {
    const newIndex = currentImageIndex + step;
    if (newIndex >= 0 && newIndex < product.images.length) {
      setCurrentImageIndex(newIndex);
    }
  };

  return (
    <div className="product-detail-container">
      {response ? (
        <div className="product-detail-div1">
          <h2 className="product-title">Detalles del Producto</h2>
          <div className="product-info">

            <div className="product-images">
              <div className="large-image">
                <img
                  className="imgDetails"
                  src={product.images[currentImageIndex]}
                  alt={`Imagen ${currentImageIndex + 1} de productos`}
                />
              </div>
              <div className="thumbnails">
                {product.images.map((image, index) => (
                  <div
                    key={index}
                    className={`thumbnail ${index === currentImageIndex ? 'selected' : ''}`}
                    onClick={() => handleThumbnailClick(index)}
                  >
                    <img
                      className="thumbnail-img"
                      src={image}
                      alt={`Imagen ${index + 1} de productos`}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="product-detailss">
              {product.available ? (
                <p className="product-status disponible">DISPONIBLE</p>
              ) : (
                <p className="product-status no-disponible">NO DISPONIBLE</p>
              )}
              <div className="titleDetailsProduct">
                <div>
                  <h2 className="product-name">{product.title}</h2>
                </div>
                <div>
                  <FavoritosButton id={id} />
                </div>
              </div>

              <p className="product-seller">{product.seller.name}</p>

              <p className="product-condition">
                <strong>Condición:</strong> {product.condition}
              </p>
              <p className="product-price">
                <strong>Precio:</strong> {product.price} €
              </p>
              <p className="product-description">
                <strong>Descripción:</strong> {product.description}
              </p>
              <p className="product-category">
                <strong>Categoría:</strong> {product.category}
              </p>
              {/* <button className="favorite-button">Agregar a Favoritos</button> */}
              {user._id === user2Id ? (
                <button className="edit-button1">
                  <a className="edit-button-a" href={`/product/${id}/edit`}>Editar Producto</a>
                </button>
              ) : (
                <button className="chat-button" onClick={toggleChat}>
                  {showChat ? 'Cerrar Chat' : 'Abrir Chat'}
                </button>
              )}


            </div>
          </div>
          {showChat && <Chat vendedor={user2} />}
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
}


export default ProductDetail;
