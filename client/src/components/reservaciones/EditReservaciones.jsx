import { useState, useEffect } from "react";
import {
    TextField,
    Button,
    CircularProgress,
    InputLabel,
    Select,
    MenuItem,
    FormControl,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import UndoIcon from '@mui/icons-material/Undo';

import { putReservacion } from "../../services/reservaciones";
import { toast } from 'react-toastify'
import { getSalasSinReservaciones } from "../../services/Salas";
import { validarRegistro, error as err } from '../../validations/reservacion.validation'

export default function EditReservaciones({ reservacion, close, update }) {
    const [loading, setLoading] = useState(false);
    const [reserva, setReserva] = useState({
        id_reservacion: reservacion.id_reservacion,
        fecha: reservacion.fecha,
        hora_inicial: reservacion.hora_inicial.slice(0, -3),
        hora_final: reservacion.hora_final.slice(0, -3),
    });
    const [salasDisponibles, setSalasDisponibles] = useState([]);
    const [error, setError] = useState(err);
    const [stepOne, setStepOne] = useState(true);
    const [stepTwo, setStepTwo] = useState(false);

    const handleChange = (e) => {
        setReserva({ ...reserva, [e.target.name]: e.target.value, });
    }

    const handleNext = async (e) => {
        e.preventDefault();
        if(reservacion.fecha === reserva.fecha && reservacion.hora_inicial.slice(0, -3) === reserva.hora_inicial && reservacion.hora_final.slice(0, -3) === reserva.hora_final) return toast.error('No se han realizado cambios');
        if (error.fecha.error || error.hora_inicial.error || error.hora_final.error) return toast.error('Errores en el formulario');
        try {
            setLoading(true);
            const { message } = await getSalasSinReservaciones(reserva.fecha, reserva.hora_inicial, reserva.hora_final);
            setSalasDisponibles(message);
            setStepOne(false);
            setStepTwo(true);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast.error(error.response.data.message);
            console.log(error)
        }
    }

    const handleBack = (e) => {
        setReserva(reservacion);
        setStepOne(true);
        setStepTwo(false);
        setReserva({});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const { message } = await putReservacion(reserva.id_reservacion, reserva.sala, reserva.hora_inicial, reserva.hora_final, reserva.fecha);
            toast.success(message);
            setLoading(false);
            update();
            close();
        }
        catch (error) {
            setLoading(false);
            console.log(error)
            toast.error(error.response.data.message || error.message);
        }
    }
    return (
        <div className="flex flex-col  border border-black rounded-lg bg-color5">
            <div className="text-right">
                <CloseIcon
                    onClick={() => close()}
                    className="cursor-pointer text-red-400 hover:text-red-900 "
                />
            </div>
            <div>
                <h1 className="text-center text-2xl font-bold">Editar Reservación</h1>
            </div>

            {stepOne &&
                <div className="flex flex-col items-center justify-center m-5">
                    <form className="flex flex-col w-full" onSubmit={handleNext}>
                        <TextField
                            type="date"
                            label="Fecha"
                            name="fecha"
                            value={reserva.fecha || ""}
                            onChange={handleChange}
                            required
                            sx={{ m: 1, }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            error={error.fecha.error}
                            helperText={error.fecha.message}
                        />
                        <div className="flex flex-row justify-around m-2">
                            <TextField
                                type="time"
                                label="Hora de inicio"
                                name="hora_inicial"
                                value={reserva.hora_inicial || ""}
                                onChange={handleChange}
                                fullWidth
                                sx={{ mr: 1 }}
                                required
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                error={error.hora_inicial.error}
                                helperText={error.hora_inicial.message}
                            />
                            <TextField
                                type="time"
                                label="Hora final"
                                name="hora_final"
                                value={reserva.hora_final || ""}
                                onChange={handleChange}
                                fullWidth
                                sx={{ ml: 1 }}
                                required
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                error={error.hora_final.error}
                                helperText={error.hora_final.message}
                            />
                        </div>

                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            type="submit"
                            className="m-2"
                        >
                            {loading ? (
                                <CircularProgress color="inherit" size={20} />
                            ) : (
                                "Buscar salas disponibles"
                            )}
                        </Button>

                    </form>
                </div>
            }


            {stepTwo &&
                <div className="flex flex-col items-center justify-center m-5">
                    <div className="flex flex-row justify-end w-full ">
                        <p className="cursor-pointer mr-2 hover:font-bold duration-200" onClick={handleBack}>Regresar</p>
                        <UndoIcon onClick={handleBack} className="cursor-pointer" />
                    </div>
                    <form className="flex flex-col w-full" onSubmit={handleSubmit}>
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="select_sala">Selecciona una de las salas disponibles</InputLabel>
                            <Select
                                labelId="select_sala"
                                id="select_sala"
                                name="sala"
                                value={reserva.sala || ""}
                                label="Selecciona una de las salas disponibles"
                                onChange={handleChange}
                                required
                            >
                                {salasDisponibles.map((sala) => (
                                    <MenuItem key={sala.id_sala} value={sala.id_sala}>{sala.nombre}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            type="submit"
                        >
                            {loading ? (
                                <CircularProgress color="inherit" size={20} />
                            ) : (
                                "Actualizar Reservacion"
                            )}
                        </Button>
                    </form>
                </div>
            }


        </div>
    )
}
