import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FreteView from '@/views/Frete/Index.vue'
import CadastrarFreteView from '@/views/Frete/Cadastrar.vue'
import DetalharFreteView from '@/views/Frete/Detalhar.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
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
    path: '/frete',
    name: 'Fretes',
    component: FreteView
  },
  {
    path: '/frete/cadastrar',
    name: 'Cadastrar novo frete',
    component: CadastrarFreteView
  },
  {
    path: '/frete/:Freteid',
    name: 'Detalhar frete',
    component: DetalharFreteView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
