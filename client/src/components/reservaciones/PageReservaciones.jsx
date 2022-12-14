import { useState, useEffect, Fragment } from 'react'
import {
    Button,
    CircularProgress,
    LinearProgress,
    List,
    ListItemText,
    IconButton,
    ListItem,
    Menu,
    MenuItem,
    Divider,
    Modal,
    Fade,
    Tooltip,
} from '@mui/material'
import modal from '../styles/modal';

import AddReservaciones from './AddReservaciones'
import DeleteReservaciones from './DeleteReservaciones'
import EditReservaciones from './EditReservaciones'


import { getReservaciones } from '../../services/reservaciones'
import CachedIcon from '@mui/icons-material/Cached';
import MoreVertIcon from '@mui/icons-material/MoreVert';
export default function PageReservaciones() {

    const [reservaciones, setReservaciones] = useState([])
    const [reservacion, setReservacion] = useState({})
    const [openAdd, setOpenAdd] = useState(false)
    const [loading, setLoading] = useState(true)
    const [update, setUpdate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [error, setError] = useState({ error: false, message: '' })
    const [updateProgress, setUpdateProgress] = useState(false)

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleOpenAdd = () => setOpenAdd(!openAdd);
    const handleUpdate = () => setUpdate(!update);
    const handleOpenEdit = () => setOpenEdit(!openEdit);
    const handleOpenDelete = () => setOpenDelete(!openDelete);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick = (e, reservacion) => {
        setAnchorEl(e.currentTarget);
        setReservacion(reservacion)
    };




    useEffect(() => {
        const obtenerReservaciones = async () => {
            try {
                setUpdateProgress(true)
                const { message } = await getReservaciones();
                setReservaciones(message);
                console.log(message)
                setUpdateProgress(false)
                setLoading(false);
                setError({ error: false, message: '' })

            } catch (error) {
                try {
                    if (error.response.status === 400) {
                        setLoading(false)
                        setUpdateProgress(false)
                        setError({
                            error: true,
                            message: error.response.data.message
                        })
                        return
                    }
                } catch (error) {
                    setLoading(false)
                    setUpdateProgress(false)
                    setSalas([])
                    setError({
                        error: true,
                        message: 'Error al cargar las salas'
                    })
                }
            }
        }
        obtenerReservaciones();
        //Cada 20 segundos se actualiza la lista de reservaciones
        const interval = setInterval(() => {
            obtenerReservaciones();
        }, 20000);
        return () => clearInterval(interval);
    }, [update]);

    return (
        <div className='bg-red-400  bg-color2 border border-black w-96 p-2 rounded-xl rounded-l-none'>
            <div className='flex flex-col'>
                <h2 className='text-2xl text-center text-color5 m-2'>
                    Reservaciones
                </h2>
                <div className='m-2 '>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleOpenAdd}
                    >
                        Solicitar reservacion
                    </Button>
                </div>
                <div className='m-2'>
                    {loading && <div className='flex justify-center m-5'><CircularProgress /></div>}
                    {!loading && error.error && <div className='text-center text-color5 m-5'>{error.message}</div>}

                    {!loading && !error.error &&
                        <List
                            sx={{
                                width: '100%',
                                maxWidth: 360,
                                position: 'relative',
                                overflow: 'auto',
                                maxHeight: 450,
                                '& ul': { padding: 0 },
                                backgroundColor: 'background.paper',
                            }}
                            subheader={<li />}
                        >
                            {updateProgress && <LinearProgress variant="query" />}
                            <div className='flex justify-end'>
                                <Tooltip title='Actualizar'>
                                    <IconButton onClick={handleUpdate} className='m-2' color='info'>
                                        <CachedIcon />
                                    </IconButton>
                                </Tooltip>
                            </div>
                            {reservaciones.map((reservacion) => {
                                const fecha = reservacion.fecha.split('-').reverse().join('-')
                                return (
                                    <Fragment key={reservacion.id_reservacion}>
                                        <Divider classes={{ root: 'bg-color5' }} />
                                        <ListItem
                                            key={reservacion.id_reservacion}
                                        >
                                            <ListItemText
                                                primary={`${reservacion.nombre}`}
                                                secondary={`Inicio: ${reservacion.hora_inicial}`}
                                            />
                                            <ListItemText
                                                primary={`Fecha: ${fecha}`}
                                                secondary={`Fin: ${reservacion.hora_final}`}
                                            />
                                            <IconButton
                                                edge="end"
                                                aria-label="delete"
                                                onClick={(e) => handleClick(e, reservacion)}
                                            >
                                                <MoreVertIcon />
                                            </IconButton>


                                        </ListItem>
                                    </Fragment>
                                )
                            })}

                        </List>
                    }
                </div>

            </div>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                TransitionComponent={Fade}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleOpenEdit}>Editar</MenuItem>
                <MenuItem onClick={handleOpenDelete}>Eliminar</MenuItem>
            </Menu>

            <Modal open={openAdd} onClose={handleOpenAdd}>
                <div style={modal}>
                    <AddReservaciones close={handleOpenAdd} update={handleUpdate} />
                </div>
            </Modal>
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
