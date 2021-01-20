import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Usuarios from '../views/list/Usuarios.vue'
import Permissao from '../views/list/Permissao.vue'
import PermissaoUsuario from '../views/list/PermissaoUsuario.vue'
import PermissoesGrupoUsuario from '../views/list/PermissaoGrupoUsuario.vue'
import UsuarioGrupoUsuario from '../views/list/UsuarioGrupoUsuario.vue'
import Projetos from '../views/list/Projetos.vue'
import ProjetosNovo from '../views/create/ProjetosCadastro.vue'
import ProjetosEditar from '../views/edit/ProjetosEditar.vue'
import ProjetosTarefas from '../views/list/ProjetosTarefas.vue'
import TarefaCadastro from '../views/create/TarefaCadastro.vue'
import TarefaEditar from '../views/edit/TarefaEditar.vue'

import Relatorios from '../views/list/Relatorios.vue'
import RegistroEditar from '../views/edit/RegistroEditar.vue'
import Tarefas from '../views/list/Tarefas.vue'
import GrupoUsuario from '../views/list/GrupoUsuario.vue'
import UsuarioNovo from '../views/create/UsuarioNovo.vue'
import PermissaoCadastro from '../views/create/PermissaoCadastro.vue'
import GrupoUsuarioCadastro from '../views/create/GrupoUsuarioCadastro.vue'
import UsuarioEditar from '../views/edit/UsuarioEditar.vue'
import EditarSenhaUsuario from '../views/edit/EditarSenhaUsuario.vue'

import GrupoUsuarioEditar from '../views/edit/GrupoUsuarioEditar.vue'
import PermissaoEditar from '../views/edit/PermissaoEditar.vue'
import Login from '../views/Login.vue'
import trocarSenha from '../views/perfil/trocarSenha.vue'



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
    path: '/Relatorios',
    name: 'Relatorios',
    component: Relatorios,
    beforeEnter(to, from, next) {
      if (TemToken()) {
        if (TemAutorizacao("AcessarRelatorios")) {
          next();
        }else{
          alert("Sem permissão para acessar.")
        }
      } else {
        next('/login');
      }

    }
  },
  {
    path: '/Registros/Editar/:id',
    name: 'Registros/Editar',
    component: RegistroEditar,
    beforeEnter(to, from, next) {
      if (TemToken()) {
        if (TemAutorizacao("EditarRegistro")) {
          next();
        }else{
          alert("Sem permissão para acessar.")
        }
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
     
      if (TemToken()) {
        if (TemAutorizacao("AcessarProjetos")) {
          next();
        }else{
          alert("Sem permissão para acessar.")
        }
      } else {
        next('/login');
      }
      
    }
  },
  {
    path: '/Projetos/Novo',
    name: 'Projetos/Novo',
    component: ProjetosNovo,
    beforeEnter(to, from, next) {
      
      if (TemToken()) {
        if (TemAutorizacao("CadastrarProjeto")) {
          next();
        }else{
          alert("Sem permissão para acessar.")
        }
      } else {
        next('/login');
      }
      
    }
  },
  {
    path: '/Projetos/Editar/:id',
    name: 'Projetos/Editar',
    component: ProjetosEditar,
    beforeEnter(to, from, next) {
     
      if (TemToken()) {
        if (TemAutorizacao("EditarProjeto")) {
          next();
        }else{
          alert("Sem permissão para acessar.")
        }
      } else {
        next('/login');
      }
     
    }
  },

  {
    path: '/Projetos/Tarefas/:id',
    name: 'ProjetosTarefas',
    component: ProjetosTarefas,
    beforeEnter(to, from, next) {
      
      if (TemToken()) {
        if (TemAutorizacao("ListarTarefasProjeto")) {
          next();
        }else{
          alert("Sem permissão para acessar.")
        }
      } else {
        next('/login');
      }
      
    }
  },
  {
    path: '/Tarefas/',
    name: 'Tarefas/',
    component: Tarefas,
    beforeEnter(to, from, next) {
      
      if (TemToken()) {
        if (TemAutorizacao("AcessarTarefas")) {
          next();
        }else{
          alert("Sem permissão para acessar.")
        }
      } else {
        next('/login');
      }
       next();
    }
  },
  {
    path: '/Tarefas/Novo',
    name: 'Tarefas/Nova',
    component: TarefaCadastro,
    beforeEnter(to, from, next) {
     
      if (TemToken()) {
        if (TemAutorizacao("CadastrarTarefa")) {
          next();
        }else{
          alert("Sem permissão para acessar.")
        }
      } else {
        next('/login');
      }
      
    }
  },
  {
    path: '/Tarefas/Editar/:id',
    name: 'Tarefas/Editar',
    component: TarefaEditar,
    beforeEnter(to, from, next) {
      
      if (TemToken()) {
        if (TemAutorizacao("EditarTarefa")) {
          next();
        }else{
          alert("Sem permissão para acessar.")
        }
      } else {
        next('/login');
      }
      
    }
  },
  {
    path: '/Tarefas/Novo/:id',
    name: 'Tarefas/Projeto/Novo',
    component: TarefaCadastro,
    beforeEnter(to, from, next) {
     
      if (TemToken()) {
        if (TemAutorizacao("CadastrarTarefa")) {
          next();
        }else{
          alert("Sem permissão para acessar.")
        }
      } else {
        next('/login');
      }
      
    }
  },
  {
    path: '/Usuarios',
    name: 'Usuarios',
    component: Usuarios,
    beforeEnter(to, from, next) {
      if (TemToken()) {
        if (TemAutorizacao("AcessarUsuarios")) {
          next();
        } else {
          alert("Sem permissão para acessar.")
        }
      } else {
        next('/login');
      }
    }
  },
  {
    path: '/Usuarios/AlterarSenha/:id',
    name: 'Usuarios/Alterar Senha',
    component: EditarSenhaUsuario,
    beforeEnter(to, from, next) {
      if (TemToken()) {
        if (TemAutorizacao("AlterarSenhaUsuario")) {
          next();
        } else {
          alert("Sem permissão para acessar.")
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
      
      if (TemToken()) {
        if (TemAutorizacao("CadastrarGrupoUsuario")) {
          next();
        }else{
          alert("Sem permissão para acessar.")
        }
      } else {
        next('/login');
      }
      
    }
  },
  {
    path: '/GrupoUsuario/Editar/:id',
    name: 'GrupoUsuario/Editar',
    component: GrupoUsuarioEditar,
    beforeEnter(to, from, next) {
      
      if (TemToken()) {
        if (TemAutorizacao("EditarGrupoUsuario")) {
          next();
        }else{
          alert("Sem permissão para acessar.")
        }
      } else {
        next('/login');
      }
      
    }
  },
  {
    path: '/Permissao/Novo',
    name: 'Permissao/Novo',
    component: PermissaoCadastro,
    beforeEnter(to, from, next) {
      
      if (TemToken()) {
        if (TemAutorizacao("CadastrarPermissao")) {
          next();
        }else{
          alert("Sem permissão para acessar.")
        }
      } else {
        next('/login');
      }
      
    }
  },
  {
    path: '/Permissao/Editar/:id',
    name: 'Permissao/Editar',
    component: PermissaoEditar,
    beforeEnter(to, from, next) {
      
      if (TemToken()) {
        if (TemAutorizacao("EditarPermissao")) {
          next();
        }else{
          alert("Sem permissão para acessar.")
        }
      } else {
        next('/login');
      }
      
    }
  },
  {
    path: '/PermissaoUsuario/:id',
    name: 'PermissõesUsuário',
    component: PermissaoUsuario,
    beforeEnter(to, from, next) {
      
      if (TemToken()) {
        if (TemAutorizacao("AtribuirPermissaoUsuario")) {
          next();
        }else{
          alert("Sem permissão para acessar.")
        }
      } else {
        next('/login');
      }
      
    }
  },

  {
    path: '/UsuarioGrupoUsuario/:id',
    name: 'Usuario/GrupoUsuario',
    component: UsuarioGrupoUsuario,
    beforeEnter(to, from, next) {
      
      if (TemToken()) {
        if (TemAutorizacao("AtribuirUsuarioGrupoUsuario")) {
          next();
        }else{
          alert("Sem permissão para acessar.")
        }
      } else {
        next('/login');
      }
      
    }
  },
  {
    path: '/PermissoesGrupoUsuario/:id',
    name: 'Permissões/GrupoUsuário',
    component: PermissoesGrupoUsuario,
    beforeEnter(to, from, next) {
     
      if (TemToken()) {
        if (TemAutorizacao("AtribuirPermissaoGrupoUsuario")) {
          next();
        }else{
          alert("Sem permissão para acessar.")
        }
      } else {
        next('/login');
      }
     
    }
  },
  {
    path: '/trocarSenha',
    name: 'Trocar Senha',
    component: trocarSenha,
    beforeEnter(to, from, next) {
      if (TemToken()) {
       next()
      } else {
        next('/login');
      }
    }
  },
  {
    path: '/Usuarios/Novo',
    name: 'Usuarios/Novo',
    component: UsuarioNovo,
    beforeEnter(to, from, next) {
     
      if (TemToken()) {
        if (TemAutorizacao("CadastrarUsuario")) {
          next();
        }else{
          alert("Sem permissão para acessar.")
        }
      } else {
        next('/login');
      }
      
    }
  },
  {
    path: '/Usuarios/Editar/:id',
    name: 'Usuario/Editar',
    component: UsuarioEditar,
    beforeEnter(to, from, next) {
      if (TemToken()) {
        if (TemAutorizacao("EditarUsuario")) {
          console.log(to);
          console.log(from);
          console.log(next);
          next();
        } else {
          alert("Sem permissão para acessar.")
          console.log(to);
          console.log(from);
          console.log(next);
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
        if (TemAutorizacao("AcessarPermissao")) {
          next();
        } else {
          alert("Sem permissão para acessar.")
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
        if (TemAutorizacao("AcessarGrupoUsuario")) {
          next();
        } else {
          alert("Sem permissão para acessar.")
        }
      } else {
        next('/login');
      }
    }
  },

 
]

function TemToken() {
  if (sessionStorage.getItem("TokenJWT") === null) {
    
    return false;
  } else {

    
    return true;
  }
}


function TemAutorizacao(role) {
  //console.log(sessionStorage.getItem(role)+" teste");
  if (sessionStorage.getItem(role) === null) {
    //console.log("Não tem role");
    return false;

  } else {
    if (sessionStorage.getItem(role) == role) {
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



router.beforeEach((to, from, next) => {
  //console.log(TemToken());
  if (TemToken()) 
  {
    if (to.path.toLowerCase() == '/login') 
    {
        next('/')
    }
    else
    {
        next()
    }
  }
  else
  {
    if (to.path == '/login') 
    {
      next();
    } 
    else 
    {
      next('/login');
    }
  }

})

export default router
