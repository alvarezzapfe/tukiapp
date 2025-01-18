import axios from "axios";

// Maneja los cambios en los inputs del formulario
export const handleInputChange = (e, formData, setFormData) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });
};

// Avanza al siguiente paso del formulario
export const handleNextStep = (e, setStep) => {
  e.preventDefault();
  setStep(2);
};

// Maneja el envío del formulario al backend
export const handleFormSubmit = async (
  e,
  formData,
  setFormData,
  setStep,
  setMessageSent
) => {
  e.preventDefault();
  try {
    await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/send-email`, // Cambia la URL por la de tu backend
      formData,
      { headers: { "Content-Type": "application/json" } }
    );

    // Muestra el mensaje de confirmación
    setMessageSent(true);

    // Reinicia el formulario y regresa al primer paso
    setFormData({
      nombre: "",
      apellidoPaterno: "",
      apellidoMaterno: "",
      empresa: "",
      rfc: "",
      busco: "",
      facturacion: "",
      operacion: "",
      ebitda: "",
      modeloNegocio: "",
      monto: "",
    });
    setStep(1);
  } catch (error) {
    console.error("Error al enviar la solicitud:", error);
    alert("Hubo un error al enviar la solicitud.");
  }
};
