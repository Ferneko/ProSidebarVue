<template>
  <Layout>
    <div class="card">
      <div class="card-header">Editar Registro</div>
      <div class="card-body">
        <div class="form-group row" v-if="this.erro == true">
          <div class="alert alert-danger col-12">
            {{ this.mensagem }}
          </div>
        </div>
        <div class="row">
          <div class="col-8">
            <div class="row">
              <div class="form-group col-md-6">
                <label>Data de Início</label>
                <input v-model="dataInicial" class="form-control" type="datetime-local" />
              </div>
            </div>
            <div class="row">
              <div class="form-group col-md-6">
                <label>Data de Término</label>
                <input v-model="dataFinal" class="form-control" type="datetime-local" />
              </div>
            </div>
            <div class="row">
              <div class="form-group col-md-12">
                <button class="btn btn-success" v-on:click="salvar()">
                  Salvar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
import Conexao from '../../Conexao'
export default {
  data() {
    return {
      id: this.$route.params.id,
      idTarefa: 0,
      dataInicial: "",
      dataFinal: "",
      mensagem: null,
      erro: false,
    };
  },
  mounted() {
    Conexao.get("/Registros/" + this.id)
      .then((resposta) => {
        if (resposta.data.isOk) {
          this.idTarefa = resposta.data.dados.tarefaId;
          this.dataInicial = resposta.data.dados.play;
          this.dataFinal = resposta.data.dados.stop;
          this.id = resposta.data.dados.id;
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
  methods: {
    salvar() {
      this.erro = false;
     
        Conexao.post("/Registros/EditarRegistro", {id:this.id, tarefaId: this.idTarefa, play:this.dataInicial, stop:this.dataFinal})
          .then((response) => {
            if (response.data.isOk) {
              window.history.back();
            } else {
              this.mensagem = response.data.mensagem;
              this.erro = true;
            }
          })
          .catch((e) => {
            this.isOk = false;
            this.mensagem = "Catch: " + e;
          });
      
    },
  },
};
</script>

<style>
</style>