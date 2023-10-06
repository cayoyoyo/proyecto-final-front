import "./Searchbar.css";
import { useState } from 'react';

function Searchbar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  // Función para manejar cambios en el campo de búsqueda
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setSearchTerm(newValue);
    // Llamar a la función de búsqueda pasando el término de búsqueda a medida que el usuario escribe
    onSearch(newValue);
  };

  return (
    <div className="searchbar">
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Buscar productos"
        className="searchbar-input"
      />
    </div>
  );
}

export default Searchbar;
