<template>
  <div
    class="page-wrapper chiller-theme"
    v-bind:class="{ toggled: this.toggle }"
  >
    <div id="show-sidebar" class="btn btn-sm btn-dark" @click="toggleSidebar">
      <i class="fas fa-bars"></i>
    </div>
    <nav id="sidebar" class="sidebar-wrapper">
      <div class="sidebar-content">
        <div class="sidebar-brand">
          <a href="#">Sistema</a>
          <div id="close-sidebar" @click="toggleSidebar">
            <i class="fas fa-times"></i>
          </div>
        </div>
        <div class="sidebar-header">
          <div class="user-pic">
            <img
              class="img-responsive img-rounded"
              src="https://raw.githubusercontent.com/azouaoui-med/pro-sidebar-template/gh-pages/src/img/user.jpg"
              alt="User picture"
            />
          </div>
          <div class="user-info">
           
            <span class="user-name">
              {{ this.nome }}
            </span>
             <router-link to="/trocarSenha">
            <span class="user-role">
              <i class="fa fa-user"></i>
              Perfil
            </span>
            </router-link>
            <span class="user-status">
              <i class="fa fa-sign-out-alt"></i>
              <span @click="logoff" style="cursor: pointer">Logoff</span>
            </span>
          </div>
        </div>
        <!-- sidebar-header  -->

        <div class="sidebar-menu">
          <ul>
             <itemMenu
              texto="Meus Projetos"
              path="/"
              icone="fa fa-project-diagram"
              
            />
          
             <itemMenu
              v-if="this.verificaMenu('AcessarProjetos')"
              texto="Projetos"
              path="/Projetos"
              icone="fa fa-project-diagram"
              
            />
           
             <itemMenu
              v-if="this.verificaMenu('AcessarTarefas')"
              texto="Tarefas"
              path="/Tarefas"
              icone="fa fa-tasks"
              
            />
             <itemMenu
              v-if="this.verificaMenu('AcessarRelatorios')"
              texto="Relatórios"
              path="/Relatorios"
              icone="fa fa-clipboard"
              
            />
              <itemMenu
              v-if="this.verificaMenu('AcessarUsuarios')"
              texto="Usuários"
              path="/Usuarios"
              icone="fa fa-user"
            />
           
            <itemMenu
             v-if="this.verificaMenu('AcessarPermissao')"
              texto="Permissões"
              path="/Permissao"
              icone="fa fa-user-cog"
            />
            <itemMenu
             v-if="this.verificaMenu('AcessarGrupoUsuario')"
              texto="Grupos de Usuários"
              path="/GrupoUsuario"
              icone="fa fa-user-cog"
            />

          </ul>
        </div>
        <!-- sidebar-menu  -->
      </div>
      <!-- sidebar-content  -->
      <div class="sidebar-footer">
         <!--
        <a href="#">
          <i class="fa fa-bell"></i>
          <span class="badge badge-pill badge-warning notification">3</span>
        </a>
        <a href="#">
          <i class="fa fa-envelope"></i>
          <span class="badge badge-pill badge-success notification">7</span>
        </a>
        <a href="#">
          <i class="fa fa-cog"></i>
          <span class="badge-sonar"></span>
        </a> -->
        <a  @click="logoff" title="Sair do Sistema" >
          <i class="fa fa-power-off"></i>
        </a>
      </div>
    </nav>
    <main class="page-content">
      <div class="container-fluid">
       
        <slot />

        <footer class="text-center">
          <div class="mb-2">
            <small>  </small>
          </div>
        </footer>
      </div>
    </main>
  </div>
</template>

<script>
import itemMenu from "./components/itemMenu";
import Conexao from "./Conexao";
export default {
  data() {
    return {
      home: { icon: "pi pi-home", to: "/" },
      nome: sessionStorage.getItem("Nome"),
      email: "",
      login: sessionStorage.getItem("Login"),
      usuarioId: sessionStorage.getItem("UsuarioId"),
      items: [],
      toggle: true,
    };
  },
  mounted: function () {
    this.createBreadcrumb();
    //console.log(sessionStorage)
    
  },
  methods: {
    toggleSidebar() {
      this.toggle = !this.toggle;
    },
    createBreadcrumb() {
      let rota = this.$route.name.split("/");
      for (let i = 0; i < rota.length; i++) {
        this.items.push({ label: rota[i] });
      }
    },
    logoff() {
      sessionStorage.clear();
      localStorage.clear();

      window.location.reload(true);
       //this.$router.push("/login");
     
    },
    verificaMenu(nomeRole) {
      if (sessionStorage.getItem(nomeRole) === null) {
        //console.log(nomeRole+" | false")
        return false;
      }else{
         //console.log(nomeRole+" | true")
      return true;
      }
    },
  },
  components: {
    itemMenu,
  },
};

/*
 {{/*

 <!-- sidebar-search  -->
   <div class="sidebar-search">
          <div>
            <div class="input-group">
              <input type="text" class="form-control search-menu" placeholder="Search..." />
              <div class="input-group-append">
                <span class="input-group-text">
                  <i class="fa fa-search" aria-hidden="true"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
        <!-- sidebar-search  -->
            <li class="sidebar-dropdown">
              <a @click="abreMenu">
                <i class="fa fa-tachometer-alt"></i>
                <span>Dashboard</span>
                <span class="badge badge-pill badge-warning">New</span>
              </a>
              <div class="sidebar-submenu" v-bind:style="{display: display}">
                <ul>
                  <itemMenu texto="Home" path="/" />
                  <itemMenu texto="Casa" path="/casa" />
                  <itemMenu texto="Apartamento" path="/apartamento" />
                </ul>
              </div>
            </li>
            <li class="sidebar-dropdown">
              <a href="#">
                <i class="fa fa-shopping-cart"></i>
                <span>E-commerce aaa</span>
                <span class="badge badge-pill badge-danger">3</span>
              </a>
              <div class="sidebar-submenu">
                <ul>
                  <li>
                    <a href="#">Products</a>
                  </li>
                  <li>
                    <a href="#">Orders</a>
                  </li>
                  <li>
                    <a href="#">Credit cart</a>
                  </li>
                </ul>
              </div>
            </li>
            <li class="sidebar-dropdown">
              <a href="#">
                <i class="far fa-gem"></i>
                <span>Components</span>
              </a>
              <div class="sidebar-submenu">
                <ul>
                  <li>
                    <a href="#">General</a>
                  </li>
                  <li>
                    <a href="#">Panels</a>
                  </li>
                  <li>
                    <a href="#">Tables</a>
                  </li>
                  <li>
                    <a href="#">Icons</a>
                  </li>
                  <li>
                    <a href="#">Forms</a>
                  </li>
                </ul>
              </div>
            </li>
            <li class="sidebar-dropdown">
              <a href="#">
                <i class="fa fa-chart-line"></i>
                <span>Charts</span>
              </a>
              <div class="sidebar-submenu">
                <ul>
                  <li>
                    <a href="#">Pie chart</a>
                  </li>
                  <li>
                    <a href="#">Line chart</a>
                  </li>
                  <li>
                    <a href="#">Bar chart</a>
                  </li>
                  <li>
                    <a href="#">Histogram</a>
                  </li>
                </ul>
              </div>
            </li>
            <li class="sidebar-dropdown">
              <a href="#">
                <i class="fa fa-globe"></i>
                <span>Maps</span>
              </a>
              <div class="sidebar-submenu">
                <ul>
                  <li>
                    <a href="#">Google maps</a>
                  </li>
                  <li>
                    <a href="#">Open street map</a>
                  </li>
                </ul>
              </div>
            </li>
            <li class="header-menu">
              <span>Extra</span>
            </li>
            <li>
              <a href="#">
                <i class="fa fa-book"></i>
                <span>Documentation</span>
                <span class="badge badge-pill badge-primary">Beta</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i class="fa fa-calendar"></i>
                <span>Calendar</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i class="fa fa-folder"></i>
                <span>Examples</span>
              </a>
            </li>
            <itemMenu texto="teste" path="/teste" />
            */
</script>

<style>
</style>