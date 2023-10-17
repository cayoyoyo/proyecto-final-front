/*eslint-disable*/
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/auth.context";

function FavoritosButton(props) {
  const [favorito, setFavorito] = useState(false);
  const action = favorito ? "remove" : "add";
  const API_URL = `${process.env.REACT_APP_SERVER_URL}`;
  const productId = props.id;
  const { user, isLoading } = useContext(AuthContext);

  useEffect(() => {
    if (user && !isLoading) {
      axios
        .get(`${API_URL}/profile/${user._id}`)
        .then((response) => {
          const foundUser = response.data;
          foundUser.favoriteProducts.forEach((product) => {
            if (product._id === productId) {
              setFavorito(true);
            }
          });
        })
        .catch((err) => {
          console.log("Error al verificar favoritos: " + err);
        });
    }
  }, [productId, user]);

  const toggleFavorito = () => {
    axios
      .post(`${API_URL}/profile/${user._id}/favorites`, {
        productId,
        action,
      })
      .then(() => {
        setFavorito(!favorito);
      })
      .catch((err) => console.log("Error al actualizar favoritos: " + err));
  };

  return (
    <button
      className={`favoritos-button ${favorito ? "favorito" : ""}`}
      onClick={toggleFavorito}
    >
      {favorito ? "❤️" : "🤍"}
    </button>
  );
}

export default FavoritosButton;
