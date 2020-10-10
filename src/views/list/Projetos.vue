<template>
  <Layout>
    
        <div class="card">
          <div class="card-header">
            <div class="row">
              <div class="col-3">
                <router-link to="/Projetos/Novo" class="btn btn-success">
                  Novo Projeto
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

          <div class="row">
            <div class="col-12">
              <table class="table table-hover table-striped table-sm">
                <thead class="thead-dark">
                  <tr>
                    <th>Id</th>
                    <th>Nome</th>
                    <th>Data Início</th>
                    <th>Data Término</th>
                    <th></th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody v-if="this.dados.length >= 1">
                  <tr v-for="(item, i) in this.dados" :key="i">
                    <td>{{ item.id }}</td>
                    <td>{{ item.nome }}</td>
                    <td>{{ item.inicio | formatDate }}</td>
                    <td>{{ item.termino | formatDate }}</td>
                    <td>
                      <router-link
                        :to="{ path: '/Projetos/Editar/' + item.id }"
                        class="btn btn-warning"
                      >
                        <i class="fa fa-edit"> </i>
                        Editar
                      </router-link>
                    </td>
                    <td>
                      <router-link
                        :to="{ path: '/Projetos/Tarefas/' + item.id }"
                        class="btn btn-primary"
                      >
                        <i class="fa fa-tasks"> </i> Tarefas
                      </router-link>
                    </td>
                    <td>
                      <button class="btn btn-danger" @click="excluir(item)">
                        <i class="fa fa-trash"> </i> Excluir
                      </button>
                    </td>
                  </tr>
                </tbody>
                <tbody v-else>
                  <tr>
                    <td colspan="5" align="center">
                      Nenhum projeto encontrado
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      
    <br />
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
    startData() {
      Conexao.get("/Projetos")
        .then((resposta) => {
          if (resposta.data.isOk) {
            this.dados = resposta.data.dados;
          } else {
            this.mensagem = resposta.data.mensagem;
            this.erro = true;
          }
        })
        .catch((resposta) => {
          this.mensagem = resposta.data.mensagem;
          this.erro = true;
        });
    },
    pesquisar() {
      if (this.query == "") {
        this.startData();
      } else {
        Conexao.get("/Projetos/PesquisarProjetos/" + this.query)
          .then((resposta) => {
            if (resposta.data.isOk) {
              this.dados = resposta.data.dados;
            } else {
              this.mensagem = resposta.data.mensagem;
              this.erro = true;
            }
          })
          .catch((error) => {
            this.erro = true;
            this.mensagem = error;
          });
      }
    },
    excluir(item) {
      Conexao.delete("/Projetos/" + item.id)
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
  },
};
</script>

<style>
</style>