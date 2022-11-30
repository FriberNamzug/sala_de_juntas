import { useState, useEffect } from "react";
import {
    Button,
    CircularProgress,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import { toast } from 'react-toastify'
import { deleteReservacion } from "../../services/reservaciones";
export default function DeleteReservaciones({ reservacion, close, update }) {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true);
        try {
            const { message } = await deleteReservacion(reservacion.id_reservacion);
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
                <h1 className="text-center text-2xl font-bold">Eliminar Reservación</h1>
                <p className="text-center text-red">¿Estas seguro de eliminar esta reservación?</p>
            </div>
            <div className="flex flex-row items-center m-5">
                <Button
                    variant="contained"
                    color="error"
                    fullWidth
                    onClick={handleDelete}
                    sx={{ mx: 1 }}
                    disabled={loading}
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
