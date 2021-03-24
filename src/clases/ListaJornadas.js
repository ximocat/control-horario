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

    //Metodo que me devuelve un string tipo "hh:mm:ss" con las horas de las 
    //jornadas de la semana actual
    calcularHorasSemana(){
        let cont="00:00:00";
        let hoyDate=new Date();
        let offsetComienzoSemana;
        if (hoyDate.getDay()===0){//Si es domingo
            offsetComienzoSemana=6;
        }else{//Para el resto de casos
            offsetComienzoSemana=hoyDate.getDay()-1;
        }
        
        //Fecha de iniciod e la semana en formato enteros de tipo YYYYMMDD
        let diaComienzoSemana=parseInt(FuncionesAuxiliares.obtenerFecha(new Date( hoyDate- 24*3600*1000*offsetComienzoSemana)));
        let diaSuma; //Dia a sumar sus horas
        for (let i=0; i< this.arrayJornadas.length; i++){
            diaSuma=parseInt(FuncionesAuxiliares.obtenerFecha(this.arrayJornadas[i].arrayIntervalos[0].getFechaInicio()));
            if (diaSuma>=diaComienzoSemana && (diaSuma-diaComienzoSemana) < 7){
                cont=FuncionesAuxiliares.sumaDuracionesString(cont,this.arrayJornadas[i].getDuracionJornada());
            }
        }
        return cont;
    }

    //Metodo que me devuelve un string tipo "hh:mm:ss" con las horas de las
    //jornadas del mes actual
    calcularHorasMes(){
        let cont="00:00:00";
        //Hoy en formato string YYYYMMDD
        let hoy=FuncionesAuxiliares.obtenerFecha(new Date());
        let mes=hoy.substring(0,5);//Obtengo los 6 primeros caracteres de hoy, es decir YYYYMM
        let diaSuma;
        for (let i=0; i < this.arrayJornadas.length; i++){
            diaSuma=FuncionesAuxiliares.obtenerFecha(this.arrayJornadas[i].arrayIntervalos[0].getFechaInicio());
            if (diaSuma.substring(0,5)===mes){
                cont=FuncionesAuxiliares.sumaDuracionesString(cont,this.arrayJornadas[i].getDuracionJornada());
            }
        }
        return cont;
    }


    //Metodo que me devuelve un string tipo "hh:mm:ss" con las horas de las
    //jornadas del año actual
    calcularHorasAnyo(){
        let cont="00:00:00";
        //Hoy en formato string YYYYMMDD
        let hoy=FuncionesAuxiliares.obtenerFecha(new Date());
        let anyo=hoy.substring(0,3);//Obtengo los 4 primeros caracteres de hoy, es decir YYYY
        let diaSuma;
        for (let i=0; i < this.arrayJornadas.length; i++){
            diaSuma=FuncionesAuxiliares.obtenerFecha(this.arrayJornadas[i].arrayIntervalos[0].getFechaInicio());
            if (diaSuma.substring(0,3)===anyo){
                cont=FuncionesAuxiliares.sumaDuracionesString(cont,this.arrayJornadas[i].getDuracionJornada());
            }
        }
        return cont;
    }

}

export default ListaJornadas;