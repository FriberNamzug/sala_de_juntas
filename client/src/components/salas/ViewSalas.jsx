import { useState, useEffect } from "react";
import {
    CircularProgress,
    Table,
    TableContainer,
    TableCell,
    TableHead,
    TableBody,
    TableRow,
    Modal,
    IconButton
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import EditReservaciones from "../reservaciones/EditReservaciones";
import DeleteReservaciones from "../reservaciones/DeleteReservaciones";

import CloseIcon from "@mui/icons-material/Close";
import { getSalaWithReservaciones } from "../../services/salas";
import modal from '../styles/modal';

export default function ViewSalas({ sala, close }) {
    const [error, setError] = useState({
        message: "",
        error: false,
    });
    const [loading, setLoading] = useState(true);
    const [salaView, setSalaView] = useState({});
    const [reservacion, setReservacion] = useState({});
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [update, setUpdate] = useState(false);

    const handleOpenEdit = (data) => { setOpenEdit(!openEdit); setReservacion(data); };
    const handleOpenDelete = (data) => { setOpenDelete(!openDelete); setReservacion(data); };
    const handleUpdate = () => setUpdate(!update);

    useEffect(() => {
        const fetchSala = async () => {
            try {
                setLoading(true);
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
            }
        };
        fetchSala();
    }, [sala, update]);
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
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>ID</TableCell>
                                            <TableCell>Fecha</TableCell>
                                            <TableCell>Hora Inicio</TableCell>
                                            <TableCell>Hora Fin</TableCell>
                                            <TableCell>Acciones</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {salaView.map((reservacion) => {
                                            const fecha = reservacion.fecha.split('-').reverse().join('-')
                                            return (
                                                <TableRow key={reservacion.id_reservacion}>
                                                    <TableCell>{reservacion.id_reservacion}</TableCell>
                                                    <TableCell>{fecha}</TableCell>
                                                    <TableCell>{reservacion.hora_inicial}</TableCell>
                                                    <TableCell>{reservacion.hora_final}</TableCell>
                                                    <TableCell>
                                                        <div className="flex flex-row justify-around">
                                                            <IconButton
                                                                color="info"
                                                                onClick={() => handleOpenEdit(reservacion)}
                                                            >
                                                                <EditIcon />
                                                            </IconButton>
                                                            <IconButton
                                                                color="error"
                                                                onClick={() => handleOpenDelete(reservacion)}
                                                            >
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                        }
                        {!loading && error.error &&
                            <p>{error.message}</p>
                        }

                    </div>
                </div>
            </div>
            <Modal open={openEdit} onClose={handleOpenEdit}>
                <div style={modal}>
                    <EditReservaciones reservacion={reservacion} close={handleOpenEdit} update={handleUpdate} />
                </div>
            </Modal>
            <Modal open={openDelete} onClose={handleOpenDelete}>
                <div style={modal}>
                    <DeleteReservaciones reservacion={reservacion} close={handleOpenDelete} update={handleUpdate} />
                </div>
            </Modal>
        </div>
    )
}
