import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import('@/components/Home.vue');
const AuthCallback = () => import('@/components/AuthCallback.vue');

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/auth/callback', name: 'AuthCallback', component: AuthCallback },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
