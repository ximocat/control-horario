class IntervalosJornada{
    //Constructor al que se len dos objetos Date que representa la fecha de
    //inicio y fin del intervalo de la jornada
    constructor(fechaInicio,fechaFin){
        this.fechaInicio=fechaInicio;
        this.fechaFin=fechaFin;
    }

    getFechaInicio(){
        return this.fechaInicio;
    }
    getFechaFin(){
        return this.fechaFin;
    }
    setFechaInicio(fechaInicio){
        this.fechaInicio = fechaInicio;
    }

    setFechaFin(fechaFin){
        this.fechaFin = fechaFin;
    }

    getHorasIntervalo(){
        
        return FuncionesAuxiliares.pasarAhora(this.)
    }

    getMinutosIntervalo(){

    }

    getSegundosIntervalo(){

    }

    getTiempoStringIntervalo(){
        

    }
}

export default IntervalosJornada;