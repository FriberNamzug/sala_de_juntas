import axios from "axios";

export const getReservaciones = async () => {
    const { data } = await axios.get("reservaciones/");
    return data;
}
export const postReservacion = async (id_sala, hora_inicial, hora_final, fecha) => {
    const dataReservacion = { id_sala: id_sala, hora_inicial: hora_inicial, hora_final: hora_final, fecha: fecha };
    const { data } = await axios.post("reservaciones/", dataReservacion);
    return data;
}
export const putReservacion = async (id, idSala, hora_inicial, hora_final, fecha) => {
    const dataReservacion = { id_reservacion: id, id_sala: idSala, hora_inicial: hora_inicial, hora_final: hora_final, fecha: fecha };
    const { data } = await axios.put(`reservaciones/`, dataReservacion);
    return data;
}
export const deleteReservacion = async (id) => {
    const { data } = await axios.delete(`reservaciones/${id}/`);
    return data;
}