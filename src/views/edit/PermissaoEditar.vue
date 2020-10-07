<template>
  <Layout>
    <div class="card">
      <div class="card-header">Editar de Permissão</div>
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
                <label>ID</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="id"
                  readonly="readonly"
                />
              </div>
            </div>

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
                <input type="text" readonly="readonly" class="form-control" v-model="role" />
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
      id:this.$route.params.id,
      nome: "",
      descricao: "",
      role: "",
      mensagem: null,
      erro: false,
    };
  },
   mounted() {
    Conexao.get("/Permissao/" + this.id)
      .then((resposta) => {
        if (resposta.data.isOk) {
          this.nome= resposta.data.dados.nome
          this.descricao= resposta.data.dados.descricao
          this.role= resposta.data.dados.role
          this.id= resposta.data.dados.id
        } else {
          this.mensagem = resposta.data.mensagem
          this.erro = true;
        }
      })
      .catch((resposta) => {
        //console.log(resposta);
      });
  },
  methods: {
    salvar() {
       this.erro = false;
      
        Conexao.post("/Permissao", { id: this.id, nome: this.nome, descricao:this.descricao, role:this.role })
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
     
    },
  },
};
</script>

<style>
</style>