<template>
  <Layout>
    <div class="card">
      <div class="card-header">
        <div class="row">
          <div class="col-2">
             <router-link to="/Usuarios/Novo" class="btn btn-success">Novo Usuário</router-link>
          </div>
          <div class="col-10">
            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                placeholder="Pesquisar Usuário"
                aria-label="Pesquisar Usuário"
                aria-describedby="basic-addon2"
              />
              <div class="input-group-append">
                <button class="btn btn-outline-secondary" >
                  Buscar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <table class="table table-hover table-striped table-sm">
        <thead class="thead-dark">
          <tr>
            <th>Código</th>
            <th>Nome</th>
            <th>Login</th>
            <th></th>
          </tr>
        </thead>
        <tbody v-if="this.dados.length >= 1">
          <tr v-for="(item, i) in this.dados" :key="i">
            <td>{{ item.id }}</td>
            <td>{{ item.nome }}</td>
            <td>{{ item.login }}</td>
            <td>
              <router-link
                :to="{ path: '/Usuarios/Editar/' + item.id }"
                @click="
                  () => {
                    console.log(item);
                  }
                "
                class="btn btn-sm btn-warning"
                style="margin: 0 5px"
              >
                <i class="pi pi-user-edit" />
                Editar
              </router-link>

              <router-link
                :to="{ path: '/PermissaoUsuario/' + item.id }"
                class="btn btn-sm btn-info"
                style="margin: 0 5px"
              >
                <i class="pi pi-user-edit" />
                Permissões
              </router-link>
              <router-link
                :to="{ path: '/UsuarioGrupoUsuario/' + item.id }"
                class="btn btn-sm btn-info"
                style="margin: 0 5px"
              >
                <i class="pi pi-users" />
                Grupos
              </router-link>
              <div v-if="item.ativo"
                @click="desativar(item)"
                class="btn btn-sm btn-primary"
                style="margin: 0 5px"
              >
                <i class="pi pi-eye pi-eye-slash" />
                Desativar
              </div>
               <div v-else
                @click="ativar(item)"
                class="btn btn-sm btn-primary"
                style="margin: 0 5px"
              >
                <i class="pi pi-eye pi-eye-slash" />
                Ativar
              </div>

              <div
                @click="removerUsuario(item)"
                class="btn btn-sm btn-danger"
                style="margin: 0 5px"
              >
                <i class="pi pi-trash" />
                Excluir
              </div>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="5" align="center">Nenhum usuário encontrado</td>
          </tr>
        </tbody>
      </table>
    </div>
  </Layout>
</template>

<script>
import Conexao from "../../Conexao.js";
import Toolbar from "primevue/toolbar";
import InputText from "primevue/inputtext";
import "../../../node_modules/primevue/resources/themes/saga-blue/theme.css"; //theme
import "../../../node_modules/primevue/resources/primevue.min.css"; //core css
import "../../../node_modules/primeicons/primeicons.css";
export default {
  data() {
    return {
      dados: [],
      dialogoExcluir: false,
      query: "",
    };
  },
  beforeCreated() {},
  mounted() {
   this.startData();
  },
  components: {},
  methods: {
    startData(){
 Conexao.get("/Usuarios")
      .then((resposta) => {
       
        if (resposta.data.isOk) {
          this.dados = resposta.data.dados;
        } else {
          console.log(resposta.data.mensagem);
        }
      })
      .catch((e) => {
         console.log(e.response);
         console.log(e.toJSON());
      
      });
    },
    removerUsuario(item) {
      Conexao.delete("/Usuarios/" + item.id)
        .then((resposta) => {
          if (resposta.data.isOk) {
            this.startData();
          } else {
            this.erro = true;
            this.mensagem = resposta.data.mensagem;
          }
        })
        .catch((error) => {
           this.erro = true;
            this.mensagem = error
        });
    },
    desativar(item) {
       Conexao
        .put("/Usuarios/desativaUsuario", {id:item.id})
        .then((response) => {
          if (response.data.isOk) {
            item.ativo = response.data.dados.ativo;
          }else{
              this.isOk = true;
              this.mensagem = response.data.mensagem
          }
        })
        .catch((e) => {
          this.erro = true;
          this.mensagem = "Catch: " + e;
        });
    },
    ativar(item) {
        Conexao
        .put("/Usuarios/ativaUsuario", {id:item.id})
        .then((response) => {
          if (response.data.isOk) {
            item.ativo = response.data.dados.ativo;
          }else{
              this.isOk = true;
              this.mensagem = response.data.mensagem
          }
        })
        .catch((e) => {
          this.erro = true;
          this.mensagem = "Catch: " + e;
        });
    },
    formatDate(date) {
      let month = date.getMonth() + 1;
      let day = date.getDate();

      if (month < 10) {
        month = "0" + month;
      }

      if (day < 10) {
        day = "0" + day;
      }

      return date.getFullYear() + "-" + month + "-" + day;
    },
  },
};
</script>

<style>
</style>