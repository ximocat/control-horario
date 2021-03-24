<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md" style="max-width: 600px">
      
      <q-tabs
        v-model="tab"
        no-caps
        class="bg-light-blue text-white shadow-2"
      >
        <q-tab name="semanal" label="Semanal" />
        <q-tab name="mensual" label="Mensual" />
        <q-tab name="anual" label="Anual" />
      </q-tabs>
      <q-card
        class="q-mb-lg q-px-lg text-white bg-light-blue no-box-shadow text-center no-border-radius"
      >
         <q-card-section>
          <h6>Resumen {{ tab }}</h6>
          <h6>Horas Realizadas: {{ horas }} </h6>
        </q-card-section>
        </q-card> 
    </div>
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
      tab: "semanal",
      jornadas: ListaJornadas.app,
      
      

    };
  },
  //********************
  //Variables calculadas
  //********************
  computed: {
/*     horasSemanales: function(){
      return this.jornadas.calcularHorasSemana();
    },
    horasMensuales: function(){
      return this.jorndas.calcularHorasMes();
    }, */

    horas: function(){
      if (this.tab==="semanal") return this.jornadas.calcularHorasSemana();
      if (this.tab==="mensual") return this.jornadas.calcularHorasMes();
      if (this.tab==="anual") return this.jornadas.calcularHorasAnyo();
    }
    
  },

  //********************
  // Métodos
  //********************
  methods: {
    
  }
};
</script>