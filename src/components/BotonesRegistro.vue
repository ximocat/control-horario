<template>
  <div class="q-pa-md q-gutter-sm">
    <!-- Chip con la fecha actual -->
    <div class="row justify-center q-gutter-xs">
      <q-chip outline color="primary" text-color="white" size="xl" square>
        {{ diaSemanaActual }} {{ diaActual }} {{ horaActual }}
      </q-chip>
    </div>
    <div class="row justify-center q-gutter-xs">
      <q-btn-toggle
        v-model="entradaPunch"
        color="white"
        toggle-color="info"
        toggle-text-color="grey-10"
        text-color="grey-6"
        glossy
        :options="[
          { label: 'Entrada punch', value: true },
          { label: 'Entrada manual', value: false },
        ]"
      />
    </div>
    <div v-show="entradaPunch" class="q-pa-md q-gutter-sm">
      <!-- Botones para el registro de la jornada -->
      <div class="row justify-center q-gutter-xs">
        <q-btn
          @click="iniciarIntervalo"
          icon="play_arrow"
          label="Inicio"
          stack
          glossy
          color="primary"
          :disabled="!activarBtnInicio"
          style="width: 30%"
        />
        <q-btn
          @click="finalizarIntervalo"
          icon="pause"
          label="Pausa"
          stack
          glossy
          color="red"
          :disabled="!activarBtnPausa"
          style="width: 30%"
        />
        <q-btn
          @click="finalizarJornada"
          icon="stop"
          label="Fin"
          stack
          glossy
          color="red"
          :disabled="!activarBtnFin"
          style="width: 30%"
        />
      </div>
      
      
    </div>

    <div v-show="!entradaPunch" class="q-pa-md q-gutter-sm">
      <div class="q-pa-md">
        <div class="q-gutter-md" style="max-width: 300px">
          <q-input
            v-model="fechaManual"
            filled
            type="date"
            stack-label
            label="Dia"
            @input="existeFechaJornada"
          />
          <q-input
            v-model="horaInicioManual"
            outlined
            type="time"
            stack-label
            label="Hora Inicio"
          />
          <q-input
            v-model="horaFinManual"
            outlined
            type="time"
            stack-label
            label="Hora Fin"
          />
          <q-btn
            @click="addIntervalo"
            
            label="Añadir Intervalo"
            stack
            glossy
            color="primary"
            style="width: 44%"
            :disabled="!activarBotonesManual"
          />
          <q-btn
            @click="finalizarJornadaManual"
            label="Finalizar Jornada"
            stack
            glossy
            color="red"
            style="width: 44%"
            :disabled="!activarBotonesManual"
          />
        </div>
      </div>
    </div>
    <!-- Chip para la duración de la jornada actual -->
      <div class="row justify-center q-gutter-xs">
        <q-chip outline color="primary" text-color="white" size="md" square>
          Tiempo Jornada: {{ tiempoJornada }}</q-chip
        >
      </div>
    <!-- Tabla con los diferentes intervalos de tiempo de la jornada actual -->
      <div class="q-gutter-xs">
        <q-table
          title="Jornada actual"
          :data="datosTabla"
          hide-bottom
          :rows-per-page-options="[0]"
        />
      </div>
  </div>
</template>

<script>
import FuncionesAuxiliares from "../clases/FuncionesAuxiliares.js";
import IntervaloJornada from "../clases/IntervaloJornada.js";
import JornadaTrabajo from "../clases/JornadaTrabajo.js";
import ListaJornadas from "../clases/ListaJornadas.js";

export default {
  name: "botones-registro",
  //********************
  //Variables reactivas
  //********************
  data: function () {
    return {
      fechasInicio: [], //Array con las fechas de inicio de los intervalos de jornada
      fechasFin: [], //Array con las fechas de inicio de los intervalos de jornada
      fechaActual: null, //Contiene la fecha/hora actual (tipo Date)
      //Flags para detectar si deben estar activados botones
      activarBtnInicio: true,
      activarBtnPausa: false,
      activarBtnFin: false,
      timer: null, //Timer para poder representar la hora actual en pantalla
      intervaloActual: null, //Contiene la instancia del intervalo de tiempo actual
      jornadaActual: null, //Contiene la instancia de la jornada actual
      //arrayJornadas: ListaJornadas.app, //Contiene la instancia de la clase ListaJornadas
      entradaPunch: true, //Indica si la entrada de datos será punch (true) o manual (false)
      //Fecha y horas para entrada manual
      fechaManual: null,
      horaInicioManual: null,
      horaFinManual: null,

    };
  },
  //********************
  //Variables calculadas
  //********************
  computed: {
    //Contiene el día de la fecha actual en formato dd/mm/aaaa
    diaActual: function () {
      return this.fechaActual.toLocaleDateString();
    },
    //Contiene el día de la semana de la fecha actual
    diaSemanaActual: function () {
      switch (this.fechaActual.getDay()) {
        case 0:
          return "Domingo";
        case 1:
          return "Lunes";
        case 2:
          return "Martes";
        case 3:
          return "Miércoles";
        case 4:
          return "Jueves";
        case 5:
          return "Viernes";
        case 6:
          return "Sábado";
        default:
          console.log("Algo ha ido mal obteniendo el día de la semana");
      }
      return "";
    },
    //Contiene la hora actual en formato hh:mm:ss
    horaActual: function () {
      return this.fechaActual.toLocaleTimeString();
    },
    //Contiene los datos para actulizar la tabla de intervalos de jornada
    datosTabla: function () {
      let vector = []; //Vector que usaremos para devolver el resultado

      //Añadimos primero al vector los intervalos que hay en la jornada Actual
      let arrayIntervalos = this.jornadaActual.getIntervalos();
      for (let i = 0; i < arrayIntervalos.length; i++) {
        vector.push({
          inicio:
            FuncionesAuxiliares.pasarAfecha(
              arrayIntervalos[i].getFechaInicio()
            ) +
            " " +
            FuncionesAuxiliares.pasarAhora(arrayIntervalos[i].getFechaInicio()),
          fin:
            FuncionesAuxiliares.pasarAfecha(arrayIntervalos[i].getFechaFin()) +
            " " +
            FuncionesAuxiliares.pasarAhora(arrayIntervalos[i].getFechaFin()),
        });
      }
      //Añadimos el intervalo en curso (si lo hay)
      if (this.intervaloActual !== null) {
        vector.push({
          inicio:
            FuncionesAuxiliares.pasarAfecha(
              this.intervaloActual.getFechaInicio()
            ) +
            " " +
            FuncionesAuxiliares.pasarAhora(
              this.intervaloActual.getFechaInicio()
            ),
          fin:
            this.intervaloActual.getFechaFin() !== null
              ? FuncionesAuxiliares.pasarAfecha(
                  this.intervaloActual.getFechaFin()
                ) +
                " " +
                FuncionesAuxiliares.pasarAhora(
                  this.intervaloActual.getFechaFin()
                )
              : "- - -",
        });
      }

      return vector;
    },
    //Contiene un string tipo hh:mm:ss con la duración de la jornada actual.
    tiempoJornada: function () {
      return this.jornadaActual.getDuracionJornada();
    },

    //Variable calculada para saber si tenemos que activar los botones para
    //el registro manual de la jornada
    activarBotonesManual: function(){
      return (this.fechaManual!==null && this.horaInicioManual !==null && this.horaFinManual!==null);
    }
  },

  //********************
  // Métodos
  //********************
  methods: {
    //Instancia un nuevo intervalo de jornada con la fecha actual (tipo Date)
    //y activa/desactiva los botones correspondientes
    iniciarIntervalo: function () {
      this.activarBtnInicio = false;
      this.activarBtnPausa = true;
      this.activarBtnFin = true;
      this.intervaloActual = new IntervaloJornada(this.fechaActual);
    },
    //Añade la fechaActual a la fecha (tipo Date) de fin del intervaloActual
    //añade el intervaloActual a la jornadaActual, borra el intervalo actual 7
    //activa/desactiva los botones correspondientes
    finalizarIntervalo: function () {
      this.activarBtnInicio = true;
      this.activarBtnPausa = false;
      this.activarBtnFin = true;
      this.intervaloActual.setFechaFin(this.fechaActual);
      this.jornadaActual.addIntervaloJornada(this.intervaloActual);
      this.intervaloActual = null; //Borra el intervalo actual
    },
    //
    finalizarJornada: function () {
      this.activarBtnInicio = true;
      this.activarBtnPausa = false;
      this.activarBtnFin = false;
      //Comprobamos que intervaloActual no sea nulo
      if (this.intervaloActual !== null) {
        this.intervaloActual.setFechaFin(this.fechaActual);
        this.jornadaActual.addIntervaloJornada(this.intervaloActual);
        this.intervaloActual = null; //Borra el intervalo actual
      }
      ListaJornadas.app.addJornada(this.jornadaActual);
      this.jornadaActual = null; //Borra la jornada actual
      this.jornadaActual = new JornadaTrabajo(); //Instancio una nueva jornada
      //Borro los inputs de entrada manual
      this.fechaManual=null;
      this.horaInicioManual=null;
      this.horaFinManual=null;
      //Guardamos en localStorage la lista de Jornadas
      FuncionesAuxiliares.guardarLocalStorage();
    },
    //Obtiene la fecha actual
    actualizarFecha: function () {
      this.fechaActual = new Date();
    },
    //
    finalizarJornadaManual(){
      this.addIntervalo();
      this.finalizarJornada();
    },

    //Comprueba si la fecha seleccionada manualmente ya tiene jornada asignada y
    //muestra mensaje de error
    existeFechaJornada: function(){
      let respuesta= ListaJornadas.app.existeJornada(new Date(this.fechaManual).toLocaleDateString());
      if (respuesta){
        alert("Ya existe la jornada del " + this.fechaManual + ". Si deseas cambiarla ve al apartado 'EDITAR JORNADAS'");
        this.fechaManual=null;
      }
    },

    //Añade un intervalo en el metodo de entrada manual
    addIntervalo: function(){
      let fechaI = new Date(this.fechaManual + ' ' + this.horaInicioManual);
      let fechaF = new Date(this.fechaManual + ' ' + this.horaFinManual);
      this.intervaloActual = new IntervaloJornada(fechaI, fechaF);
      this.jornadaActual.addIntervaloJornada(this.intervaloActual);
      this.intervaloActual = null; //Borra el intervalo actual
      //Borro los inputs de entrada manual
      this.fechaManual=null;
      this.horaInicioManual=null;
      this.horaFinManual=null;
    }
  },

  //********************
  // Hooks de Vue
  //********************
  created: function () {
    this.actualizarFecha();
    //Instancio la jornada
    this.jornadaActual = new JornadaTrabajo();
  },
  mounted: function () {
    //Se establece un temporizador para actulizar la fechaActual
    this.timer = setInterval(this.actualizarFecha, 1000);
    
  },
  beforeDestroy: function () {
    //
    //Se borra el temporizador antes de destruir la instancia de Vue
    clearTimeout(this.timer);
  },

};
</script>