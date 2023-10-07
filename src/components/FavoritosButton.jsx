import { useState } from 'react';
import axios from "axios";

function FavoritosButton(props) {
    const [favorito, setFavorito] = useState(false);
    // const API_URL = "http://localhost:5005";
    // const productId = props.id
    // const token = localStorage.getItem('token');
    // console.log("Token", token)

    const toggleFavorito = () => {

        // aqui tenemos que llamar a la base de datos
        // if (!favorito) {
        //     axios
        //         .get(`http://localhost:5005/profile/65144b54c1c43a8007e58352/favorites/add/${productId}`)
        //         .then((response) => {
        //             console.log("response data  === " + response.data);
        //             // setProducts(response.data);

        //         })
        //         .then(() => {
        //             console.log("producto agregado")
        //         })
        //         .catch((err) => console.log("hay un error " + err));


        // }
        // if (favorito) {



        // }

        setFavorito(!favorito);
    };

    return (
        <button className={`favoritos-button ${favorito ? 'favorito' : ''}`} onClick={toggleFavorito}>
            {favorito ? '❤️ Quitar de favoritos' : '🤍 Agregar a favoritos'}
        </button>
    );
}

export default FavoritosButton;
