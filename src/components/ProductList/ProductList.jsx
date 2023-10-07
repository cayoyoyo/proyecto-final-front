import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import FavoritosButton from "../FavoriteButton/FavoriteButton";
import ProductForm from "../ProductForm/ProductForm";
import Searchbar from "../Searchbar/Searchbar";

function ProductList() {
  const API_URL = "http://localhost:5005";

  const [products, setProducts] = useState([]);
  const [display, setDisplay] = useState("none");
  const [response, setResponse] = useState(false)



  const fetchProducts = () => {
    axios
      .get(`${API_URL}/product`)
      .then((response) => {
        // console.log("response === " + response.data);
        setProducts(response.data);
        setResponse(true);
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

  return (<>
    {response ? <div className="pagProductos">
      <div className="categoria">
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

        <p>Categoria x </p>
        <p>Categoria y </p>
        <p>Categoria z </p>
      </div>

      <div className="listado">
        <div className="searchbar1">
          <Searchbar onSearch={handleSearch} />
        </div>
        <ul className="ulListaProdutos">
          {products.map((producto) => (
            <li className="liListaProdutos" key={producto._id}>
              <FavoritosButton
                id={producto._id}
                favorito={producto.isFavorite}
              />
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
    </div> : <p>Cargando...</p>}</>
  );
}

export default ProductList;
