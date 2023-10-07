import React, { useState, useContext } from "react";
import axios from "axios";
import "./ProductForm.css";
import { AuthContext } from "../../context/auth.context";

function ProductForm(props) {
  const API_URL = "http://localhost:5005";
  const { user, isLoading } = useContext(AuthContext);



  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: 0,
    condition: "new",
    seller: user._id,
    category: "", 
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [display, setDisplay] = useState("active");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataWithImage = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataWithImage.append(key, value);
    });

    formDataWithImage.append("product-image", selectedImage);

    axios
      .post(`${API_URL}/product/add`, formDataWithImage, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Producto agregado con éxito:", response.data);

        props.reloadProducts();

        const productId = response.data._id; // ter o id do produto
        axios
          .put(`${API_URL}/profile/${user._id}/add-product/${productId}`)
          .then((updateResponse) => {
            console.log("Usuario actualizado con el nuevo producto:", updateResponse.data);
            props.reloadProducts();
            setDisplay("none");
          })
        setDisplay("none");
      })
      .catch((error) => {
        console.error("Error al agregar un producto:", error);
      });
  };

  // Lista de todas las categorías
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

  return (
    <div className="container mt-5">
      <div className={`formProduct ${display}`} style={{ maxWidth: '400px' }}>
        <h1>Formulario de Producto</h1>
        <form onSubmit={handleSubmit} className="form-product">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Título:
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="form-control"
              id="title"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Descripción:
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-control"
              id="description"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">
              Precio:
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="form-control"
              id="price"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="condition" className="form-label">
              Condición:
            </label>
            <select
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              className="form-control"
              id="condition"
            >
              <option value="new">Nuevo</option>
              <option value="used">Usado</option>
              <option value="like new">Como nuevo</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="category" className="form-label">
              Categoría:
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="form-control"
              id="category"
              required
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="product-image" className="form-label">
              Imagen:
            </label>
            <input
              type="file"
              name="product-image"
              accept="image/*"
              onChange={handleImageChange}
              multiple
              className="form-control"
              id="product-image"
              required
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );


}

export default ProductForm;
