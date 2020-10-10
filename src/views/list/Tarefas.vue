<template>
  <Layout>
    <div class="card">
      <div class="card-header">
        <div class="row">
          <div class="col-3">
            <router-link v-if="projetoId === undefined" :to="{ path: '/Tarefas/Novo/' }" class="btn btn-success">
              Nova Tarefa
            </router-link>
             <router-link v-else :to="{ path: '/Tarefas/Novo/'+ this.$route.params.id }" class="btn btn-success">
              Nova Tarefa
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
                <th>Descrição</th>
                <th>Duração (Horas)</th>
                <th>Responsável</th>
                <th>Projeto</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody v-if="this.dados.length >= 1">
              <tr v-for="(item, i) in this.dados" :key="i">
                <td>{{ item.id }}</td>
                <td>{{ item.nome }}</td>
                <td>{{ item.descricao }}</td>
                <td>{{ item.duracaoHoras }}</td>
                <td>{{ item.usuario.nome }}</td>
                <td>{{ item.projeto.nome }}</td>
                <td>
                  <router-link
                    :to="{ path: '/Tarefas/Editar/' + item.id }"
                    class="btn btn-warning"
                  >
                    <i class="fa fa-edit"> </i>
                    Editar
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
                <td colspan="8" align="center">Nenhuma Tarefa encontrada</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
import Conexao from "../../Conexao";
export default {
  data() {
    return {
      projetoId: this.$route.params.id,
      usuarioId: sessionStorage.getItem("UsuarioId"),
      dados: [],
      erro: false,
      mensagem: "",
      query: "",
    };
  },
  mounted() {
    this.startData();
  },
  methods: {
    startData() {
      if (this.$route.params.id == null) {
        Conexao.get("/Tarefas")
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
      } else {
        Conexao.get("/Tarefas/Projetos/" + this.id)
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
      }
    },
    pesquisar() {
      if (this.query == "") {
        this.startData();
      } else {
        Conexao.get("/Tarefas/PesquisarTarefas/" + this.query)
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
      Conexao.delete("/Tarefas/" + item.id)
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