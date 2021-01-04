<template>
  <Layout>
   
        <div class="card">
        <div class="card-header">
           <div class="row">
              <div class="col-3">
                <router-link to="/GrupoUsuario/Novo" class="btn btn-success">
                  Novo Grupo
                </router-link>
              </div>
              <div class="col-9">
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Digite aqui sua pesquisa"
                    v-model="query"
                    v-on:input="pesquisar()"
                    aria-label="Digite aqui sua pesquisa"
                    aria-describedby="basic-addon2"
                  />

                  <div class="input-group-append">
                    <button
                      class="btn btn-outline-primary"
                      v-on:click="pesquisar()"
                      type="button"
                    >
                      Pesquisar
                    </button>
                  </div>
                </div>
              </div>
            </div>
        </div>
          
           
              <div class="alert alert-danger offset-md-3 col-md-7" v-if="this.erro == true">
                {{ this.mensagem }}
              </div>
           
            <table class="table table-hover table-striped table-sm">
              <thead class="thead-dark">
                <tr>
                  <th>Id</th>
                  <th>Nome</th>
                  <th></th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody v-if="this.dados.length >= 1">
                <tr v-for="(item, i) in this.dados" :key="i">
                  <td>{{ item.id }}</td>
                  <td>{{ item.nome }}</td>
                  <td>
                    <router-link
                      :to="{ path: '/GrupoUsuario/Editar/' + item.id }"
                      class="btn btn-warning"
                    >
                      Editar
                    </router-link>
                  </td>
                  <td>
                    <router-link
                      :to="{ path: '/PermissoesGrupoUsuario/' + item.id }"
                      class="btn btn-primary"
                    >
                      Permissões
                    </router-link>
                  </td>
                  <td>
                    <button class="btn btn-danger" @click="excluir(item)">
                     <i class="fa fa-trash" ></i>  Excluir
                    </button>
                  </td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr>
                  <td colspan="5" align="center">Nenhum usuario encontrado</td>
                </tr>
              </tbody>
            </table>
         
        </div>
    
   
   
  </Layout>
</template>

<script>
import Conexao from "../../Conexao.js";
export default {
  data() {
    return {
      dados: [],
      query: "",
      mensagem: "",
      erro: false,
    };
  },
  mounted() {
    this.startData();
  },
  components: {},
  methods: {
    pesquisar() {
      if (this.query == "") {
        this.startData();
      } else {
        Conexao.get("/GrupoUsuario/PesquisarGrupoUsuario/" + this.query).then(
          (resposta) => {
            if (resposta.data.isOk) {
              this.dados = resposta.data.dados;
            } else {
              this.mensagem = resposta.data.mensagem;
              this.erro = true;
            }
          }
        );
      }
    },
    excluir(item) {
      
      Conexao.delete("/GrupoUsuario/" + item.id)
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
            this.mensagem = error;
        });
    },
    startData() {
      Conexao.get("/GrupoUsuario")
        .then((resposta) => {
          if (resposta.data.isOk) {
            this.dados = resposta.data.dados;
          } else {
            console.log(resposta.data.mensagem);
          }
        })
        .catch((resposta) => {
          this.mensagem = resposta.data.mensagem;
          this.erro = true;
        });
    },
  },
};
</script>

<style>
</style>