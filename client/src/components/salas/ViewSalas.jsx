import { useState, useEffect } from "react";
import {
    CircularProgress,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import { getSalaWithReservaciones } from "../../services/salas";

export default function ViewSalas({ sala, close }) {
    const [error, setError] = useState({
        message: "",
        error: false,
    });
    const [loading, setLoading] = useState(true);
    const [salaView, setSalaView] = useState({});

    useEffect(() => {
        const fetchSala = async () => {
            try {
                const { message } = await getSalaWithReservaciones(sala.id_sala);
                setSalaView(message);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                if (error.response.status === 400) {
                    setError({
                        message: error.response.data.message,
                        error: true,
                    });
                } else {
                    setError({
                        message: error.message,
                        error: true,
                    });
                }
                console.log(error)
            }
        };
        fetchSala();
    }, [sala]);
    return (
        <div className="flex flex-col  border border-black rounded-lg bg-color5">
            <div className="text-right">
                <CloseIcon
                    onClick={() => close()}
                    className="cursor-pointer text-red-400 hover:text-red-900 "
                />
            </div>
            <div>
                <h1 className="text-center text-2xl font-bold">{sala.nombre}</h1>
            </div>
            <div className="flex flex-col items-center justify-center m-5">
                <div className="flex flex-col w-full">
                    <div className="flex flex-col">
                        <label className="font-bold">Ubicación</label>
                        <p>{sala.ubicacion}</p>
                    </div>
                    <div className="flex flex-col">
                        <label className="font-bold">Reservaciones de la sala</label>
                        {loading && <CircularProgress size={24} color={"inherit"} />}

                        {!loading && !error.error &&
                            <div className="flex flex-col">
                                {salaView.length !== 0 && salaView.map((reservacion) => (
                                    <div className="flex flex-col">
                                        <p>{reservacion.nombre}</p>
                                        <p>{reservacion.fecha}</p>
                                        <p>{reservacion.hora_inicial}</p>
                                        <p>{reservacion.hora_final}</p>
                                    </div>
                                ))}
                            </div>
                        }
                        {!loading && error.error &&
                            <p>{error.message}</p>
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}
