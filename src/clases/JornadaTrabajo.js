//Clase que representa una jornada de trabajo
class JornadaTrabajo {

    //Constructor
    constructor() {
        this.arrayIntervalos = [];//Array que almacena los intervalos de una jornada
    }
    //Metodo que añade un intervalo de jornada al array de intervalos que componen
    //una jornada
    addIntervaloJornada(intervalo) {
        this.arrayIntervalos.push(intervalo);
    }

    //Metodo que calcula el tiempo de una jornada y devuelve un string del tipo
    //hh:mm:ss
    getDuracionJornada() {
        let duracion = "00:00:00";
        //Recorro todo el array y sumo las duraciones
        for (let i = 0; i < this.arrayIntervalos.length; i++) {
            duracion = FuncionesAuxiliares.sumaDuracionesString(duracion,
                FuncionesAuxiliares.duracionIntervaloString(
                    this.arrayIntervalos[i].getFechaInicio(),
                    this.arrayIntervalos[i].getFechaFin()));
        }
        return duracion;

    }

}

export default JornadaTrabajo;