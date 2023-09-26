import { useState } from 'react';

function FavoritosButton() {
    const [favorito, setFavorito] = useState(false);

    const toggleFavorito = () => {
        setFavorito(!favorito);
    };

    return (
        <button className={`favoritos-button ${favorito ? 'favorito' : ''}`} onClick={toggleFavorito}>
            {favorito ? '❤️ Quitar de favoritos' : '🤍 Agregar a favoritos'}
        </button>
    );
}

export default FavoritosButton;
