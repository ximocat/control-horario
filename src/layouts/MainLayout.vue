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
    </q-header>
    
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered content-class="bg-grey-1">
      <q-list>
        <q-item-label header class="text-grey-8">Menú</q-item-label>
        
        
        <!-- Introducir Jornada -->
        <q-item clickable to="IntroJornada">
          <q-item-section avatar>
            <q-icon name="input"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Jornada</q-item-label>
            <q-item-label caption>Introducir Jornada</q-item-label>
          </q-item-section>
        </q-item>

        <!-- Listar Jornadas -->
        <q-item clickable to="EditJornadas">
          <q-item-section avatar>
            <q-icon name="edit"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Listado Jornadas</q-item-label>
            <q-item-label caption>Listar y Editar Jornadas</q-item-label>
          </q-item-section>
        </q-item>

        <!-- Estadisticas -->
        <q-item clickable to="Estadisticas">
          <q-item-section avatar>
            <q-icon name="query_stats"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Estadísticas</q-item-label>
            <q-item-label caption>Estadisticas/resumen de los datos de las jornadas</q-item-label>
          </q-item-section>
        </q-item>

        <!-- Introducir Jornada -->
        <q-item clickable to="Importar">
          <q-item-section avatar>
            <q-icon name="import_export"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Importar/Exportar</q-item-label>
            <q-item-label caption>Recuperar/Guardar datos de fuentes externas</q-item-label>
          </q-item-section>
        </q-item>

        <!-- Introducir Jornada -->
        <q-item clickable to="About">
          <q-item-section avatar>
            <q-icon name="code"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Sobre mí</q-item-label>
            <q-item-label caption>Sobre el autor de la aplicación</q-item-label>
          </q-item-section>
        </q-item>



      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
export default {
  name: 'MainLayout',
  //components: { EssentialLink },
  data () {
    return {
      leftDrawerOpen: false,
    //  essentialLinks: linksData
    }
  }
}
</script>
