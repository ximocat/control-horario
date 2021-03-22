import IntervaloJornada from "./IntervaloJornada";
import ListaJornadas from "./ListaJornadas";

class FuncionesAuxiliares {
    //Funcion estática para guardar en localStorage la variable ListaJornadas.app
    static guardarLocalStorage() {
        localStorage.setItem("jornadas", JSON.stringify(ListaJornadas.app))
        this.leerLocalStorage();
    }

    //Funcion estática para  leer los datos de localStorage
    static leerLocalStorage() {
        ListaJornadas.app = new ListaJornadas();
        if (localStorage["jornadas"]) {//Si existe en localStorage
            let datos = JSON.parse(localStorage.getItem("jornadas"));
            for (let i = 0; i < datos.arrayJornadas.length; i++) {
                ListaJornadas.app.addJornada(datos.arrayJornadas[i]);
                
            }
        }
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
        segundos = (fin.getTime() - inicio.getTime()) / 1000;
        horas = parseInt(segundos / 3600);
        segundos -= horas * 3600;
        minutos = parseInt(segundos / 60);
        segundos = parseInt(segundos - minutos * 60);
        return this.formatearDosCaracteres(horas) + ":" +
            this.formatearDosCaracteres(minutos) + ":" +
            this.formatearDosCaracteres(segundos);
    }

    //Funcion estática a la que se le pasan dos string tipo hh:mm:ss y nos 
    //devuelve otro string tipo hh:mm:ss que representa la suma de ambos
    static sumaDuracionesString(duracion1, duracion2) {
        let d1 = duracion1.split(":");
        let d2 = duracion2.split(":");
        //Paso la suma de ambos a segundos
        let segundos = 3600 * (parseInt(d1[0]) + parseInt(d2[0])) +
            60 * (parseInt(d1[1]) + parseInt(d2[1])) +
            (parseInt(d1[2]) + parseInt(d2[2]));
        //Calculo las horas
        let horas = parseInt(segundos / 3600);
        segundos -= horas * 3600;
        //Resto los minutos
        let minutos = parseInt(segundos / 60);
        segundos = parseInt(segundos - minutos * 60);
        //Devolvemos el nuevo string ya sumado
        return this.formatearDosCaracteres(horas) + ":" +
            this.formatearDosCaracteres(minutos) + ":" +
            this.formatearDosCaracteres(segundos);


    }

    //Función estática a la que se le pasar un entero como parámetro y devuelve un string
    //de 2 caracteres, rellenando si es necesario con un 0 a la izquierda
    //Ej 1 -> 01, 11 ->11
    static formatearDosCaracteres(num) {
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

    //Funcion estática para retornar la fecha en formato yyyymmdd
    static obtenerFecha(objetoDate){
        return  objetoDate.getFullYear() + this.formatearDosCaracteres(objetoDate.getMonth()) + this.formatearDosCaracteres(objetoDate.getDate());
    }

    //Funcion estatica que retorna un objeto ListaJornadas a partir del localStorage
    static localStorageToObject(){
        let objListaJornadas=new ListaJornadas();
        for (let i=0; i<ListaJornadas.app.arrayJornadas.length;i++){
            let objJornada=new JornadaTrabajo();
            for (let j=0; j<ListaJornadas.app.arrayJornadas[i].arrayIntervalos.length; j++){
                let objIntervalo= new IntervaloJornada(
                    new Date(ListaJornadas.app.arrayJornadas[i].arrayIntervalos[j].fechaInicio),
                    new Date(ListaJornadas.app.arrayJornadas[i].arrayIntervalos[j].fechaFin));
                objJornada.addIntervaloJornada(objIntervalo);
            }
            objListaJornadas.addJornada(objJornada);
        }
        return objListaJornadas;    
    }

}

export default FuncionesAuxiliares