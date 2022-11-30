import { useState } from "react";
import {
    TextField,
    Button,
    CircularProgress,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import { putSala } from "../../services/salas";

export default function EditSalas({ sala, close, update }) {

    const [loading, setLoading] = useState(false);
    const [salaEdit, setSalaEdit] = useState(sala);
    const [error, setError] = useState({
        message: "",
        error: false,
    });

    const handleChange = (e) => {
        setSalaEdit({
            ...salaEdit,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { message } = await putSala(salaEdit.id_sala, salaEdit.nombre, salaEdit.ubicacion);
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
                <h1 className="text-center text-2xl font-bold">Editar Sala</h1>
            </div>
            <div className="flex flex-col items-center justify-center m-5">
                <form className="flex flex-col w-full" onSubmit={handleSubmit}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="nombre"
                        label="Nombre"
                        type="text"
                        value={salaEdit.nombre}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="ubicacion"
                        label="Ubicacion"
                        type="text"
                        value={salaEdit.ubicacion}
                        onChange={handleChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        color="success"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} color={"inherit"} /> : "Editar"}
                    </Button>

                </form>
            </div>
        </div>
    )
}
