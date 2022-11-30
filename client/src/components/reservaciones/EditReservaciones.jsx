import { useState, useEffect } from "react";
import {
    TextField,
    Button,
    CircularProgress,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";


import { toast } from 'react-toastify'

export default function EditReservaciones({ reservacion, close, update }) {
    return (
        <div className="flex flex-col  border border-black rounded-lg bg-color5">
            <div className="text-right">
                <CloseIcon
                    onClick={() => close()}
                    className="cursor-pointer text-red-400 hover:text-red-900 "
                />
            </div>
            <div>
                <h1 className="text-center text-2xl font-bold">Editar Reservación</h1>
            </div>
        </div>
    )
}
