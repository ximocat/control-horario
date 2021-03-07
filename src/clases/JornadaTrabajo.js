//Clase que representa una jornada de trabajo
class JornadaTrabajo{
    
    //Constructor
    constructor(){
        this.arrayIntervalosJornada=[];//Array que almacena los intervalos de una jornada
    }
    //Metodo que añade un intervalo de jornada al array de intervalos que componen
    //una jornada
    addIntervaloJornada(intervalo){
        this.arrayIntervalosJornada.push(intervalo);
    }

}

export default JornadaTrabajo;