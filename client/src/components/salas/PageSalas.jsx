import { useState, useEffect, Fragment } from 'react'
import {
    Button,
    CircularProgress,
    List,
    ListItemText,
    IconButton,
    ListItem,
    Menu,
    MenuItem,
    Divider,
    Modal,
    Fade

} from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { getSalas } from '../../services/salas'
import modal from '../styles/modal';

import AddSalas from './AddSalas'
import EditSalas from './EditSalas'
import DeleteSalas from './DeleteSalas'
import ViewSalas from './ViewSalas';
export default function PageSalas() {

    const [salas, setSalas] = useState([])
    const [sala, setSala] = useState({})
    const [openAdd, setOpenAdd] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState({ error: false, message: '' })
    const [anchorEl, setAnchorEl] = useState(null);
    const [update, setUpdate] = useState(false);
    const [openView, setOpenView] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const open = Boolean(anchorEl);

    const handleOpenAdd = () => setOpenAdd(!openAdd);
    const handleUpdate = () => setUpdate(!update);
    const handleOpenView = () => setOpenView(!openView);
    const handleOpenEdit = () => setOpenEdit(!openEdit);
    const handleOpenDelete = () => setOpenDelete(!openDelete);


    useEffect(() => {
        const fetchSalas = async () => {
            try {
                setLoading(true)
                const { message } = await getSalas()
                setSalas(message)
                setLoading(false)
                setError({ error: false, message: '' })
            } catch (error) {
                try {
                    if (error.response.status === 400) {
                        setLoading(false)
                        setSalas([])
                        setError({
                            error: true,
                            message: error.response.data.message
                        })
                        return
                    }
                } catch (error) {
                    setLoading(false)
                    setSalas([])
                    setError({
                        error: true,
                        message: 'Error al cargar las salas'
                    })
                }
            }
        }
        fetchSalas()
    }, [update])

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick = (e, sala) => {
        setAnchorEl(e.currentTarget);
        setSala(sala)
    };



    return (
        <div className='bg-red-400  bg-color2 border border-black w-96 p-2 rounded-xl rounded-r-none'>
            <div className='flex flex-col'>
                <h2 className='text-2xl text-center text-color5 m-2'>
                    Salas de juntas
                </h2>
                <div className='m-2'>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleOpenAdd}
                    >
                        Agregar
                    </Button>
                </div>
                {loading && <div className='flex justify-center m-5'><CircularProgress /></div>}
                {!loading && error.error && <div className='text-center text-color5 m-5'>{error.message}</div>}

                {!loading && !error.error &&
                    <List>
                        {salas.map((sala) => (
                            <Fragment key={sala.id_sala}>
                                <Divider classes={{ root: 'bg-color5' }} />
                                <ListItem
                                    key={sala.id_sala}
                                    secondaryAction={
                                        <IconButton
                                            edge="end"
                                            aria-label="comments"
                                            onClick={(e) => handleClick(e, sala)}
                                        >
                                            <MoreHorizIcon
                                                classes={{ root: 'text-color5' }}
                                            />
                                        </IconButton>
                                    }
                                >
                                    <ListItemText
                                        classes={{ primary: 'text-color5' }}
                                        primary={sala.nombre} />
                                </ListItem>


                            </Fragment>
                        ))}
                    </List>
                }


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
                <MenuItem onClick={handleOpenView}>Ver</MenuItem>
                <MenuItem onClick={handleOpenEdit}>Editar</MenuItem>
                <MenuItem onClick={handleOpenDelete}>Eliminar</MenuItem>
            </Menu>

            <Modal open={openView} onClose={handleOpenView}>
                <div style={modal}>
                    <ViewSalas sala={sala} close={handleOpenView} update={handleUpdate} />
                </div>
            </Modal>

            <Modal open={openAdd} onClose={handleOpenAdd}>
                <div style={modal}>
                    <AddSalas close={handleOpenAdd} update={handleUpdate} />
                </div>
            </Modal>
            <Modal open={openEdit} onClose={handleOpenEdit}>
                <div style={modal}>
                    <EditSalas sala={sala} close={handleOpenEdit} update={handleUpdate} />
                </div>
            </Modal>
            <Modal open={openDelete} onClose={handleOpenDelete}>
                <div style={modal}>
                    <DeleteSalas sala={sala} close={handleOpenDelete} update={handleUpdate} />
                </div>
            </Modal>
        </div>
    )
}
