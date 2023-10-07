import React, { useState } from "react";
import axios from "axios"; // Importa Axios

function EditProfile({ user, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: user.name,
    location: user.location,
    // Agrega más campos según sea necesario
  });

  const [previewImage, setPreviewImage] = useState(user.profileImageUrl || null);


  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleProfilePhotoChange = (e) => {
    const selectedPhoto = e.target.files[0];
    setFormData({ ...formData, profilePhoto: selectedPhoto });

    // Opcional: Mostrar una vista previa de la imagen
    if (selectedPhoto) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };
      reader.readAsDataURL(selectedPhoto);
    } else {
      setPreviewImage(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Crea un objeto FormData para enviar al servidor
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("location", formData.location);

    // Verifica si se ha seleccionado una nueva foto de perfil
    if (formData.profilePhoto) {
        console.log("Nueva imagen seleccionada:", formData.profilePhoto);
      formDataToSend.append("profile-photo", formData.profilePhoto);
    }

    // Realiza la solicitud con Axios
    axios
      .put(`/profile/${user._id}/edit-profile`, formDataToSend)
      .then((response) => {
        // Verifica si la respuesta es exitosa
        if (response.status === 200) {
          console.log("Perfil actualizado con éxito");
        } else {
          // El servidor respondió con un error, puedes manejarlo aquí
          console.error("Error al actualizar el perfil:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error de red:", error);
      });

    // Llama a la función onSave para enviar los datos del formulario al padre
    onSave(formData);
  };

  const locationOptions = [
    "Álava",
    "Albacete",
    "Alicante",
    "Almería",
    "Asturias",
    "Ávila",
    "Badajoz",
    "Barcelona",
    "Burgos",
    "Cáceres",
    "Cádiz",
    "Cantabria",
    "Castellón",
    "Ciudad Real",
    "Córdoba",
    "Cuenca",
    "Gerona",
    "Granada",
    "Guadalajara",
    "Guipúzcoa",
    "Huelva",
    "Huesca",
    "Islas Balears",
    "Jaén",
    "La Coruña",
    "La Rioja",
    "Las Palmas",
    "León",
    "Lérida",
    "Lugo",
    "Madrid",
    "Málaga",
    "Murcia",
    "Navarra",
    "Orense",
    "Palencia",
    "Pontevedra",
    "Salamanca",
    "Santa Cruz de Tenerife",
    "Segovia",
    "Sevilla",
    "Soria",
    "Tarragona",
    "Teruel",
    "Toledo",
    "Valencia",
    "Valladolid",
    "Vizcaya",
    "Zamora",
    "Zaragoza",
  ];

  return (
    <div>
      <h3>Editar perfil</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleLocationChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Ubicación:</label>
          <select
            name="location"
            id="location"
            value={formData.location}
            onChange={handleLocationChange}
          >
            <option value=""></option>
            {locationOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="profile-photo">Foto de perfil:</label>
          <input
            type="file"
            id="profile-photo"
            name="profile-photo"
            accept="image/*"
            onChange={handleProfilePhotoChange}
          />
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              style={{ maxWidth: "200px", marginTop: "10px" }}
            />
          )}
        </div>
        {/* Agrega más campos según sea necesario */}
        <button type="submit">Guardar</button>
        <button type="button" onClick={onCancel}>
          Cancelar
        </button>
      </form>
    </div>
  );
}

export default EditProfile;
