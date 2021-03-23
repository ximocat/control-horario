import FuncionesAuxiliares from "../clases/FuncionesAuxiliares.js";

//Clase que representa todas las jornadas de trabajo
class ListaJornadas{
    
    //Constructor
    constructor(){
        this.arrayJornadas=[];//Array que almacena las jornadas
    }
    //Metodo que añade una jornada al array de jornadas
    addJornada(jornada){
        this.arrayJornadas.push(jornada);
    }

    //Método que comprueba si existe una jornada
    existeJornada(fechaString){
        let existe=false;
        for (let i=0; i<this.arrayJornadas.length;i++){
            if (this.arrayJornadas[i].getFechaInicio().toLocaleDateString() === fechaString){
                existe=true;
            }
        }
        return existe;
    }
    //Metodo al que le paso un string con la fecha de inicio de Jornada (yyyymmdd)
    //y me devuelve el índice dentro del array de Jornadas
    indiceJornada(fechaInicioJornada){
        for(let i=0; i< this.arrayJornadas.length; i++){
            if (FuncionesAuxiliares.obtenerFecha(this.arrayJornadas[i].getFechaInicio()) === fechaInicioJornada){
                return i;
            }
        }
    }

    //Metodo que elimina una jornada del array de Jornadas. Como argumento se le pasa la fecha
    //de inicio de la jornada en formato YYYYMMDD devuelve el incide borrado
    borrarJornada(fechaInicioJornada){
        let indice=this.indiceJornada(fechaInicioJornada);
        if (confirm("Vas a borrar una Jornada ¿Quieres continuar?")){
            this.arrayJornadas.splice(indice,1);
            console.log(this.arrayJornadas);
            FuncionesAuxiliares.guardarLocalStorage();//Guardo en LocalStorage
        }
        return indice;
    }

}

export default ListaJornadas;