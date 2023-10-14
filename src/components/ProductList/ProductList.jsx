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
        setResponse(true); // para provar 
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
            // <li className="liListaProdutos" key={producto._id}>
            //   <FavoritosButton
            //     id={producto._id}
            //     favorito={producto.isFavorite}
            //   />
            //   <img
            //     className="product-image "
            //     src={producto.images[0]}
            //     alt={producto.title}
            //   />
            //   <p className="titleProducto">{producto.title}</p>
            //   <p>€ {producto.price}</p>

            //   <Link to={`/product/${producto._id}`}>
            //     <button className="btnProducto btn btn-light">Ver más </button>
            //   </Link>
            // </li>

            <li className="product-item1" key={producto._id}>

              <img
                className="product-image1"
                src={producto.images[0]}
                alt={producto.title}
              />
              <div className="product-info1">
                <div className="titleBtnFav1">
                  <h3 className="product-title1">{producto.title}</h3>
                  <FavoritosButton
                    id={producto._id}
                    favorito={producto.isFavorite}
                  />
                </div>

                <p className="product-price1">€ {producto.price}</p>
                <Link to={`/product/${producto._id}`}>
                  <button className="product-details-button1">Ver más</button>
                </Link>
              </div>
            </li>

          ))}
        </ul>
      </div>
    </div> : <div class="d-flex gap-2 justify-content-center py-5">

      <button class="btn btn-primary" type="button" disabled>
        <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
        <span role="status">Loading...</span>
      </button>
    </div>}</>
  );
}

export default ProductList;


