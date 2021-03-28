import FuncionesAuxiliares from "../clases/FuncionesAuxiliares.js";
import JornadaTrabajo from "../clases/JornadaTrabajo.js";


//Clase que representa todas las jornadas de trabajo
class ListaJornadas {

    //Constructor
    constructor() {
        this.arrayJornadas = [];//Array que almacena las jornadas
    }
    //Metodo que añade una jornada al array de jornadas
    addJornada(jornada) {
        this.arrayJornadas.push(jornada);
    }

    //Método que comprueba si existe una jornada pasada como argumento en formato
    //yyyymmdd
    existeJornada(fechaString) {
        let existe = false;
        for (let i = 0; i < this.arrayJornadas.length; i++) {
            if (FuncionesAuxiliares.obtenerFecha(this.arrayJornadas[i].getFechaInicio()) === fechaString) {
                existe = true;
            }
        }
        return existe;
    }
    //Metodo al que le paso un string con la fecha de inicio de Jornada (yyyymmdd)
    //y me devuelve el índice dentro del array de Jornadas
    indiceJornada(fechaInicioJornada) {
        for (let i = 0; i < this.arrayJornadas.length; i++) {
            if (FuncionesAuxiliares.obtenerFecha(this.arrayJornadas[i].getFechaInicio()) === fechaInicioJornada) {
                return i;
            }
        }
    }

    //Metodo que elimina una jornada del array de Jornadas. Como argumento se le pasa la fecha
    //de inicio de la jornada en formato YYYYMMDD devuelve el incide borrado
    borrarJornada(fechaInicioJornada) {
        let indice = this.indiceJornada(fechaInicioJornada);
        if (confirm("Vas a borrar una Jornada ¿Quieres continuar?")) {
            this.arrayJornadas.splice(indice, 1);
            console.log(this.arrayJornadas);
            FuncionesAuxiliares.guardarLocalStorage();//Guardo en LocalStorage
        }
        return indice;
    }

    //Metodo que me devuelve un string tipo "hh:mm:ss" con las horas de las 
    //jornadas de la semana actual
    calcularHorasSemana() {
        let cont = "00:00:00";
        let hoyDate = new Date();
        let offsetComienzoSemana;
        if (hoyDate.getDay() === 0) {//Si es domingo
            offsetComienzoSemana = 6;
        } else {//Para el resto de casos
            offsetComienzoSemana = hoyDate.getDay() - 1;
        }

        //Fecha de iniciod e la semana en formato enteros de tipo YYYYMMDD
        let diaComienzoSemana = parseInt(FuncionesAuxiliares.obtenerFecha(new Date(hoyDate - 24 * 3600 * 1000 * offsetComienzoSemana)));
        let diaSuma; //Dia a sumar sus horas
        for (let i = 0; i < this.arrayJornadas.length; i++) {
            diaSuma = parseInt(FuncionesAuxiliares.obtenerFecha(this.arrayJornadas[i].arrayIntervalos[0].getFechaInicio()));
            if (diaSuma >= diaComienzoSemana && (diaSuma - diaComienzoSemana) < 7) {
                cont = FuncionesAuxiliares.sumaDuracionesString(cont, this.arrayJornadas[i].getDuracionJornada());
            }
        }
        return cont;
    }

    //Metodo que me devuelve un string tipo "hh:mm:ss" con las horas de las
    //jornadas del mes actual
    calcularHorasMes() {
        let cont = "00:00:00";
        //Hoy en formato string YYYYMMDD
        let hoy = FuncionesAuxiliares.obtenerFecha(new Date());
        let mes = hoy.substring(0, 6);//Obtengo los 6 primeros caracteres de hoy, es decir YYYYMM

        let diaSuma;
        for (let i = 0; i < this.arrayJornadas.length; i++) {
            diaSuma = FuncionesAuxiliares.obtenerFecha(this.arrayJornadas[i].arrayIntervalos[0].getFechaInicio());
            if (diaSuma.substring(0, 6) === mes) {
                cont = FuncionesAuxiliares.sumaDuracionesString(cont, this.arrayJornadas[i].getDuracionJornada());
            }
        }
        return cont;
    }


    //Metodo que me devuelve un string tipo "hh:mm:ss" con las horas de las
    //jornadas del año actual
    calcularHorasAnyo() {
        let cont = "00:00:00";
        //Hoy en formato string YYYYMMDD
        let hoy = FuncionesAuxiliares.obtenerFecha(new Date());
        let anyo = hoy.substring(0, 4);//Obtengo los 4 primeros caracteres de hoy, es decir YYYY

        let diaSuma;
        for (let i = 0; i < this.arrayJornadas.length; i++) {
            diaSuma = FuncionesAuxiliares.obtenerFecha(this.arrayJornadas[i].arrayIntervalos[0].getFechaInicio());
            if (diaSuma.substring(0, 4) === anyo) {
                cont = FuncionesAuxiliares.sumaDuracionesString(cont, this.arrayJornadas[i].getDuracionJornada());
            }
        }
        return cont;
    }

    //Metodo que genera los datos para el gráfico que se mostrará en las estadísticas.
    //Genera las jornadas de la semana actual, el mes actual y el año actual.
    //Devuelve un array con los datos generados siendo:
    //datos['semanal']: datos semanales
    //datos['mensual']: datos mensuales
    //datos['anual']: datos anuales
    obtenerDatosGrafica() {
        //Aray que contendrá los datos
        let datos = [];
    }


    //Metodo que genera los datos semanales para la grafica. Devuelve el array
    //con los datos
    obtenerDatosGraficaSemanal() {
        let dataJornada = [];
        let dataExceso = [];
        let dataDefecto = [];
        let hoy = new Date();
        let offsetComienzoSemana;
        if (hoy.getDay() === 0) {//Si es domingo
            offsetComienzoSemana = 6;
        } else {//Para el resto de casos
            offsetComienzoSemana = hoy.getDay() - 1;
        }

        //obtengo el array de los días de la semana en formato yyyymmdd
        //El indice 0 es lunes y el 6 domingo
        for (let i = 0; i < 7; i++) {
            let dia = FuncionesAuxiliares.obtenerFecha(new Date(hoy - 24 * 3600 * 1000 * (offsetComienzoSemana - i)));
            let indice = this.indiceJornada(dia);
            let valorJornada;
            let valorExceso;
            let valorDefecto;
            if (!this.existeJornada(dia)) {//No existe la Jornada
                valorJornada = 0;
                valorExceso = 0;
                valorDefecto = 0;
            } else {//Existe la jornada
                valorJornada = this.pasarHorasDecimal(this.arrayJornadas[indice].getDuracionJornada());
                if (i > 4) {//Es sábado o domingo, luego todo es exceso
                    valorExceso = valorJornada;
                    valorJornada = 0;
                    valorDefecto = 0;
                } else {//Dia laborable
                    if (valorJornada > 8) { //Hay exceso de jornada
                        valorExceso = valorJornada - 8;
                        valorJornada = 8;
                        valorDefecto = 0;
                    } else {//Hay defecto de jornada
                        valorDefecto = 8 - valorJornada;
                        valorExceso = 0;
                    }
                }
            }
            dataJornada[i] = valorJornada;
            dataExceso[i] = valorExceso;
            dataDefecto[i] = valorDefecto;
        }
        let data = [
            { name: "Jornada", data: dataJornada },
            { name: "Exceso", data: dataExceso },
            { name: "Defecto", data: dataDefecto },
        ]
        console.log(data);
        return data;
    }


    //Metodo al que se le pasa como argumento un string en formato hh:mm:ss
    //y retorna un float con las horas en formato decimal
    pasarHorasDecimal(hora) {
        return parseFloat(hora.split(":")[0]) +
            parseFloat(hora.split(":")[1]) / 60 +
            parseFloat(hora.split(":")[2]) / 3600;
    }

}

export default ListaJornadas;