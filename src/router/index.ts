import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import FreteView from '@/views/Frete/Index.vue'
import CadastrarFreteView from '@/views/Frete/Cadastrar.vue'
import DetalharFreteView from '@/views/Frete/Detalhar.vue'
import DespesaDetailView from '@/views/Despesa/Detail.vue'
import DespesaView from '@/views/Despesa/Index.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
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
    },
    {
        path: '/despesa/:despesaId',
        name: 'Cadastrar nova despesa',
        component: DespesaDetailView
    },
    {
        path: '/despesa',
        name: 'Lista de despesas',
        component: DespesaView
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
