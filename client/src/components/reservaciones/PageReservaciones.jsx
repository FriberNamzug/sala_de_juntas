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
import modal from '../styles/modal';
import AddReservaciones from './AddReservaciones'

export default function PageReservaciones() {
    const [salas, setSalas] = useState([])
    const [sala, setSala] = useState({})
    const [openAdd, setOpenAdd] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
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

    return (
        <div className='bg-red-400  bg-color2 border border-black w-96 p-2 rounded-xl rounded-l-none'>
            <div className='flex flex-col'>
                <h2 className='text-2xl text-center text-color5 m-2'>
                    Reservaciones
                </h2>
                <div className='m-2'>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleOpenAdd}
                    >
                        Solicitar reservacion
                    </Button>
                </div>
            </div>
            <Modal open={openAdd} onClose={handleOpenAdd}>
                <div style={modal}>
                    <AddReservaciones close={handleOpenAdd} update={handleUpdate} />
                </div>
            </Modal>
        </div>
    )
}
