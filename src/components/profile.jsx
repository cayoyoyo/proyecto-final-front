import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Importa useParams para obtener el ID del usuario
import axios from 'axios';
import { Link } from 'react-router-dom';


function UserProfile() {
    const API_URL = "http://localhost:5005";
    const { userId } = useParams("6509ec24978a79c2c2cb00d7"); // Obtiene el ID del usuario de los parámetros de la URL

    const [user, setUser] = useState(null);

    useEffect(() => {
        axios
            .get(`${API_URL}/profile/650e9927867981d9193d61c3`)
            .then((response) => {
                setUser(response.data);
            })
            .catch((error) => {
                console.error("Error al obtener los datos del usuario: " + error);
            });
    }, [userId]);

    return (
        <div>
            <h1>Perfil de Usuario</h1>
            {user ? (
                <div>
                    <p><strong>Nombre:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Ubicación:</strong> {user.location}</p>
                    <h2>Productos Favoritos</h2>
                    <ul>
                        {user.favoriteProducts.map((productId) => (
                            <li key={productId}>{productId}</li>
                        ))}
                    </ul>
                    <h2>Productos en Venta</h2>
                    <ul>
                        {user.productsForSale.map((product, index) => (
                            <li key={product._id}>
                                <Link to={`/product/${product._id}`}>{product}</Link>
                                {/* <img className='product-image' src={product.images[index]} alt={product.title} /> */}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>Cargando datos del usuario...</p>
            )}
        </div>
    );
}

export default UserProfile;
