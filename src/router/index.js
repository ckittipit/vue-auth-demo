import { createRouter, createWebHistory } from 'vue-router'
import RegisterPage from '../views/RegisterPage.vue'
import LoginPage from '../views/LoginPage.vue'
import SuccessPage from '../views/SuccessPage.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/register', component: RegisterPage },
  { path: '/login', component: LoginPage },
  { path: '/success', component: SuccessPage, meta: { requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to) => {
  const token = localStorage.getItem('token')
  if (to.meta.requiresAuth && !token) return '/login'
})

export default router