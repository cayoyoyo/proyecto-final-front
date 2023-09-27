import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import FavoriteButton from "../FavoriteButton";
import ProductForm from "./ProductForm";

function ProductList() {
  const API_URL = "http://localhost:5005";

  const [products, setProducts] = useState([]);
  const [display, setDisplay] = useState("none");

  useEffect(() => {
    axios
      .get(`${API_URL}/product`)
      .then((response) => {
        console.log("response === " + response.data);
        setProducts(response.data);
      })
      .catch((err) => console.log("hay un error " + err));
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
        <ProductForm />
      </div>

      <ul className="ulListaProdutos">
        {products.map((producto) => (
          <li className="liListaProdutos" key={producto._id}>
            <FavoriteButton />
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
