import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import FavoritosButton from "../FavoriteButton/FavoriteButton";
import ProductForm from "../ProductForm/ProductForm";
import Searchbar from "../Searchbar/Searchbar";
import "./ProductList.css";


function ProductList() {
  const API_URL = "http://localhost:5005";

  const [products, setProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]); // Almacenar todos los productos originales
  const [display, setDisplay] = useState("none");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [response, setResponse] = useState(false);

  const categories = [
    "Electrodomésticos",
    "Muebles",
    "Electrónica",
    "Ropa y Accesorios",
    "Herramientas",
    "Juguetes",
    "Vehículos",
    "Deportes y Fitness",
    "Arte y Antigüedades",
    "Libros y Revistas",
    "Otros",
  ];

  const fetchProducts = () => {
    axios
      .get(`${API_URL}/product`)
      .then((response) => {
        setProducts(response.data);
        setOriginalProducts(response.data); // Almacenar todos los productos originales
        setResponse(true); // para probar el loading button
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

  // Función para filtrar productos por categoría
  const filterProductsByCategory = (category) => {
    setSelectedCategory(category);
    // Filtrar productos por categoría seleccionada
    const filteredProducts = originalProducts.filter(
      (producto) => producto.category === category
    );
    setProducts(filteredProducts);
  };

  // Función para mostrar todos los productos nuevamente
  const showAllProducts = () => {
    setSelectedCategory(null);
    setProducts(originalProducts);
  };

  return (
    <>
      {response ? (
        <div className="pagProductos">
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

            {/* Mostrar las categorías */}
            <div className="categorias">
  <span
    tabIndex="0"  // Agrega esta línea para permitir el enfoque
    onClick={showAllProducts}
  >
    Todas
  </span>{" "}
  {categories.map((category) => (
    <span
      key={category}
      tabIndex="0"  // Agrega esta línea para permitir el enfoque
      onClick={() => filterProductsByCategory(category)}
    >
      {category}
    </span>
  ))}
</div>

          </div>

          <div className="listado">
            <div className="searchbar1">
              <Searchbar onSearch={handleSearch} />
            </div>
            <ul className="ulListaProdutos">
              {products.map((producto) => (
                <li className="liListaProdutos" key={producto._id}>
                  {/* Renderización de productos */}
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
        </div>
      ) : (
        <div class="d-flex gap-2 justify-content-center py-5">
          <button class="btn btn-primary" type="button" disabled>
            <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
            <span role="status">Loading...</span>
          </button>
        </div>
      )}
    </>
  );
      }

export default ProductList;
