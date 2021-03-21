<template>
    <q-page>
        <tabla-jornadas/>
    </q-page>
</template>
<script>
import TablaJornadas from 'src/components/TablaJornadas.vue';
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
        'tabla-jornadas': TablaJornadas
    }
};
</script>