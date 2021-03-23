<template>
  <!-- Tabla con los diferentes intervalos de tiempo de la jornada actual -->
<!--   <div class="q-gutter-xs">
    <q-table
      title="Jornadas"
      :data="datosTabla"
      hide-bottom
      :rows-per-page-options="[0]"
    />
  </div> -->

 <div class="q-pa-md">
    <q-table
      title="Jornadas"
      :data="datosTabla"
      row-key="inicio"
      :rows-per-page-options="[10]"
    >

      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th auto-width />
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td auto-width>
            <q-btn size="sm" color="accent" round dense @click="props.expand = !props.expand" :icon="props.expand ? 'remove' : 'add'" />
            <q-btn size="sm" color="red" round dense @click="borrar" icon="delete" />  
          </q-td>
          <q-td
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            {{ col.value }}
          </q-td>
          
        </q-tr>
        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%">
            <div class="text-left">
              <q-tr>
                <q-td v-for="inter in jornadas[4]">
                  <q-tr v-for="i in inter">
                    <q-td @click="borrar(i)">
                      {{ i.getFechaInicioAfecha() }} {{ i.getFechaInicioAhora() }} ---
                      {{ i.getFechaFinAfecha() }} {{ i.getFechaFinAhora() }}
                       [{{ i.getTiempoIntervaloString() }}]
                    </q-td>
                  </q-tr>
                </q-td>
              </q-tr>
            </div>
          </q-td>
        </q-tr>
      </template>

    </q-table>
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
      jornadas: ListaJornadas.app.arrayJornadas,

    };
  },
  //********************
  //Variables calculadas
  //********************
  computed: {
    //Contiene los datos para actulizar la tabla de jornadas
    datosTabla: function () {
      let vector = []; //Vector que usaremos para devolver el resultado
      for (let i = 0; i < ListaJornadas.app.arrayJornadas.length; i++) {
        vector.push({
          inicio: 
            FuncionesAuxiliares.obtenerFecha(ListaJornadas.app.arrayJornadas[i].arrayIntervalos[0].getFechaInicio()),
          inter: 
            ListaJornadas.app.arrayJornadas[i].arrayIntervalos.length,
          duracion:
            ListaJornadas.app.arrayJornadas[i].getDuracionJornada()
        });
      }

      return vector;
    },
  },

  //********************
  // Métodos
  //********************
  methods: {
    borrar: function(i){
      
      alert(i.getTiempoIntervaloString())
    }
  },

  created: function () {
    //console.log(ListaJornadas.app);
  },
};
</script>