<template>
  <Layout>
    <div v-if="this.erro">
      <div class="alert alert-danger">
        {{ this.mensagem }}
      </div>
    </div>
    <div v-if="this.dados.length >= 1">
     
    <div class="card" v-for="(item, i) in this.dados" :key="i">
      <div class="card-header">Projeto: {{ item.projeto.nome }}</div>
     
        <table class="table table-hover table-striped table-sm">
          <thead class="thead-dark">
            <tr>
              <th>Código</th>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Horas</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody v-if="item.tarefas.length >= 1">
            <tr v-for="(tarefa, j) in item.tarefas" :key="j">
              <td>{{ tarefa.id }}</td>
              <td>{{ tarefa.nome }}</td>
              <td>{{ tarefa.descricao }}</td>
              <td>{{ tarefa.duracaoHoras }}</td>
              <td>
                <button class="btn btn-sm btn-success">
                  <i class="fa fa-play"></i> Start
                </button>
              </td>
              <td>
                <button class="btn btn-sm btn-primary">
                  <i class="fa fa-pause"></i> Pause
                </button>
              </td>
              <td>
                <button class="btn btn-sm btn-danger">
                  <i class="fa fa-stop"></i> Stop
                </button>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="7">Nenhuma tarefa atribuida</td>
            </tr>
          </tbody>
        </table>
     
    </div>
     
    </div>
    <div v-else>
      Nenhum projeto
    </div>
  </Layout>
</template>

<script>
import Conexao from "../Conexao";

export default {
  data() {
    return {
      usuarioId: sessionStorage.getItem("UsuarioId"),
      dados: [],
      erro: false,
      mensagem: "",
    };
  },
  mounted() {
    this.startData();
  },
  methods: {
    startData() {
      Conexao.get("/Tarefas/MinhasTarefas/" + this.usuarioId)
        .then((resposta) => {
          if (resposta.data.isOk) {
            this.dados = resposta.data.dados;
            console.log(resposta.data.dados);
          } else {
            this.mensagem = resposta.data.mensagem;
            this.erro = true;
          }
        })
        .catch((e) => {
          this.mensagem = e;
          this.erro = true;
        });
    },
  },
};
</script>
