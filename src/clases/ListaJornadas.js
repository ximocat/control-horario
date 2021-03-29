import FuncionesAuxiliares from "../clases/FuncionesAuxiliares.js";

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
            //console.log(this.arrayJornadas);
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
    calcularHorasMesActual() {
        return this.calcularHorasMes(FuncionesAuxiliares.obtenerFecha(new Date()));
    }

    //Metodo que me devuelve un string tipo "hh:mm:ss" con las horas de las
    //jornadas del cuya fecha pasamos como parámetro
    calcularHorasMes(fecha) {
        let cont = "00:00:00";

        let mes = fecha.substring(0, 6);//Obtengo los 6 primeros caracteres de hoy, es decir YYYYMM
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
        return data;
    }

    //Metodo que genera los datos mensuales para la grafica. Devuelve el array
    //con los datos
    obtenerDatosGraficaMensual() {
        let dataJornada = [];
        let dataExceso = [];
        let dataDefecto = [];
        let anyo = FuncionesAuxiliares.obtenerFecha(new Date()).substring(0, 4);
        let mes = FuncionesAuxiliares.obtenerFecha(new Date()).substring(4, 6);
        let numDias = FuncionesAuxiliares.diasMes()
        //obtengo el array de los días del mes en formato yyyymmdd
        //El indice = dia del mes -1
        for (let i = 0; i < numDias; i++) {
            let dia = anyo + mes + (i < 9 ? "0" + (i + 1) : (i + 1));
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

                if (FuncionesAuxiliares.diaSemana(dia) > 4) {//Es sábado o domingo, luego todo es exceso
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
        return data;
    }

    //Metodo que genera los datos anuales para la grafica. Devuelve el array
    //con los datos
    obtenerDatosGraficaAnual() {
        let dataJornada = [];
        let dataExceso = [];
        let dataDefecto = [];
        let anyo = FuncionesAuxiliares.obtenerFecha(new Date()).substring(0, 4);
        let mes = FuncionesAuxiliares.obtenerFecha(new Date()).substring(4, 6);
        //obtengo el array de los meses del año en formato yyyymmdd
        //El indice = dia del mes -1
        for (let i = 0; i < 12; i++) {
            console.log(this.pasarHorasDecimal(this.calcularHorasMes(anyo + (i < 9 ? "0" + (i + 1) : (i + 1)) + "01")));
            dataJornada[i] = this.pasarHorasDecimal(this.calcularHorasMes(anyo + (i < 9 ? "0" + (i + 1) : (i + 1)) + "01"));
            dataExceso[i] = 0;
            dataDefecto[i] = 0;
        }
        let data = [
            { name: "Jornada", data: dataJornada },
            { name: "Exceso", data: dataExceso },
            { name: "Defecto", data: dataDefecto },
        ]
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