<template>
  <div id="chart">
    <apexchart :options="chartOptions" height="280" :series="series"/>
    {{tab}}{{horas}}
    
  </div>
</template>

<script>
import FuncionesAuxiliares from "../clases/FuncionesAuxiliares.js";
import IntervaloJornada from "../clases/IntervaloJornada.js";
import JornadaTrabajo from "../clases/JornadaTrabajo.js";
import ListaJornadas from "../clases/ListaJornadas.js";
import VueApexCharts from "vue-apexcharts";

export default {
  name: "grafico",
  //********************
  //Variables reactivas
  //********************
  data: function () {
    return {

      chartOptions: {
        colors: ['#00F','#F00','#0F0'],
        chart: {
          height: 280,
          stacked:true,
          type: "bar",
          toolbar: {
            show: false
          },
          zoom: {
            enabled: true
          },
          
        },
        plotOptions: {
          bar: {
            borderRadius: 0,
            dataLabels: {
              position: "top",
            },
            
          },
        },
        dataLabels: {
          enabled: false,
          /* formatter: function (val) {
            return val + "h";
          }, */
          offsetY: - 20,
          style: {
            fontSize: "8px",
            colors: ["#304758"],
          },
        },

        xaxis: {
          categories: ["lun", "mar", "mie", "jue", "vie", "sab", "dom"],
          position: "bottom",
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          crosshairs: {
            fill: {
              type: "gradient",
              gradient: {
                colorFrom: "#D8E3F0",
                colorTo: "#BED1E6",
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5,
              },
            },
          },
          tooltip: {
            enabled: true,
          },
        },
        yaxis: {
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: true,
            formatter: function (val) {
              return val + "h";
            },
          },
        },

        /* title: {
          text: "Jornadas semanal",
          floating: true,
          offsetY: 330,
          align: "center",
          style: {
            color: "#444",
          },
        }, */
      },
    };
  },
  //********************
  //Variables calculadas
  //********************
  computed: {
    series: function(){
      let datos=[{name: "Jornada",data: [8, 6.3, 8, 8, 8, 0, 0]},
        {name: "Exceso",data: [0.5, 0, 0, 0, 0, 0, 2]},
        {name: "Defecto",data: [0, 1.7, 0, 0, 0, 0, 0]}];
      return datos;
    },
    tab: function(){
      return this.$parent.tab;
    },

    horas: function(){
      return this.$parent.horas;
    },

    jornadas: function(){
      return this.$parent.jornadas;
    }
  },

  //********************
  // Métodos
  //********************
  methods: {},
  components: {
    'apexchart': VueApexCharts,
  },
};
</script>