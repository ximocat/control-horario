import FuncionesAuxiliares from "../clases/FuncionesAuxiliares.js";
class IntervaloJornada {
    //Constructor al que se le pasa al menos un objeto Date que representa la 
    //fecha de inicio. Puede pasarse la fecha de fin en caso
    constructor(fechaInicio, fechaFin = null) {
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
    }

    getFechaInicio() {
        return this.fechaInicio;
    }

    getFechaInicioAfecha(){
        return FuncionesAuxiliares.pasarAfecha(this.fechaInicio);
    }

    getFechaInicioAhora(){
        return FuncionesAuxiliares.pasarAhora(this.fechaInicio);
    }

    getFechaFin() {
        return this.fechaFin;
    }

    getFechaFinAfecha(){
        return FuncionesAuxiliares.pasarAfecha(this.fechaFin);
    }

    getFechaFinAhora(){
        return FuncionesAuxiliares.pasarAhora(this.fechaFin);
    }

    setFechaInicio(fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    setFechaFin(fechaFin) {
        this.fechaFin = fechaFin;
    }

    /* getHorasIntervalo() {
        return FuncionesAuxiliares.pasarAhora(this.)
    }

    getMinutosIntervalo() {

    }

    getSegundosIntervalo() {

    } */
    
    //Retorna un string (hh:mm:ss) con el tiempo que dura el intervalo. En caso
    //de que no se haya introducido fechaFin significa que el intervalo sigue
    //en curso, por lo devolverá el tiempo entre la fecha actual y la fecha de inicio
    getTiempoIntervaloString() {
        if (this.fechaFin === null) {//No hay fechaFin. Intervalo en curso
            return FuncionesAuxiliares.duracionIntervaloString(this.fechaInicio,
                new Date());
        }
        return FuncionesAuxiliares.duracionIntervaloString(this.fechaInicio,
            this.fechaFin);

    }
}

export default IntervaloJornada;