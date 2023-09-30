import { useState, useEffect } from 'react';
import axios from "axios";

function FavoritosButton(props) {
  const [favorito, setFavorito] = useState(false);
  const action = favorito ? "remove" : "add";
  const API_URL = "http://localhost:5005";
  const productId = props.id;
  const userId = "65144b54c1c43a8007e58352"; // ID de usuario (reemplaza con la autenticación real)
  console.log("productId", productId);

  // Al cargar el componente, verifica si el producto ya está en favoritos del usuario
  useEffect(() => {
    // Verificar si el producto ya está en favoritos del usuario
    axios
      .get(`${API_URL}/profile/${userId}`)
      .then((response) => {
        const user = response.data; // Obtener el usuario de la respuesta
        console.log("user " + JSON.stringify(user, null, 2));

        user.favoriteProducts.forEach((product) => {
          if (product._id === productId) {
            setFavorito(true)
          }
        })

      })
      .catch((err) => {
        console.log("Error al verificar favoritos: " + err);
      });
  }, [productId, userId]);

  const toggleFavorito = () => {
    // Determina si debes agregar o eliminar el producto de favoritos

    axios
      .post(`${API_URL}/profile/${userId}/favorites`, {
        productId,
        action,
      })
      .then(() => {
        setFavorito(!favorito);
      })
      .catch((err) => console.log("Error al actualizar favoritos: " + err));
  };

  return (
    <button className={`favoritos-button ${favorito ? 'favorito' : ''}`} onClick={toggleFavorito}>
      {favorito ? '❤️ Quitar de favoritos' : '🤍 Agregar a favoritos'}
    </button>
  );
}

export default FavoritosButton;
