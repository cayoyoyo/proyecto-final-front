import { useState } from 'react';
import axios from 'axios';

function FavoritosButton(props) {
    const [favorito, setFavorito] = useState(false);
    const API_URL = "http://localhost:5005";
    const productId = props.id;
    const userId = '65144b54c1c43a8007e58352';

    const toggleFavorito = () => {
        if (!favorito) {
            // Agregar producto a favoritos
            axios
                .get(`${API_URL}/profile/${userId}/favorites/add/${productId}`)
                .then((response) => {
                    console.log("Producto agregado a favoritos:", response.data);
                })
                .catch((err) => console.log("EuserIdrror al agregar producto a favoritos:", err));
        } else {
            // Eliminar producto de favoritos

            axios
                .delete(`${API_URL}/profile/${userId}/favorites/remove`, { data: { productId } })
                .then((response) => {
                    // Actualiza los datos del usuario en el estado después de la eliminación
                    // setProfileUser(response.data.user);
                    console.log("producto quitado!!!")
                })
                .catch((error) => {
                    console.error("Error al eliminar el producto de favoritos:", error);
                });

        }

        setFavorito(!favorito);
    };

    return (
        <button className={`favoritos-button ${favorito ? 'favorito' : ''}`} onClick={toggleFavorito}>
            {favorito ? '❤️ Quitar de favoritos' : '🤍 Agregar a favoritos'}
        </button>
    );
}

export default FavoritosButton;

