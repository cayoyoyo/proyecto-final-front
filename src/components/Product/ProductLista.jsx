

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import FavoritosButton from "../FavoriteButton";

function ProductList() {
    const API_URL = "http://localhost:5005";

    const [productsData, setProductsData] = useState([]);
    const products = productsData.reverse();


    // Cargar la lista de productos y su estado de favoritos al cargar la página
    useEffect(() => {
        axios
            .get(`${API_URL}/product`)
            .then((response) => {
                setProductsData(response.data);
            })
            .catch((err) => console.log("Error al cargar la lista de productos: " + err));
    }, []);

    return (
        <div>
            <h1>Lista de Productos</h1>

            <ul className="ulListaProdutos">

                {products.map((producto) => (

                    <li className="liListaProdutos" key={producto._id}>
                        <FavoritosButton id={producto._id} />
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
