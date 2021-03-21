
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IntroJornada.vue') },
      { path: 'IntroJornada', component: () => import('pages/IntroJornada.vue') }, 
      { path: 'EditJornadas', component: () => import('pages/EditJornadas.vue') },
      { path: 'Estadisticas', component: () => import('pages/Estadisticas.vue') },
      { path: 'Importar', component: () => import('pages/Importar.vue') },
      { path: 'About', component: () => import('pages/About.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
