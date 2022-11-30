import axios from "axios";

export const getSalas = async () => {
    const { data } = await axios.get("salas/");
    return data;
}
export const postSala = async (nombre, ubicacion) => {
    const dataSala = { nombre: nombre, ubicacion: ubicacion };
    const { data } = await axios.post("salas/", dataSala);
    return data;
}
export const putSala = async (id, nombre, ubicacion) => {
    const dataSala = { id_sala: id, nombre: nombre, ubicacion: ubicacion };
    const { data } = await axios.put(`salas/`, dataSala);
    return data;
}
export const deleteSala = async (id) => {
    const { data } = await axios.delete(`salas/${id}/`);
    return data;
}
export const getSalaWithReservaciones = async (id) => {
    const { data } = await axios.get(`salas/${id}/`);
    return data;
}