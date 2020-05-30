const crearMensaje = (nombre, mensaje) => {

    return {
        nombre,
        mensaje,
        fecah: new Date().getTime()

    }
}

module.exports = {
    crearMensaje
}