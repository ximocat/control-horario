class FuncionesAuxiliares {
    //Funcion estática para guardar en localStorage los datos
    static guardarLocalStorage() {
        alert("hola auxiliar")
        //localStorage.setItem("jornadas",JSON.stringify())
    }

    //Función estática que devuelve los segundos que hay entre dos objetos Date
    //pasados como parámetros
    static segundosIntervalo(fechaInicio, fechaFin) {
        return (fechaFin.getTime() - fechaInicio.getTime()) / 1000;
    }

    //Función estática a la que se le pasa como argumento un objeto tipo Date y
    //devuelve la hora en un string de tipo hh:mm:ss
    static pasarAhora(objetoDate) {
        return objetoDate.toLocaleTimeString();
    }

    //Función estática a la que se le pasa como argumento un objeto tipo Date y
    //devuelve la fecha en un string de tipo dd/mm/aaaa
    static pasarAfecha(objetoDate) {
        return objetoDate.toLocaleDateString();
    }

}

export default FuncionesAuxiliares