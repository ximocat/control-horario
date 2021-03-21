<template>
    <q-page>
        <botones-registro></botones-registro>
    </q-page>
</template>
<script>
import BotonesRegistro from 'src/components/BotonesRegistro.vue';
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
        'botones-registro': BotonesRegistro
    }
};
</script>