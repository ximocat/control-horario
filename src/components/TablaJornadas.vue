<template>
  <div class="q-pa-md q-gutter-sm">
    <q-table
      title="Jornadas"
      :data="data"
      :columns="columns"
      row-key="name"
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
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Fecha',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'horas', align: 'center', label: 'Horas', field: 'horas', sortable: true },
      ],
      data: [
        {
          name: 'Frozen Yogurt',
          horas: 159,
        },
        {
          name: 'Ice cream sandwich',
          horas: 237,
        },
        {
          name: 'Eclair',
          horas: 262,
        },
        {
          name: 'Cupcake',
          horas: 305,
        }
      ]
      
      
    };
  },
  //********************
  //Variables calculadas
  //********************
  computed: {
    
  },

  //********************
  // Métodos
  //********************
  methods: {
    
  },

  
};
</script>