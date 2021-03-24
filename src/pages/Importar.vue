<template>
  <q-page>
    <q-card
      class="q-mb-lg q-px-lg text-white bg-light-blue no-box-shadow text-center no-border-radius"
    >
      <q-card-section>
        <h6>
          Para importar/exportar a un archivo que contenga las jornadas
          pulsa en el botón correspondiente
        </h6>
        <div class="">
          <q-btn @click="exportarArchivo" color="primary" label="Exportar a archivo" />
          <q-btn @click="importarArchivo" color="primary" label="Importar desde archivo" />
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
import ListaJornadas from 'src/clases/ListaJornadas';

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
    exportarArchivo: function(){
        FuncionesAuxiliares.exportar(ListaJornadas.app)
    },
    importarArchivo: function(){
        FuncionesAuxiliares.importar()

    },

    
  }
};
</script>