import React, { useState } from 'react';
import axios from 'axios';

function FavoriteButton({ productId, userId, onAddToFavorites }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToFavorites = () => {
    const apiUrl = `http://localhost:5005/profile/${userId}/favorites/add/${productId}`;

    axios
      .post(apiUrl)
      .then((response) => {
        if (response.status === 200) {
          setIsFavorite(true);
          onAddToFavorites(productId);
        } else {
          // Manejo de errores
        }
      })
      .catch((error) => {
        // Manejo de errores
      });
  };

  return (
    <button onClick={handleAddToFavorites}>
      {isFavorite ? '❤️ Agregado a favoritos' : '🤍 Agregar a favoritos'}
    </button>
  );
}

export default FavoriteButton;
