// import { useState, useEffect } from 'react';
// import axios from "axios";
// import { useParams } from 'react-router-dom';

// const { id } = useParams();
// const API_URL = "http://localhost:5005";

function ProductForm() {
    // const [formData, setFormData] = useState({
    //     title: '',
    //     description: '',
    //     price: '',
    //     condition: '',
    //     images: [],
    // });

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData({
    //         ...formData,
    //         [name]: value,
    //     });
    // };

    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     axios
    //         .post(`${API_URL}/product/${id}/edit`, formData)
    //         .then(() => {
    //             setFormData({
    //                 title: '',
    //                 description: '',
    //                 price: '',
    //                 condition: '',
    //                 images: [],
    //             })
    //         })
    //         .catch((err) => console.log(err));

    // };

    return (
        <div className="formProduct">
            <h1>Formulario de Producto</h1>
            <form onSubmit={() => { }} className="form-product">
                <div className="formProduct01">
                    <label>Título:</label>
                    <input
                        type="text"
                        name="title"
                    // value={formData.title}
                    // onChange={handleChange}
                    // required
                    />
                </div>
                <div className="formProduct02">
                    <label>Descripción:</label>
                    <textarea
                        name="description"
                    // value={formData.description}
                    // onChange={handleChange}
                    // required
                    />
                </div>
                <div className="formProduct03">
                    <label>Precio:</label>
                    <input
                        type="number"
                        name="price"
                    // value={formData.price}
                    // onChange={handleChange}
                    // required
                    />
                </div>
                <div className="formProduct04">
                    <label>Condición:</label>
                    <select
                        name="condition"
                    // value={formData.condition}
                    // onChange={handleChange}
                    >
                        <option value="new">Nuevo</option>
                        <option value="used">Usado</option>
                        <option value="like new">Como nuevo</option>
                    </select>
                </div>

                <div>
                    <button type="submit">Guardar Producto</button>
                </div>
            </form>
        </div>
    );
}

export default ProductForm;
