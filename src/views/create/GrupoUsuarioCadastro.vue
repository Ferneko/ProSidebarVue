<template>
  <Layout>
    <div class="card">
      <div class="card-header">Cadastro de Grupo Usuário</div>
      <div class="card-body">
        <div class="form-group row" v-if="this.erro == true">
          <div class="alert alert-danger offset-md-3 col-md-7">
            {{ this.mensagem }}
          </div>
        </div>
        <div class="row">
          <div class="col-4"></div>
          <div class="col-4">
            <div class="row">
              <div class="form-group col-md-12">
                <label>Nome do Grupo</label>
                <input type="text" class="form-control" v-model="nome" />
              </div>
            </div>
            <div class="row">
              <div class="form-group col-md-12">
                <button class="btn btn-success" v-on:click="salvarGrupo()">
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
import Conexao from "../../Conexao.js";
export default {
  data() {
    return {
      nome: "",
      mensagem: null,
      erro: false,
    };
  },
  created: function () {},
  methods: {
    salvarGrupo() {
       this.erro = false;
      if (this.nome != "") {
        Conexao.post("/GrupoUsuario", { nome: this.nome })
          .then((response) => {
             if (response.data.isOk) {
              this.$router.push("/GrupoUsuario");
            } else {
              this.mensagem = response.data.mensagem;
              this.erro = true;
            }
          })
          .catch((e) => {
            this.isOk = false;
            this.mensagem = "Catch: " + e;
          });
      }
    },
  },
};
</script>

<style>
</style>