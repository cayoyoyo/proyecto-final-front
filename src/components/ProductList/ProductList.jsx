import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import FavoritosButton from "../FavoriteButton";
import ProductForm from "../ProductForm/ProductForm";

function ProductList() {
  const API_URL = "http://localhost:5005";

  const [products, setProducts] = useState([]);
  const [display, setDisplay] = useState("none");

  // Cargar la lista de productos y su estado de favoritos al cargar la página
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
    fetchProducts(); // Carga la lista de productos cuando el componente se monta
  }, []);

  return (
    <div>
      <h1>Lista de Productos</h1>
      <button
        className="addProducto"
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
