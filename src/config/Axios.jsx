import axios from "axios";

const axiosconexion = axios.create({
        baseURL: "https://rentaavalla.somee.com/api",
});

export default axiosconexion;

