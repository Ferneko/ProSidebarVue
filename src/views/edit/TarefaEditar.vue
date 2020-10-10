<template>
  <Layout>
    <div class="card">
      <div class="card-header">Nova Tarefa</div>
      <div class="card-body">
        <div class="form-group row" v-if="this.erro">
          <div class="alert alert-danger col-12">
            {{ this.mensagem }}
          </div>
        </div>

        <div class="row">
          <div class="col-4">
            <div class="row">
              <div class="form-group col-md-12">
                <label>Nome</label>
                <input type="text" class="form-control" v-model="nome" />
              </div>

              <div class="form-group col-md-12">
                <label>Descrição</label>
                <textarea
                  style="height: 150px"
                  class="form-control"
                  v-model="descricao"
                ></textarea>
              </div>

              <div class="form-group col-md-12">
                <label>Duração</label>
                <input
                  type="number"
                  step="1"
                  min="0"
                  class="form-control"
                  v-model="duracaoHoras"
                />
              </div>
            </div>
          </div>
          <div class="col-6">
            Codigo: {{ this.id }}
            <div class="form-group col-md-12">
              <label>Responsável</label>
              <b-form-select
                v-model="usuarioId"
                :options="todosUsuarios"
                :select-size="4"
              ></b-form-select>
            </div>

            <div class="form-group col-md-12">
              <label>Projeto</label>
              <b-form-select
                v-model="projetoId"
                :options="todosProjetos"
                :select-size="4"
              ></b-form-select>
            </div>
            <div class="form-group col-md-12">
              <button class="btn btn-success" v-on:click="validacao()">
                <i class="fa fa-save"></i> Salvar
              </button>
            </div>
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
      id: this.$route.params.id,
      nome: "",
      descricao: "",
      duracaoHoras: 0,
      usuarioId: 0,
      projetoId: 0,
      todosUsuarios: [],
      todosProjetos: [],
      erro: false,
      mensagem: "",
    };
  },
  components: {},
  mounted() {
    this.startData();
    this.pesquisarUsuarios();
    this.pesquisarProjeto();
  },
  methods: {
    startData() {
      Conexao.get("/Tarefas/" + this.id)
        .then((resposta) => {
          if (resposta.data.isOk) {
            this.nome = resposta.data.dados.nome;
            this.descricao = resposta.data.dados.descricao;
            this.usuarioId = resposta.data.dados.usuarioId;
            this.projetoId = resposta.data.dados.projetoId;
            this.id = resposta.data.dados.id;
            this.duracaoHoras = resposta.data.dados.duracaoHoras;
            
          } else {
            this.mensagem = resposta.data.mensagem;
            this.erro = true;
          }
        })
        .catch((resposta) => {
            this.mensagem = resposta;
            this.erro = true;
        });
    },
    salvar() {
      Conexao.post("/Tarefas", {
        nome: this.nome,
        descricao: this.descricao,
        duracaoHoras: Number(this.duracaoHoras),
        projetoId: Number(this.projetoId),
        usuarioId: Number(this.usuarioId),
        id:this.id
      })
        .then((response) => {
          if (response.data.isOk) {
            this.$router.push("/Tarefas");
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
    validacao() {
      this.erro = false;
      if (this.nome == "") {
        this.erro = true;
        this.mensagem = "Nome da tarefa deve ser preenchido";
      } else if (this.descricao == "") {
        this.erro = true;
        this.mensagem = "Descrição da tarefa deve ser preenchido";
      } else if (this.duracaoHoras < 1) {
        this.erro = true;
        this.mensagem = "Duração da tarefa deve ser maior que zero";
      } else if (this.projetoId < 1) {
        this.erro = true;
        this.mensagem = "Selecione um projeto";
      } else if (this.usuarioId < 1) {
        this.erro = true;
        this.mensagem = "Selecione um responsável pela tarefa";
      } else {
        this.salvar();
      }
    },
    pesquisarUsuarios() {
      Conexao.get("/Usuarios/ComboBoxUsuarios")
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
    pesquisarProjeto() {
      Conexao.get("/Projetos/ComboBoxProjetos")
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
  },
};
</script>

<style>
</style>