const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios');
const { crearMensaje } = require('../utilidades/utilidades');

const usuarios = new Usuarios();


io.on('connection', (client) => {

    client.on('entrarChat', (data, callback) => {

        if (!data.nombre || !data.sala) {
            return callback({
                error: true,
                mensaje: 'El nombre y sala son necesarios'

            });
        }

        client.join(data.sala);

        usuarios.agregarPersona(client.id, data.nombre, data.sala);

        client.broadcast.to(data.sala).emit('listapersona', usuarios.getPersonaPorSala(data.sala));
        client.broadcast.to(data.sala).emit('crearmensaje', crearMensaje('administrador', `${data.nombre}  a ingresado a    ${data.sala}`));
        // console.log('esto es lo que recibo', perSala, persona, sallll);
        callback(usuarios.getPersonaPorSala(data.sala));

        console.log(data);


    });

    client.on('crearmensaje', (data, callback) => {

        let persona = usuarios.getpersona(client.id);

        let mensaje = crearMensaje(persona.nombre, data.mensaje);
        client.broadcast.to(persona.sala).emit('crearmensaje', mensaje);
        callback(mensaje);
    });



    client.on('disconnect', function() {

        let personaBorrada = usuarios.borrarPersona(client.id);

        client.broadcast.to(personaBorrada.sala).emit('crearmensaje', crearMensaje('administrador', `${personaBorrada.nombre}            abandono el chat`));
        client.broadcast.to(personaBorrada.sala).emit('listapersonas', usuarios.getPersonaPorSala(personaBorrada.sala));
        console.log('persona borrada', usuarios.getPersonaPorSala(personaBorrada.sala));
    })

    //Mesajes privados 

    client.on('mensajePrivado', data => {

        let persona = usuarios.getpersona(client.id);

        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje));

    })


});