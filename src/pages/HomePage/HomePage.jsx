/*eslint-disable*/

import "./HomePage.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import FavoritosButton from "../../components/FavoriteButton/FavoriteButton";
import { Card, Button, Container, Row, Col, Collapse } from "react-bootstrap";

function HomePage() {
  const [productosPrime, setProductosPrime] = useState([]);

  const produtosPrime = () => {
    const API_URL = `${process.env.REACT_APP_SERVER_URL}/product`;

    axios
      .get(API_URL)
      .then((response) => {
        // Filtra los productos cuyos vendedores tienen isPrime === true
        console.log(response.data);
        const productosFiltrados = response.data.filter(
          (producto) => producto.seller.isPrime
        );

        // Almacena los productos Prime en el estado
        setProductosPrime(productosFiltrados);
      })
      .catch((error) => {
        console.error("Error al obtener productos:", error);
      });
  };

  useEffect(() => {
    produtosPrime();
  }, []);

  console.log("productosPrime ------- > " + productosPrime.length);

  return (
    <main>
      <div id="myCarousel" class="carousel slide mb-6" data-bs-ride="carousel">
        <div class="carousel-indicators">
          <button
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide-to="0"
            class="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img
              src="https://images.pexels.com/photos/583842/pexels-photo-583842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Descripción de la imagen"
              className="d-block w-100"
              width="100%"
              height="100%"
            />

            <div class="container">
              <div class="carousel-caption text-start">
                <h1 className="letrasportada">
                  ¡Todo lo que puedas imaginar, a solo un clic de distancia!
                </h1>

                <p>
                  <Link class="btn btn-lg btn-primary" style={{ backgroundColor: "#66CCFF", border: "none" }} to="/product">
                    Productos
                  </Link>
                </p>
              </div>
            </div>
          </div>

          <div class="carousel-item">
            <img
              src="https://images.pexels.com/photos/2177482/pexels-photo-2177482.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Descripción de la imagen"
              className="d-block w-100"
              width="100%"
              height="50%"
            />

            <div class="container">
              <div class="carousel-caption">
                <h1 className="letrasportada2">
                  Libros que inspiran, a un clic de distancia.
                </h1>
                <p></p>
                <p>
                  <Link class="btn btn-lg btn-primary" style={{ backgroundColor: "#66CCFF", border: "none" }} to="/product">
                    Productos
                  </Link>
                </p>
              </div>
            </div>
          </div>

          <div class="carousel-item">
            <img
              src="https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg"
              alt="Descripción de la imagen"
              className="d-block w-100"
              width="100%"
              height="50%"
            />

            <div class="container">
              <div class="carousel-caption text-end">
                <p className="letrasportada">
                  Encuentra el auto de tus sueños en un solo lugar.
                </p>
                <p>
                  <Link class="btn btn-lg btn-primary" style={{ backgroundColor: "#66CCFF", border: "none" }} to="/product">
                    Productos
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>

      <div>
        <Row xs={1} sm={2} md={3} lg={3}>
          {productosPrime.map((product) => (
            <Col key={product._id} className="colProductHome">
              <Card className="product-card">
                <Link to={`/product/${product._id}`}>
                  <Card.Img
                    className="product-img"
                    variant="top"
                    src={
                      product.images && product.images.length > 0
                        ? product.images[0]
                        : "placeholder.jpg"
                    }
                  />
                </Link>
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text>
                    Precio: ${product.price}
                    <br />
                    Disponible: {product.available ? "Sí" : "No"}
                    <FavoritosButton
                      id={product._id}
                      favorito={product.isFavorite}
                    />
                  </Card.Text>
                </Card.Body>
                <Card.Footer></Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </main>
  );
}

export default HomePage;
