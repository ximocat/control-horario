<template>
  <div id="chart">
    <apexchart :options="chartOptions" height="280" :series="series" />
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
    return {};
  },
  //********************
  //Variables calculadas
  //********************
  computed: {
    series: function () {
      switch (this.$parent.tab) {
        case "semanal":
          return this.$parent.jornadas.obtenerDatosGraficaSemanal();
        case "mensual":
          return this.$parent.jornadas.obtenerDatosGraficaMensual();
        case "anual":
          return this.$parent.jornadas.obtenerDatosGraficaAnual();
        default:
          console.log("Algo ha fallado");
          return null;
      }
    },
    chartOptions: function () {
      return {
        colors: ["#00F", "#F00", "#0F0"],
        chart: {
          height: 280,
          stacked: true,
          type: "bar",
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: true,
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
          offsetY: -20,
          style: {
            fontSize: "8px",
            colors: ["#304758"],
          },
        },

        xaxis: {
          categories: this.valoresEje,
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
      };
    },
    //Titulo de las unidades del eje x
    valoresEje: function () {
      switch(this.$parent.tab){
        case "semanal": 
          return ["lun", "mar", "mie", "jue", "vie", "sab", "dom"];
        case "mensual":
          let array=[]
          let dias=FuncionesAuxiliares.diasMes();
          for (let i=1; i<=dias;i++){
            array.push(String(i));
          }
          return array;
        case "anual":
          return ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"]
      }
      
    },

    tab: function () {
      return this.$parent.tab;
    },

    horas: function () {
      return this.$parent.horas;
    },

    jornadas: function () {
      return this.$parent.jornadas;
    },
  },

  //********************
  // Métodos
  //********************
  methods: {},
  components: {
    apexchart: VueApexCharts,
  },
};
</script>