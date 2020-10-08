import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Usuarios from '../views/list/Usuarios.vue'
import Permissao from '../views/list/Permissao.vue'
import PermissaoUsuario from '../views/list/PermissaoUsuario.vue'
import PermissoesGrupoUsuario from '../views/list/PermissaoGrupoUsuario.vue'
import UsuarioGrupoUsuario from '../views/list/UsuarioGrupoUsuario.vue'
import Projetos from '../views/list/Projetos.vue'
import Tarefas from '../views/list/Tarefas.vue'
import GrupoUsuario from '../views/list/GrupoUsuario.vue'
import UsuarioNovo from '../views/create/UsuarioNovo.vue'
import PermissaoCadastro from '../views/create/PermissaoCadastro.vue'
import GrupoUsuarioCadastro from '../views/create/GrupoUsuarioCadastro.vue'
import UsuarioEditar from '../views/edit/UsuarioEditar.vue'
import GrupoUsuarioEditar from '../views/edit/GrupoUsuarioEditar.vue'
import PermissaoEditar from '../views/edit/PermissaoEditar.vue'
import Login from '../views/Login.vue'
import trocarSenha from '../views/perfil/trocarSenha.vue'
import NaoAutorizado from '../views/NaoAutorizado.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter(to, from, next) {

      if (TemToken()) {

        next();
      } else {
        next('/login');
      }
    }
  },
  {
    path: '/Projetos',
    name: 'Projetos',
    component: Projetos,
    beforeEnter(to, from, next) {
      /*
      if (TemToken()) {
        if (TemAutorizacao("acessarUsuario")) {
          next();
        }else{
          next("/NaoAutorizado");
        }
      } else {
        next('/login');
      }
      */ next();
    }
  },
  {
    path: '/Tarefas',
    name: 'Tarefas',
    component: Tarefas,
    beforeEnter(to, from, next) {
      /*
      if (TemToken()) {
        if (TemAutorizacao("acessarUsuario")) {
          next();
        }else{
          next("/NaoAutorizado");
        }
      } else {
        next('/login');
      }
      */ next();
    }
  },
  {
    path: '/Usuarios',
    name: 'Usuarios',
    component: Usuarios,
    beforeEnter(to, from, next) {
      if (TemToken()) {
        if (TemAutorizacao("acessarUsuario")) {
          next();
        }else{
          next("/NaoAutorizado");
        }
      } else {
        next('/login');
      }
    }
  },
  {
    path: '/GrupoUsuario/Novo',
    name: 'GrupoUsuario/Novo',
    component: GrupoUsuarioCadastro,
    beforeEnter(to, from, next) {
      /*
      if (TemToken()) {
        if (TemAutorizacao("acessarUsuario")) {
          next();
        }else{
          next("/NaoAutorizado");
        }
      } else {
        next('/login');
      }
      */ next();
    }
  },
  {
    path: '/GrupoUsuario/Editar/:id',
    name: 'GrupoUsuario/Editar',
    component: GrupoUsuarioEditar,
    beforeEnter(to, from, next) {
      /*
      if (TemToken()) {
        if (TemAutorizacao("acessarUsuario")) {
          next();
        }else{
          next("/NaoAutorizado");
        }
      } else {
        next('/login');
      }
      */ next();
    }
  },
  {
    path: '/Permissao/Novo',
    name: 'Permissao/Novo',
    component: PermissaoCadastro,
    beforeEnter(to, from, next) {
      /*
      if (TemToken()) {
        if (TemAutorizacao("acessarUsuario")) {
          next();
        }else{
          next("/NaoAutorizado");
        }
      } else {
        next('/login');
      }
      */ next();
    }
  },
  {
    path: '/Permissao/Editar/:id',
    name: 'Permissao/Editar',
    component: PermissaoEditar,
    beforeEnter(to, from, next) {
      /*
      if (TemToken()) {
        if (TemAutorizacao("acessarUsuario")) {
          next();
        }else{
          next("/NaoAutorizado");
        }
      } else {
        next('/login');
      }
      */ next();
    }
  },
  {
    path: '/PermissaoUsuario/:id',
    name: 'PermissõesUsuário',
    component: PermissaoUsuario,
    beforeEnter(to, from, next) {
      /*
      if (TemToken()) {
        if (TemAutorizacao("acessarPermissaoUsuario")) {
          next();
        }else{
          next("/NaoAutorizado");
        }
      } else {
        next('/login');
      }
      */next();
    }
  },
  
  {
    path: '/UsuarioGrupoUsuario/:id',
    name: 'Usuario/GrupoUsuario',
    component: UsuarioGrupoUsuario,
    beforeEnter(to, from, next) {
      /*
      if (TemToken()) {
        if (TemAutorizacao("acessarPermissaoUsuario")) {
          next();
        }else{
          next("/NaoAutorizado");
        }
      } else {
        next('/login');
      }
      */next();
    }
  },
  {
    path: '/PermissoesGrupoUsuario/:id',
    name: 'Permissões/GrupoUsuário',
    component: PermissoesGrupoUsuario,
    beforeEnter(to, from, next) {
      /*
      if (TemToken()) {
        if (TemAutorizacao("acessarPermissaoUsuario")) {
          next();
        }else{
          next("/NaoAutorizado");
        }
      } else {
        next('/login');
      }
      */next();
    }
  },
  {
    path: '/trocarSenha',
    name: 'Trocar Senha',
    component: trocarSenha,
    beforeEnter(to, from, next) {
      /*
      if (TemToken()) {
        if (TemAutorizacao("novoUsuario")) {
          next();
        }else{
          next("/NaoAutorizado");
        }
      } else {
        next('/login');
      }
      */next();
    }
  },
  {
    path: '/Usuarios/Novo',
    name: 'Usuarios/Novo',
    component: UsuarioNovo,
    beforeEnter(to, from, next) {
      /*
      if (TemToken()) {
        if (TemAutorizacao("novoUsuario")) {
          next();
        }else{
          next("/NaoAutorizado");
        }
      } else {
        next('/login');
      }
      */next();
    }
  },
  {
    path: '/Usuarios/Editar/:id',
    name: 'Usuario/Editar',
    component: UsuarioEditar,
    beforeEnter(to, from, next) {
      if (TemToken()) {
        if (TemAutorizacao("acessarUsuario")) {
          next();
        }else{
          next("/NaoAutorizado");
        }
      } else {
        next('/login');
      }
    }
  },
  {
    path: '/Permissao',
    name: 'Permissao',
    component: Permissao,
    beforeEnter(to, from, next) {
      if (TemToken()) {
        if (TemAutorizacao("acessarPermissao")) {
          next();
        }else{
          next("/NaoAutorizado");
        }
      } else {
        next('/login');
      }
    }
  },
  {
    path: '/GrupoUsuario',
    name: 'GrupoUsuario',
    component: GrupoUsuario,
    beforeEnter(to, from, next) {
      if (TemToken()) {
        if (TemAutorizacao("acessarGrupoUsuario")) {
          next();
        }else{
          next("/NaoAutorizado");
        }
      } else {
        next('/login');
      }
    }
  },

  {
    path: '/NaoAutorizado',
    name: 'NaoAutorizado',
    component: NaoAutorizado,
    beforeEnter(to, from, next) {
      if (TemToken()) {
          next();
      } else {
        next('/login');
      }
    }
  },
]

function TemToken() {
  if (localStorage.getItem("TokenJWT") === null) {
    //console.log("Não Tem Token")
    return false;
  } else {

    //console.log("Tem Token")
    return true;
  }
}

function TemAutorizacao(role) {
  //console.log(localStorage.getItem(role)+" teste");
  if (localStorage.getItem(role) === null) {
    //console.log("Não tem role");
    return false;

  } else {
    if (localStorage.getItem(role) == role) {
      //console.log("Tem Role")
      return true;
    } else {
      return false;
    }
  }
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


/*
router.beforeEach((to, from, next) => {
 
 if (TemToken()) {
   next('/login');
 }
 
 else{
   console.log("Caiu aqui")
   next()
 }
 
})
*/
export default router
