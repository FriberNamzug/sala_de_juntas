import axios from "axios";

const AxiosConfig = () => axios.defaults.baseURL = import.meta.env.VITE_RUTA_API;

export default AxiosConfig;