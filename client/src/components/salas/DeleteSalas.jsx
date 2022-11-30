import { useState, useEffect } from "react";
import {
    Button,
    CircularProgress,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import { deleteSala } from "../../services/salas";
import { getSalaWithReservaciones } from "../../services/salas";

import { toast } from 'react-toastify'


export default function DeleteSalas({ sala, close, update }) {
    const [loading, setLoading] = useState(false);
    const [validacion, setValidacion] = useState(false);

    useEffect(() => {
        const fetchSala = async () => {
            try {
                setLoading(true);
                await getSalaWithReservaciones(sala.id_sala);
                setValidacion(true);
                setLoading(false);
            } catch (error) {
                if (error.response.status == 400) {
                    setValidacion(false)
                }
                setLoading(false);
            }
        };
        fetchSala();
    }, [sala]);

    const handleDelete = async () => {
        setLoading(true);
        try {
            const { message } = await deleteSala(sala.id_sala);
            toast.success(message);
            update();
            close();
        } catch (error) {
            toast.error(error.response.data.message)
            setLoading(false);
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
                <h1 className="text-center text-2xl font-bold">Eliminar <span className="text-color2">{sala.nombre}</span></h1>
                {!validacion && <p className="text-center text-color2">¿Estas seguro de eliminar esta sala?</p>}
                {validacion && <p className="text-center text-red">No se puede eliminar esta sala porque tiene reservaciones</p>}
            </div>
            <div className="flex flex-row items-center m-5">
                <Button
                    variant="contained"
                    color="error"
                    fullWidth
                    onClick={handleDelete}
                    sx={{ mx: 1 }}
                    disabled={loading || validacion}
                >
                    {loading ? <CircularProgress size={24} color={"inherit"} /> : "Eliminar"}
                </Button>
                <Button
                    variant="contained"
                    color="success"
                    fullWidth
                    onClick={() => close()}
                    sx={{ mx: 1 }}
                >
                    Cancelar
                </Button>
            </div>
        </div>
    )
}
