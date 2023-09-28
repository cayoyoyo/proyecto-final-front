import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/auth.context";

function FavoritosButton(props) {
    const [profileUser, setProfileUser] = useState(null);
    const [favorito, setFavorito] = useState(false);
    const { user, isLoading } = useContext(AuthContext);
    const API_URL = "http://localhost:5005";
    const apiUrl = `http://localhost:5005/profile/${profileUser._id}/favorites/remove`;
    const productId = props.id
    const userId = user._id;

    useEffect(() => {
        if (!isLoading) {
            const storedToken = localStorage.getItem("authToken");


            const apiUrl = `${API_URL}/profile/${userId}`;

            axios
                .get(apiUrl, { headers: { Authorization: `Bearer ${storedToken}` } })
                .then((response) => {
                    console.log(response.data);

                })
                .catch((error) => {
                    console.error("Error al obtener los datos del usuario:", error);
                });
        }
    }, [user, isLoading]);

    const toggleFavorito = () => {

        // aqui tenemos que llamar a la base de datos
        if (!favorito) {
            axios
                .get(`${API_URL}/profile/${userId}/favorites/add/${productId}`)
                .then((response) => {
                    console.log("response data  === " + response.data);
                    // setProducts(response.data);

                })
                .then(() => {
                    console.log("producto agregado")
                })
                .catch((err) => console.log("hay un error " + err));


        }
        if (favorito) {

            axios
                .delete(apiUrl, { data: { productId } })
                .then((response) => {
                    // Actualiza los datos del usuario en el estado después de la eliminación
                    setProfileUser(response.data.user);
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
