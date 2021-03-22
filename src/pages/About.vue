<template>
    <q-page>
        <q-card
        class="q-mb-lg q-px-lg text-white bg-light-blue no-box-shadow text-center no-border-radius"
      >
         <q-card-section>
          <h6>Proyecto realizado para el módulo de Desarrollo Web en Entorno Cliente del CEEDCV 2020/21</h6>
          <a href="https://github.com/ximocat/control-horario">Repositorio público de la aplicación</a>
        </q-card-section>
        </q-card> 
    </q-page>
</template>
<script>

export default {
    name: "PageIndex",
  
        data() {
            return{
                etiqueta: '',
                texto: '',
                model: '',
            };
    },
    methods: {

    },
    components: {
        
    }
};
</script>