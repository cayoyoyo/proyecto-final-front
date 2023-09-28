import { useEffect, useState, useContext } from "react";
import axios from 'axios';
import { AuthContext } from "../../context/auth.context";

function FavoritosButton(props) {
    const [profileUser, setProfileUser] = useState(null);
    const [favorito, setFavorito] = useState(false);
    const { user, isLoading } = useContext(AuthContext);
    const API_URL = "http://localhost:5005";
    const productId = props.id
    // const token = localStorage.getItem('token');
    // console.log("Token", token)

    const toggleFavorito = () => {
        if (!favorito) {
            // Agregar producto a favoritos
            axios
                .get(`http://localhost:5005/profile/65144b54c1c43a8007e58352/favorites/add/${productId}`)
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
                .catch((err) => console.log("hay un error " + err));


        }
        if (favorito) {



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

