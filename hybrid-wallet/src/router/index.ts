import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import SplashView from '../views/SplashView.vue';
import ImportView from '../views/ImportView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'splash',
      component: SplashView
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/import',
      name: 'import',
      component: ImportView
    }
  ]
});

export default router;
