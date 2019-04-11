
export default [
  {
    path: '/',
    component: () => import('layouts/default.vue'),
    children: [
      { path: '', component: () => import('pages/chart-view.vue') }
    ]
  },
  {
    path: '/chart-view',
    component: () => import('layouts/default.vue'),
    meta: { requires_category: true },
    children: [
      { path: '', component: () => import('pages/chart-view.vue') }
    ]
  },
  {
    path: '/pie-chart-view',
    meta: { requires_category: true },
    component: () => import('layouts/default.vue'),
    children: [
      { path: '', component: () => import('pages/pie-chart-view.vue') }
    ]
  },
  {
    path: '/administrator',
    component: () => import('pages/sign-in.vue')
  },
  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
