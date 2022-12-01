export const error = {
    fecha: {
        error: false,
        message: "",
    },
    hora_inicial: {
        error: false,
        message: "",
    },
    hora_final: {
        error: false,
        message: "",
    },
}



export const validarRegistro = (e) => {
    if (e.target.name === "fecha") {
        const fechaActualMenosUno = new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().slice(0, 10);
        if (e.target.value === "") {
            return { ...error, error: true, message: "La fecha es requerida" }
        } else if (e.target.value < fechaActualMenosUno) {
            return { ...error, error: true, message: "La fecha no puede ser menor a la actual" }
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

}