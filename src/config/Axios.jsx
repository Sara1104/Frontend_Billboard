import axios from "axios";
console.log("API URL:", process.env.REACT_APP_API_URL);
// Configuración de la instancia de Axios con la URL base desde variables de entorno
const axiosconexion = axios.create({
        //baseURL: "https://rentavalla.somee.com/api",
        baseURL: process.env.REACT_APP_API_URL, // Variable de entorno para la URL de la API
       
});

export default axiosconexion;
