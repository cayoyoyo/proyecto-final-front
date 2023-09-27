import React, { useState } from 'react';
import axios from 'axios';

function ProductForm() {
  const API_URL = "http://localhost:5005";
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
    condition: 'new',
  });

  const [selectedImage, setSelectedImage] = useState(null);

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

    formDataWithImage.append('product-image', selectedImage);

    axios
      .post(`${API_URL}/product/add`, formDataWithImage, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log('Producto agregado con éxito:', response.data);
      })
      .catch((error) => {
        console.error('Error al agregar un producto:', error);
      });
  };

  return (
    <div className="formProduct">
      <h1>Formulario de Producto</h1>
      <form onSubmit={handleSubmit} className="form-product">
        <div className="formProduct01">
          <label>Título:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="formProduct02">
          <label>Descripción:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="formProduct03">
          <label>Precio:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="formProduct04">
          <label>Condición:</label>
          <select
            name="condition"
            value={formData.condition}
            onChange={handleChange}
          >
            <option value="new">Nuevo</option>
            <option value="used">Usado</option>
            <option value="like new">Como nuevo</option>
          </select>
        </div>
        <div className="formProduct05">
          <label>Imagen:</label>
          <input
            type="file"
            name="product-image"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>
        <div>
          <button type="submit">Guardar Producto</button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;
