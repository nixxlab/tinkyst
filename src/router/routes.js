
const routes = [
  {
    path: '/',
    component: () => import('layouts/main.vue'),
    children: [
      { path: '', component: () => import('pages/about.vue') },
      { path: 'about', component: () => import('pages/about.vue') },
      { path: 'settings', component: () => import('pages/settings.vue') },
    ]
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/error/404.vue')
  }
]

export default routes
