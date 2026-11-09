import { createRouter, createWebHistory } from 'vue-router'
import SmartWater from '@/views/SmartWater.vue'
import LoginPage from '@/views/LoginPage.vue'
import AdminView from '@/views/AdminView.vue'
const routes = [
  
  {
    path: '/smartwater',
    name: 'SmartWater',
    component: SmartWater
  },
  
  {
    path: '/',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
{
    path: '/admin',
    name: 'admin',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: AdminView
}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
