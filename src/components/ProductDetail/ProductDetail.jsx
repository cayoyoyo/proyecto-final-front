import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import FavoritosButton from "../FavoriteButton/FavoriteButton";
import Chat from "../Chat/Chat"; // Importa el componente Chat
import "./ProductDetail.css";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [response, setResponse] = useState(false);

  const [user2Id, setUser2Id] = useState(null);
  const [user2, setuser2] = useState(null);
  console.log("vendedor === ", user2);

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

  return (
    <>
      {response ? (
        <div>
          <h2>Detalles del Producto</h2>
          <div className="divDetailProduct">
            <div className="detailTitle">
              <FavoritosButton id={id} />

              <h2>{product.title}</h2>
              <p>{product.seller.name}</p>

              {product.available ? (
                <p className="disponible">DISPONIBLE</p>
              ) : (
                <p className="noDisponible">NO DISPONIBLE</p>
              )}

              <Link to={`/product/${id}/edit`}>
                <button>Editar Producto</button>
              </Link>
            </div>

            <div className="product-images">
              {product.images.map((image, index) => (
                <div key={index} className="images-individual">
                  <img
                    key={index}
                    src={image}
                    alt={`Imagen ${index + 1} de productos`}
                    className="product-image"
                  />
                </div>
              ))}
            </div>

            <div className="detailText">
              <p>
                <strong>Condición:</strong> {product.condition}
              </p>
              <p>
                <strong>Precio:</strong> {product.price}
              </p>
              <strong>Descripción:</strong>
              <p> {product.description}</p>
            </div>
            <p>
              <strong>Category:</strong> {product.category}
            </p>
          </div>

          {/* Botón para abrir o cerrar el chat */}
          <button onClick={toggleChat}>
            {showChat ? "Cerrar Chat" : "Abrir Chat"}
          </button>

          {/* Renderiza el componente Chat si showChat es true */}
          {showChat && <Chat vendedor={user2} />}
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </>
  );
}

export default ProductDetail;
