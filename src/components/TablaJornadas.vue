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
    return {
     
      
    };
  },
  //********************
  //Variables calculadas
  //********************
  computed: {
    //Contiene los datos para actulizar la tabla de intervalos de jornada
    datosTabla: function () {
      let vector = []; //Vector que usaremos para devolver el resultado

      
      for (let i = 0; i < ListaJornadas.app.arrayJornadas.length; i++) {
        vector.push({
          inicio:
            ListaJornadas.app.arrayJornadas[i].arrayIntervalos[0].fechaInicio,
          fin: 
            ListaJornadas.app.arrayJornadas[i].arrayIntervalos[0].fechaFin
        });
      }
      

      return vector;
    },
    
  },

  //********************
  // Métodos
  //********************
  methods: {
    
  },

  created: function(){
    console.log(ListaJornadas.app);
  }

  
};
</script>