<template>
  <div class="row justify-center">
    <div class="q-pa-md">
      <div class="q-gutter-sm">
        <div class="row justify-center">
          <q-chip outline color="primary" text-color="white" size="xl" square>
            {{ diaSemanaActual }} {{ diaActual }} {{ horaActual }}
          </q-chip>
        </div>
        <q-space></q-space>

        <q-btn
          @click="iniciarJornada"
          icon="play_arrow"
          label="Inicia Jornada"
          stack
          glossy
          color="primary"
          id="btnInicio"
          :disabled="!activarBtnInicio"
        />
        <q-btn
          @click="finalizarJornada"
          icon="stop"
          label="Acaba Jornada"
          stack
          glossy
          color="red"
          id="btnFin"
          :disabled="!activarBtnFin"
        />
      </div>

      <div class="q-pa-md">
        <q-list bordered separators>
          <q-item v-for="f in fechasInicio" :key="f['hora']">
            {{ f["fecha"] }} , {{ f["hora"] }}
          </q-item>
        </q-list>
      </div>

      <div class="q-pa-md">
        <q-table
          title="Jornada de hoy"
          :data="{ fechasFin, fechasFin }"
          :columns="columns"
          row-key="name"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "botones-registro",
  data: function () {
    return {
      fechasInicio: [],
      fechasFin: [],
      fechaActual: null,
      activarBtnInicio: true,
      activarBtnFin: false,
      timer: null
    };
  },
  computed: {
    horaInicio: function () {
      return this.fechaInicio.toLocaleTimeString();
    },
    horaFin: function () {
      return this.fechaInicio.toLocaleTimeString();
    },
    diaActual: function () {
      return this.fechaActual.toLocaleDateString();
    },
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
    horaActual: function(){
      return this.fechaActual.toLocaleTimeString();
    },
  },
  methods: {
    iniciarJornada: function () {
      this.activarBtnInicio = false;
      this.activarBtnFin = true;

      this.fechasInicio.push(this.obtenerDiaHoraActual());
    },

    finalizarJornada: function () {
      this.activarBtnInicio = true;
      this.activarBtnFin = false;

      this.fechasFin.push(this.obtenerDiaHoraActual());
    },

    obtenerDiaHoraActual: function () {
      let ahora = new Date();

      let fechaHora = {
        fecha: ahora.toLocaleDateString(),
        hora: ahora.toLocaleTimeString(),
      };

      return fechaHora;
    },
    actualizarFecha: function(){
      this.fechaActual = new Date();
    }
  },
  created: function () {
    this.actualizarFecha();
  },
  mounted: function () {
    this.timer= setInterval(this.actualizarFecha,1000);
  },
  beforeDestroy: function () {
    clearTimeout(this.timer);
  },
};
</script>