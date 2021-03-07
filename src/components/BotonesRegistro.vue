<template>
  <div class="q-pa-md q-gutter-sm">
    <!-- Chip con la fecha actual -->
    <div class="row justify-center q-gutter-xs">
      <q-chip outline color="primary" text-color="white" size="xl" square>
        {{ diaSemanaActual }} {{ diaActual }} {{ horaActual }}
      </q-chip>
    </div>
    <!-- Botones para el registro de la jornada -->
    <div class="row justify-center q-gutter-xs">
      <q-btn
        @click="iniciarIntervalo"
        icon="play_arrow"
        label="Inicia Jornada"
        stack
        glossy
        color="primary"
        id="btnInicio"
        :disabled="!activarBtnInicio"
      />
      <q-btn
        @click="finalizarIntervalo"
        icon="stop"
        label="Acaba Jornada"
        stack
        glossy
        color="red"
        id="btnFin"
        :disabled="!activarBtnFin"
      />
    </div>
    <!-- Chip para la duración de la jornada actual -->
    <div class="row justify-center q-gutter-xs">
      <q-chip outline color="primary" text-color="white" size="md" square>
        Tiempo Jornada: {{ tiempoJornada[0] }}h {{ tiempoJornada[1] }}m
        {{ tiempoJornada[2] }}s</q-chip
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
import FuncionesAuxiliares from "../clases/FuncionesAuxiliares";
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
      activarBtnFin: false,
      timer: null, //Timer para poder representar la hora actual en pantalla
      //jornadas: [], //Array con todas las jornadas ej['fecha':'10/10/2020','jornada':'8.3']
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
      let vector = [];

      for (let i = 0; i < this.fechasInicio.length; i++) {
        //Comprobamos que los registros sean del día actual
        if (FuncionesAuxiliares.pasarAfecha(this.fechasInicio[i]) === this.diaActual) {
          vector.push({
            inicio:
              FuncionesAuxiliares.pasarAfecha(this.fechasInicio[i]) +
              " " +
              FuncionesAuxiliares.pasarAhora(this.fechasInicio[i]),
            fin:
              this.fechasFin.length > i
                ? FuncionesAuxiliares.pasarAfecha(this.fechasFin[i]) +
                  " " +
                  FuncionesAuxiliares.pasarAhora(this.fechasFin[i])
                : "- - -",
          });
        }
      }
      return vector;
    },
    //Contiene un array con la duración de la jornada actual.
    //tiempoJornada[0] contiene las horas
    //tiempoJornada[1] contiene los minutos
    //tiempoJornada[2] contiene los segundos
    tiempoJornada: function () {
      let segundos = 0;
      let horas = 0;
      let minutos = 0;
      for (let i = 0; i < this.fechasInicio.length; i++) {
        let inicio = this.fechasInicio[i].getTime();
        let fin;
        this.fechasFin.length > i
          ? (fin = this.fechasFin[i].getTime())
          : (fin = this.fechaActual.getTime());
        segundos += (fin - inicio) / 1000;
      }
      horas = parseInt(segundos / 3600);
      segundos -= horas * 3600;
      minutos = parseInt(segundos / 60);
      segundos = parseInt(segundos - minutos * 60);

      return [horas, minutos, segundos];
    },
  },

  //********************
  // Métodos
  //********************
  methods: {
    //Añade la fecha actual (tipo Date) al array de fechas de inicio y
    //activa/desactiva los botones correspondientes
    iniciarIntervalo: function () {
      this.activarBtnInicio = false;
      this.activarBtnFin = true;

      this.fechasInicio.push(this.fechaActual);
    },
    //Añade la fecha actual (tipo Date) al array de fechas de fin y
    //activa/desactiva los botones correspondientes
    finalizarIntervalo: function () {
      this.activarBtnInicio = true;
      this.activarBtnFin = false;

      this.fechasFin.push(this.fechaActual);
    },
    //Obtiene la fecha actual
    actualizarFecha: function () {
      this.fechaActual = new Date();
    }
  },

  //********************
  // Hooks de Vue
  //********************
  created: function () {
    this.actualizarFecha();
  },
  mounted: function () {
    //Se establece un temporizador para actulizar la fechaActual
    this.timer = setInterval(this.actualizarFecha, 1000);
  },
  beforeDestroy: function () {//
    //Se borra el temporizador antes de destruir la instancia de Vue
    clearTimeout(this.timer);
  },
};
</script>