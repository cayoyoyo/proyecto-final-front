import React, { useState } from "react";
import axios from "axios"; // Importa Axios
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

function EditProfile({ user, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: user.name,
    location: user.location,
    // Agrega más campos según sea necesario
  });

  const [previewImage, setPreviewImage] = useState(
    user.profileImageUrl || null
  );

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
      .put(
        `${process.env.REACT_APP_SERVER_URL}/profile/${user._id}/edit-profile`,
        formDataToSend
      )
      .then((response) => {
        // Verifica si la respuesta es exitosa
        if (response.status === 200) {
          console.log("Perfil actualizado con éxito");
          setPreviewImage(response.data.avatar);
          
          onSave(response.data);
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
    <Container>
      <h3>Editar perfil</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Nombre:</Form.Label>
          <Form.Control
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleLocationChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Ubicación:</Form.Label>
          <Form.Control
            as="select"
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
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Foto de perfil:</Form.Label>
          <Form.Control
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
              style={{ maxWidth: "100%", marginTop: "10px" }}
            />
          )}
        </Form.Group>
        <Button type="submit" className="btn btn-primary" style={{ padding: "5px 10px" }}>
  Guardar
</Button>
<Button type="button" className="btn btn-danger" style={{ padding: "5px 10px" }} onClick={onCancel}>
  Cancelar
</Button>

      </Form>
    </Container>
  );
}

export default EditProfile;
