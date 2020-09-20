<template>
  <Layout>
    <Toolbar>
      <template slot="left">
        <router-link :to="{ path: '/Usuarios/Novo/'}" class="btn btn-success">Novo Usuário</router-link>
      </template>

      <template slot="right">
        <span class="p-input-icon-left p-input-icon-right">
          <i class="pi pi-search" />
          <InputText type="text" v-model="query" />
          <i class="pi pi-spin pi-spinner" />
        </span>
      </template>
    </Toolbar>
    <br />
<table class="table table-hover table-striped table-sm">
  <thead class="thead-dark">
  <tr>
        <th>Código</th>
        <th>Nome</th>
        <th>Login</th>
        <th>Avatar</th>
        <th></th>
  </tr>
  </thead>
  <tbody v-if="dados.length > 1">
    <tr v-for="(item, i) in dados" :key="i">
        <td>{{item.id}}</td>
        <td>{{item.nome}}</td>
        <td>{{item.login}}</td>
        <td>{{item.avatar}}</td>
        <td>
           <router-link :to="{ path: '/Usuarios/Editar/'+ item.id}" @click="()=>{console.log(item)}" class="btn btn-sm btn-warning" style="margin:0 5px" >
            <i class="pi pi-user-edit" />
            Editar
          </router-link>
           <div @click="ativarDesativar(item.id)" class="btn btn-sm btn-primary" style="margin:0 5px">
            <i class="pi pi-eye pi-eye-slash" />
            Ativar Desativar Usuário
          </div>

           <div @click="dialogoExcluir = true" class="btn btn-sm btn-danger" style="margin:0 5px">
            <i class="pi pi-trash" />
            Excluir Usuário
          </div>
        </td>
    </tr>
   
  </tbody>
   <tbody v-else>
     <tr>
      <td>Nenhum usuario encontrado</td>
     </tr>
    </tbody>
</table>
<Paginator :rows="2" :totalRecords="dados.length"></Paginator>

  
  </Layout>
</template>

<script>
import Paginator from 'primevue/paginator';
import InputText from "primevue/inputtext";
import Conexao from "../Conexao.js";
import Toolbar from 'primevue/toolbar'
import "../../node_modules/primevue/resources/themes/saga-blue/theme.css"; //theme
import "../../node_modules/primevue/resources/primevue.min.css"; //core css
import "../../node_modules/primeicons/primeicons.css";
export default {
  data() {
    return {
      dados: [],
      dialogoExcluir: false,
      query: "",
    };
  },
  created() {
    Conexao.get("/Usuarios")
      .then((resposta) => {
        console.log(resposta);
        if (resposta.data.isOk) {
          this.dados = resposta.data.dados;
        } else {
          console.log(resposta.mensagem + " aqui");
        }
      })
      .catch((resposta) => {
        console.log(resposta);
      });
  },
  mounted() {
    this.loading = false;
  },
  components: {
    Paginator,
    Toolbar,
  
    InputText,
   
  },
  methods: {
    removerUsuario(id) {
      console.log(id);
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