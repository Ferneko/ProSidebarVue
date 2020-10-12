<template>
  <Layout>
    <div class="card">
      <div class="card-header">Filtros</div>
      <div class="card-body">
        <div class="form-group row" v-if="this.erro == true">
          <div class="alert alert-danger col-12">
            {{ this.mensagem }}
          </div>
        </div>
        <div class="row">
          <div class="col-2">
            <div class="form-group col-md-12">
              <label>Responsável</label>
              <input
                class="form-control"
                style="margin-bottom: 10px"
                type="text"
                placeholder="Buscar Usuário"
              />
              <b-form-select
                v-model="usuarioIdSelecionado"
                :options="todosUsuarios"
                :select-size="10"
              ></b-form-select>
            </div>
            <button class="btn btn-success" @click="buscar()">
              <i class="fa fa-search"></i> Filtrar
            </button>
          </div>
          <div class="col-2">
            <div class="form-group col-md-12">
              <label>Projeto</label>
              <input
                class="form-control"
                v-on:input="search($event)"
                style="margin-bottom: 10px"
                type="text"
                placeholder="Buscar projeto"
              />
              <b-form-select
                v-model="projetoIdSelecionado"
                :options="todosProjetos"
                :select-size="10"
              ></b-form-select>
            </div>
          </div>
          <div class="col-4">
            <label>Data Inicial</label><br />
            <b-calendar
              v-model="dataInicial"
              :max="this.dataFinal"
              locale="pt-BR"
            ></b-calendar>
          </div>
          <div class="col-4">
            <label>Data Final</label><br />
            <b-calendar
              v-model="dataFinal"
              :min="this.dataInicial"
              locale="pt-BR"
            ></b-calendar>
          </div>
        </div>
        <br />
        <div class="row">
          <div class="col-12">
            <table class="table table-hover table-striped table-sm">
            <thead class="thead-dark">
              <tr>
                <th>Id</th>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Duração (Horas)</th>
              </tr>
            </thead>
            <tbody v-if="this.itensTabela.length >= 1">
              <tr v-for="(item, i) in this.itensTabela" :key="i">
                <td>{{ item.tarefa.id }}</td>
                <td>{{ item.tarefa.nome }}</td>
                <td>{{ item.tarefa.descricao }}</td>
                <td>{{ item.tarefa.duracaoHoras }}</td>
              
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td colspan="6" align="center">Nenhuma Tarefa encontrada</td>
              </tr>
            </tbody>
          </table>
          </div>
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
      mensagem: "",
      erro: false,
      dataInicial: "",
      dataFinal: "",
      todosUsuarios: [],
      todosProjetos: [],
      usuarioIdSelecionado: 0,
      projetoIdSelecionado: 0,
      queryUsuario: "",
      queryProjeto: "",

      
      itensTabela: [],
    };
  },
  todos: null,
  mounted() {
    this.getTodosUsuarios();
    this.getTodosProjetos();
  },
  methods: {
    getTodosUsuarios() {
      Conexao.get("/Relatorios/getTodosUsuarios")
        .then((resposta) => {
          if (resposta.data.isOk) {
            this.todosUsuarios = resposta.data.dados;
          } else {
            this.erro = true;
            this.mensagem = resposta.data.mensagem;
          }
        })
        .catch((e) => {
          this.erro = true;
          this.mensagem = e;
        });
    },
    getTodosProjetos() {
      Conexao.get("/Relatorios/getTodosProjetos")
        .then((resposta) => {
          if (resposta.data.isOk) {
            this.todosProjetos = resposta.data.dados;
          } else {
            this.erro = true;
            this.mensagem = resposta.data.mensagem;
          }
        })
        .catch((e) => {
          this.erro = true;
          this.mensagem = e;
        });
    },
    pesquisarUsuario() {
      if (this.queryUsuario == "") {
        this.usuarioIdSelecionado = 0;
        this.todosUsuarios = this.getTodosUsuarios();
      } else {
        this.todosUsuarios = [];
      }
    },
    pesquisarProjeto() {
      if (this.queryProjeto == "") {
        this.projetoIdSelecionado = 0;
        this.todosProjetos = this.getTodosProjetos();
      } else {
        this.todosProjetos = [];
      }
    },
    buscar() {
      Conexao.post("/Relatorios", {
        usuarioId: this.usuarioIdSelecionado,
        projetoId: this.projetoIdSelecionado,
        dataInicio: this.dataInicial,
        dataFinal: this.dataFinal,
      })
        .then((response) => {
          if (response.data.isOk) {
              console.log(response.data.dados)
                this.itensTabela = response.data.dados;
          } else {
            this.mensagem = response.data.mensagem;
            this.erro = true;
          }
        })
        .catch((e) => {
          this.erro = true;
          this.mensagem = "Catch: " + e;
        });
    },
  },
};
</script>

<style>
</style>