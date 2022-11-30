import { useState } from "react";
import {
    TextField,
    Button,
    CircularProgress,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import { postSala } from "../../services/salas";

export default function AddSalas({ close, update }) {
    const [loading, setLoading] = useState(false);
    const [sala, setSala] = useState({});
    const [error, setError] = useState({
        message: "",
        error: false,
    });

    const handleChange = (e) => {
        setSala({
            ...sala,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { message } = await postSala(sala.nombre, sala.ubicacion);
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
            console.log(error)
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
                <h1 className="text-center text-2xl font-bold">Añadir Sala</h1>
            </div>
            <div className="flex flex-col items-center justify-center m-5">
                <form className="flex flex-col w-full" onSubmit={handleSubmit}>
                    <TextField
                        name="nombre"
                        variant="outlined"
                        onChange={handleChange}
                        margin="normal"
                        label="Nombre"
                    />
                    <TextField
                        name="ubicacion"
                        variant="outlined"
                        onChange={handleChange}
                        margin="normal"
                        label="Ubicación"

                    />

                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        {loading ? <CircularProgress /> : "Añadir"}
                    </Button>
                </form>
            </div>
        </div>
    )
}
