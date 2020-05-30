class Usuarios {

    constructor() {
        this.personas = [];
    }
    agregarPersona(id, nombre, sala) {

        let persona = { id, nombre, sala }

        this.personas.push(persona);

        return this.personas;

    }


    getpersona(id) {
        let persona = this.personas.filter(persona => persona.id === id)[0];

        return persona;
    }


    getpersonas() {
        return this.personas;
    }

    getPersonaPorSala(sala) {
        let personasEnSala = this.personas.filter(persona => persona.sala === sala);
        //  console.log('esto es persona en sala', personasEnSala);
        return personasEnSala;
    }


    borrarPersona(id) {

        let personaBorrada = this.getpersona(id);
        this.personas.filter(persona => persona.id != id);

        return personaBorrada

    }

}

module.exports = {
    Usuarios

}