<template>
    <q-page>
        <resumen/>
    </q-page>
</template>
<script>

import Resumen from 'src/components/Resumen.vue'

export default {
    name: "PageIndex",
  
        data() {
            return{

            };
    },
    methods: {

    },
    components: {
        'resumen': Resumen
        
    }
};
</script>