import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import('@/components/Home.vue');

const routes = [
  { path: '/', name: 'Home', component: Home },
  // Old OAuth callback path — silently redirect home so any
  // in-flight or bookmarked links from the old flow don't 404.
  { path: '/auth/callback', redirect: '/' },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
