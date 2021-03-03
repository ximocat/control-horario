<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Control de la Jornada
        </q-toolbar-title>

      </q-toolbar>
      <div>
        <!-- <botones-registro></botones-registro> -->
      </div>
    </q-header>
    
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Menú
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

const linksData = [
  {
    title: 'Usuario',
    caption: 'Gestión del usuario',
    icon: 'manage_accounts',
    link: ''
  },
  {
    title: 'Jornada',
    caption: 'Introducción de la jornada',
    icon: 'input',
    link: ''
  },
  {
    title: 'Informes',
    caption: 'Resumenes de los datos de la jornada',
    icon: 'auto_graph',
    link: ''
  },
  {
    title: 'Importar/Exportar',
    caption: 'Recuperar/Guardar datos de fuentes externas',
    icon: 'import_export',
    link: ''
  },
  {
    title: 'Alarmas',
    caption: 'Programar alarmas para inicio/fin jornada',
    icon: 'access_alarm',
    link: ''
  },
  {
    title: 'About',
    caption: 'Repositorio público',
    icon: 'code',
    link: 'https://github.com/ximocat/control-horario'
  }
];

export default {
  name: 'MainLayout',
  components: { EssentialLink },
  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData
    }
  }
}
</script>
