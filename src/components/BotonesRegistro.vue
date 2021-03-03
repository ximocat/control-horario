<template>
  <div class="row justify-center">
    <div class="q-pa-md">
      <div class="q-gutter-sm">
        <div class="row justify-center">
          <q-chip outline color="primary" text-color="white" size="xl" square>
            {{ diaSemanaActual }} {{ diaActual }}
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
        />
        <q-btn
          @click="finalizarJornada"
          icon="stop"
          label="Acaba Jornada"
          stack
          glossy
          color="red"
        />
      </div>
        
      <div class="q-pa-md">
          <q-list bordered separators>
              <q-item v-for="f in fechasInicio" :key="f['hora']">
                  {{ f['fecha'] }} ,{{ f['hora'] }}
              </q-item>
          </q-list>
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
      fechaActual: null
    };
  },
  computed: {
    horaInicio: function() {
      return this.fechaInicio.toLocaleTimeString();
    },
    horaFin: function() {
      return this.fechaInicio.toLocaleTimeString();
    },
    diaActual: function(){
        return (this.fechaActual.toLocaleDateString());
    },
    diaSemanaActual: function(){
        switch (this.fechaActual.getDay()){
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
    }
  },
  methods: {
    iniciarJornada: function () {
        let ahora=new Date();
        let fechaHora= {
            'fecha': ahora.toLocaleDateString(),
            'hora': ahora.toLocaleTimeString()
        };
      this.fechasInicio.push(fechaHora);
    },
    finalizarJornada: function () {
      this.fechasFin.push(new Date());
    },
    
    
  },
  created: function(){
      this.fechaActual=new Date();
  }
};
</script>