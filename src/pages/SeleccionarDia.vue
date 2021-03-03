<template>
    <q-page>
        <div class="row justify-center">
             <div class="q-pa-md">
    <div class="q-gutter-sm">
      <q-badge >
        Model: {{ model }}
      </q-badge>
    </div>

    <div class="q-gutter-md row items-start">
      <q-date v-model="model" mask="YYYY-MM-DD HH:mm" />
      <q-time v-model="model" format24h/>
    </div>
  </div>
        </div>

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

    }
}
</script>