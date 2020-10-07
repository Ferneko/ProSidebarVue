<template>
  <Layout>
    <div class="card">
      <div class="card-header">Cadastro de Permissão</div>
      <div class="card-body">
        <div class="form-group row" v-if="this.erro">
          <div class="alert alert-danger offset-md-3 col-md-7">
            {{ this.mensagem }}
          </div>
        </div>
        <div class="row">
          <div class="col-4"></div>
          <div class="col-4">
            <div class="row">
              <div class="form-group col-md-12">
                <label>Nome</label>
                <input type="text" class="form-control" v-model="nome" />
              </div>
            </div>
            <div class="row">
              <div class="form-group col-md-12">
                <label>Descrição</label>
                <input type="text" class="form-control" v-model="descricao" />
              </div>
            </div>
            <div class="row">
              <div class="form-group col-md-12">
                <label>Role</label>
                <input type="text" class="form-control" v-model="role" />
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
import Conexao from "../../Conexao.js";
export default {
  data() {
    return {
      nome: "",
      descricao: "",
      role: "",
      mensagem: null,
      erro: false,
    };
  },
  created: function () {},
  methods: {
    salvar() {
      this.erro = false;
      if (this.nome != "") {
        Conexao.post("/Permissao", {
          nome: this.nome,
          descricao: this.descricao,
          role: this.role,
        })
          .then((response) => {
            if (response.data.isOk) {
              this.$router.push("/Permissao");
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