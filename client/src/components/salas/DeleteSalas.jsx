import { useState } from "react";
import {
    TextField,
    Button,
    CircularProgress,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import { deleteSala } from "../../services/salas";


export default function DeleteSalas({ sala, close, update }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({
        message: "",
        error: false,
    });

    const handleDelete = async () => {
        setLoading(true);
        try {
            const { message } = await deleteSala(sala.id_sala);
            setError({
                message,
                error: false,
            });
            update();
            setLoading(false);
            close();
        } catch (error) {
            setError({
                message: error.message,
                error: true,
            });
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
            </div>
            <div className="flex flex-row items-center m-5">
                <Button
                    variant="contained"
                    color="error"
                    fullWidth
                    onClick={handleDelete}
                    sx={{ mx: 1 }}
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
