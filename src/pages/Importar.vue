<template>
  <q-page>
    <q-card
      class="q-mb-lg q-px-lg text-white bg-light-blue no-box-shadow text-center no-border-radius"
    >
      <q-card-section>
        <h6>
          Para importar/exportar a un archivo CSV que contenga las jornadas
          pulsa en el botón correspondiente
        </h6>
        <div class="">
          <q-btn @click="exportarCSV" color="primary" label="Exportar a CSV" />
          <q-btn @click="importarCSV" color="primary" label="Importar desde CSV" />
          <q-space></q-space>
          <q-btn
            @click="borrarLocalStorage"
            color="red"
            label="Borrar Datos (localstorage)"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script>
import FuncionesAuxiliares from "src/clases/FuncionesAuxiliares";
export default {
  name: "PageIndex",
  data() {
    return {
      model: null,
    };
  },
  methods: {
    borrarLocalStorage: function () {
      if (
        confirm("Atención vas a borrar los datos actuales, ¿Quieres continuar?")
      ) {
        localStorage.clear();
        FuncionesAuxiliares.leerLocalStorage();
      }
    },
    exportarCSV: function(){
        
    },
    importarCSV: function(){

    }
  },
  components: {},
};
</script>