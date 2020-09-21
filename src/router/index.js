import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Usuarios from '../views/list/Usuarios.vue'
import Permissao from '../views/list/Permissao.vue'
import GrupoUsuario from '../views/list/GrupoUsuario.vue'
import UsuarioNovo from '../views/create/UsuarioNovo.vue'
import UsuarioEditar from '../views/edit/UsuarioEditar.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Usuarios',
    name: 'Usuarios',
    component: Usuarios
  },
  {
    path: '/Usuarios/Novo',
    name: 'Usuarios/Novo',
    component: UsuarioNovo
  },
  {
    path: '/Usuarios/Editar/:id',
    name: 'Usuario/Editar',
    component: UsuarioEditar
  },
  {
    path: '/Permissao',
    name: 'Permissao',
    component: Permissao
  },
  {
    path: '/GrupoUsuario',
    name: 'GrupoUsuario',
    component: GrupoUsuario
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
