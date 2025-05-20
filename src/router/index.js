import { createRouter, createWebHashHistory } from 'vue-router';

export const routes = [
  {
    path: '/',
    component: () => import('@/layout/DefaultLayout.vue'),
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/HomeView.vue'),
      },
      {
        path: 'game',
        name: 'Game',
        component: () => import('@/views/GameView.vue'),
      },
    ],
  },
  { path: '/:pathMatch(.*)*', redirect: { name: 'Home', params: {} } },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
