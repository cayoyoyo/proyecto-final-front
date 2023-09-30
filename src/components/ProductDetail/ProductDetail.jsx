import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import FavoritosButton from "../FavoriteButton";
import "./ProductDetail.css";



function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const API_URL = "http://localhost:5005";

  useEffect(() => {
    axios
      .get(`${API_URL}/product/${id}`)
      .then((ProductDetail) => {
        // console.log("Product Detail === " + ProductDetail.data);
        setProduct(ProductDetail.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (!product) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <h2>Detalles del Producto</h2>
      <div className="divDetailProduct">
        <div className="detailTitle">
          <FavoritosButton />
          <h2>{product.title}</h2>
          <p>{product.seller}</p>
          <p>
            {product.available ? (
              <p className="disponible">DISPONIBLE</p>
            ) : (
              <p className="noDisponible">NO DISPONIBLE</p>
            )}
          </p>

          <Link to={`/product/${id}/edit`}>
            <button>Editar Producto</button>
          </Link>
        </div>

        <div className="product-images">
          {product.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Imagen ${index + 1} de productos`}
              className="product-image"
            />
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

        <button>CHAT</button>
      </div>
    </>
  );
}

export default ProductDetail;
