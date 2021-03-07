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

    //Función estática que devuelve un string tipo hh:mm:ss que representa
    //el tiempo transcurrido entre dos objetos Date pasados como parámetros
    static duracionIntervaloString(inicio, fin) {
        let segundos = 0;
        let horas = 0;
        let minutos = 0;
        segundos = (fin.getTime() - inicio.getTime) / 1000;
        horas = parseInt(segundos / 3600);
        segundos -= horas * 3600;
        minutos = parseInt(segundos / 60);
        segundos = parseInt(segundos - minutos * 60);
        return formatearDosCaracteres(horas) + ":" +
            formatearDosCaracteres(minutos) + ":" +
            formatearDosCaracteres(segundos);
    }

    //Función a la que se le pasar un entero como parámetro y devuelve un string
    //de 2 caracteres, rellenando si es necesario con un 0 a la izquierda
    //Ej 1 -> 01, 11 ->11
    formatearDosCaracteres(num) {
        if (num < 10) {
            return "0" + num;
        }
        return String(num);
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