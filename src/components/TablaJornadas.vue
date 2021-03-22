<template>
  <!-- Tabla con los diferentes intervalos de tiempo de la jornada actual -->
  <div class="q-gutter-xs">
    <q-table
      title="Jornadas"
      :data="datosTabla"
      hide-bottom
      :rows-per-page-options="[0]"
    />
  </div>
</template>

<script>
import FuncionesAuxiliares from "../clases/FuncionesAuxiliares.js";
import IntervaloJornada from "../clases/IntervaloJornada.js";
import JornadaTrabajo from "../clases/JornadaTrabajo.js";
import ListaJornadas from "../clases/ListaJornadas.js";

export default {
  name: "tabla-jornadas",
  //********************
  //Variables reactivas
  //********************
  data: function () {
    return {};
  },
  //********************
  //Variables calculadas
  //********************
  computed: {
    //Contiene los datos para actulizar la tabla de intervalos de jornada
    datosTabla: function () {
      let vector = []; //Vector que usaremos para devolver el resultado
      console.log(ListaJornadas.app);
      for (let i = 0; i < ListaJornadas.app.arrayJornadas.length; i++) {
        vector.push({
          inicio: 
            FuncionesAuxiliares.obtenerFecha(
              new Date(ListaJornadas.app.arrayJornadas[i].arrayIntervalos[0].fechaInicio)),
          intervalos: 
            ListaJornadas.app.arrayJornadas[i].arrayIntervalos.length,
          duracion:
            this.calcularDuracionJornada(ListaJornadas.app.arrayJornadas[i])
        });
      }

      return vector;
    },
  },

  //********************
  // Métodos
  //********************
  methods: {
    calcularDuracionJornada: function (objetoJornada) {
      
      let jornada=new JornadaTrabajo();
      console.log(objetoJornada.arrayIntervalos.length);
      for (let i = 0;i < objetoJornada.arrayIntervalos.length; i++) {
        jornada.addIntervaloJornada(
          new IntervaloJornada(new Date(objetoJornada.arrayIntervalos[i].fechaInicio),
          new Date(objetoJornada.arrayIntervalos[i].fechaFin)));
      }
      console.log(jornada);
      return jornada.getDuracionJornada();
      
    },
  },

  created: function () {
    //console.log(ListaJornadas.app);
  },
};
</script>