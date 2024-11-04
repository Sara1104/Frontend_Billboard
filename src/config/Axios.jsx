import axios from "axios";

// Configuración de la instancia de Axios con la URL base desde variables de entorno
const axiosconexion = axios.create({
        baseURL: "https://rentavalla.somee.com/api",
        //baseURL: process.env.REACT_APP_API_URL, // Variable de entorno para la URL de la API

        headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
});

export default axiosconexion;
