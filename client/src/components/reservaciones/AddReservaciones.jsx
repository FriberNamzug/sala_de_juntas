import { useState } from "react";
import {
    TextField,
    Button,
    CircularProgress,
    InputLabel,
    Select,
    MenuItem,
    FormControl,
    Input
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { postReservacion } from "../../services/reservaciones";
import { toast } from 'react-toastify'
import { getSalasSinReservaciones } from "../../services/Salas";

export default function AddReservaciones({ close, update }) {
    const [loading, setLoading] = useState(false);
    const [reservacion, setReservacion] = useState({});
    const [salasDisponibles, setSalasDisponibles] = useState([]);
    const [stepOne, setStepOne] = useState(true);
    const [stepTwo, setStepTwo] = useState(false);

    const handleChange = (e) => {
        setReservacion({ ...reservacion, [e.target.name]: e.target.value, });
    };
    const handleNext = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const { message } = await getSalasSinReservaciones(reservacion.fecha, reservacion.hora_inicial, reservacion.hora_final);
            setSalasDisponibles(message);
            setStepOne(false);
            setStepTwo(true);
            setLoading(false);
        } catch (error) {
            toast.error(error.message);
            console.log(error.response)
            toast.error(error.message);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(reservacion)
        try {
            setLoading(true);
            const { message } = await postReservacion(reservacion.sala, reservacion.hora_inicial, reservacion.hora_final, reservacion.fecha);
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
                <h1 className="text-center text-2xl font-bold">{stepOne ? "Solicitar reservacion" : "Selecciona una sala"}</h1>
            </div>
            {stepOne &&
                <div className="flex flex-col items-center justify-center m-5">
                    <form className="flex flex-col w-full" onSubmit={handleNext}>
                        <TextField
                            type="date"
                            label="Fecha"
                            name="fecha"
                            value={reservacion.fecha || ""}
                            onChange={handleChange}
                            required
                            sx={{ m: 1, }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <div className="flex flex-row justify-around m-2">
                            <TextField
                                type="time"
                                label="Hora de inicio"
                                name="hora_inicial"
                                value={reservacion.hora_inicial || ""}
                                onChange={handleChange}
                                fullWidth
                                sx={{ mr: 1 }}
                                required
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                type="time"
                                label="Hora final"
                                name="hora_final"
                                value={reservacion.hora_final || ""}
                                onChange={handleChange}
                                fullWidth
                                sx={{ ml: 1 }}
                                required
                                InputLabelProps={{
                                    shrink: true,
                                }}
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
                    <form className="flex flex-col w-full" onSubmit={handleSubmit}>
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="select_sala">Selecciona una de las salas disponibles</InputLabel>
                            <Select
                                labelId="select_sala"
                                id="select_sala"
                                name="sala"
                                value={reservacion.sala || ""}
                                label="Selecciona una de las salas disponibles"
                                onChange={handleChange}
                                required
                            >
                                {salasDisponibles.map((sala) => (
                                    <MenuItem value={sala.id_sala}>{sala.nombre}</MenuItem>
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
                                "Añadir Reservacion"
                            )}
                        </Button>
                    </form>
                </div>
            }
        </div>
    )
}
