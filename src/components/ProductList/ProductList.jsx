import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import FavoritosButton from "../FavoriteButton/FavoriteButton";
import ProductForm from "../ProductForm/ProductForm";
import Searchbar from '../Searchbar/Searchbar';

function ProductList() {
  const API_URL = "http://localhost:5005";

  const [products, setProducts] = useState([]);
  const [display, setDisplay] = useState("none");

  useEffect(() => {
    axios
      .get(`${API_URL}/product`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((err) =>
        console.log("Error al cargar la lista de productos: " + err)
      );
  }, []);

  const fetchProducts = () => {
    axios
      .get(`${API_URL}/product`)
      .then((response) => {
        console.log("response === " + response.data);
        setProducts(response.data);
      })
      .catch((err) => console.log("hay un error " + err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Función para realizar la búsqueda de productos
  const handleSearch = (searchTerm) => {
    axios
      .get(`${API_URL}/product?term=${searchTerm}`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error al buscar productos:", error);
      });
  };

  return (
    <div>
      <h1>Lista de Productos</h1>
      <button
        className="addProduct"
        onClick={() => {
          if (display === "none") {
            setDisplay("active");
          } else {
            setDisplay("none");
          }
        }}
      >
        New Product{" "}
      </button>

      <div className={display}>
        <ProductForm reloadProducts={fetchProducts} />
      </div>

      {/* Agrega la barra de búsqueda */}
      <Searchbar onSearch={handleSearch} />

      <ul className="ulListaProdutos">
        {products.map((producto) => (
          <li className="liListaProdutos" key={producto._id}>
            <FavoritosButton id={producto._id} favorito={producto.isFavorite} />
            <img
              className="product-image"
              src={producto.images[0]}
              alt={producto.title}
            />
            <p className="titleProducto">{producto.title}</p>
            <p>€ {producto.price}</p>

            <Link to={`/product/${producto._id}`}>
              <button className="btnProducto">Ver más </button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
