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
    if (e.target.name === "fecha") {
        if (e.target.value === "") {
            return { ...error, error: true, message: "La fecha es requerida" }
        }
        else {
            return { ...error, error: false, message: "" }
        }
    }
    if (e.target.name === "hora_inicial") {
        if (e.target.value === "") {
            return { ...error, error: true, message: "La hora inicial es requerida" }
        }
        else {
            return { ...error, error: false, message: "" }
        }
    }
    if (e.target.name === "hora_final") {
        if (e.target.value === "") {
            return { ...error, error: true, message: "La hora final es requerida" }
        }
        else {
            return { ...error, error: false, message: "" }
        }
    }
    if (e.target.name === "id_sala") {
        if (e.target.value === "") {
            return { ...error, error: true, message: "La sala es requerida" }
        }
        else {
            return { ...error, error: false, message: "" }
        }
    }

}