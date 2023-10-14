import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import "./EditProductForm.css";



const API_URL = 'http://localhost:5005';

function EditProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
    condition: 'new',
    images: [],
  });

  useEffect(() => {
    axios
      .get(`${API_URL}/product/${id}`)
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener los detalles del producto:', error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "product-image") {
      // Si el campo de imágenes cambió, agregamos las imágenes seleccionadas al estado
      const selectedImages = Array.from(files);
      setFormData({
        ...formData,
        images: selectedImages,
      });
    } else {

      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`${API_URL}/product/${id}/edit`, formData)
      .then((response) => {
        console.log('Producto actualizado con éxito:', response.data);
        navigate(`/product/${id}`);
      })
      .catch((error) => {
        console.error('Error al actualizar el producto:', error);
      });
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm('¿Seguro que quieres eliminar este producto?');

    if (!confirmDelete) {
      return;
    }

    axios
      .delete(`${API_URL}/product/${id}/delete`)
      .then(() => {
        console.log('Producto eliminado con éxito');
        navigate('/product');
      })
      .catch((error) => {
        console.error('Error al eliminar el producto:', error);
      });
  };


  return (
    <div className="container mt-5">
      <div className={`formProduct1 `} style={{ maxWidth: '100vw' }}>
        <h1>Editar Producto</h1>
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
          <div>
            <button type="submit" className="btn btn-primary">Guardar Cambios</button>
            <button type="button" onClick={handleDelete} className="btn btn-danger">Eliminar Producto</button>
          </div>
        </form>
      </div>
    </div>
  );

}

export default EditProductForm;
