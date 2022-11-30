export const error = {
    nombre: {
        error: false,
        message: "",
    },
    ubicacion: {
        error: false,
        message: "",
        data: ""
    }
}

export const validarRegistro = (e) => {
    if (e.target.name === "nombre") {
        if (e.target.value.length < 1) {
            return { ...error, error: true, message: "El nombre debe tener al menos 1 caracter" }
        }
        else if (e.target.value.length > 30) {
            return { ...error, error: true, message: "El nombre debe tener menos de 30 caracteres" }
        }
        else if (!/^[a-zA-Z0-9 ]+$/.test(e.target.value)) { 
            return { ...error, error: true, message: "El nombre solo puede tener letras y números" }
        }
        else {
            return { ...error, error: false, message: "" }
        }
    }
    if (e.target.name === "ubicacion") {
        if (e.target.value.length < 1) {
            return { ...error, error: true, message: "La ubicacion debe tener al menos 1 caracter" }
        }
        else if (e.target.value.length > 30) {
            return { ...error, error: true, message: "La ubicacion debe tener menos de 30 caracteres" }
        }
        else if (!/^[a-zA-Z0-9 ]+$/.test(e.target.value)) {
            return { ...error, error: true, message: "La ubicacion solo puede tener letras y números" }
        }
        else {
            return { ...error, error: false, message: "" }
        }
    }

}