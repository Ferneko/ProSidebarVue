<template>
  <Layout>
    <div class="card">
      <div class="card-header">Cadastro de Projeto</div>
      <div class="card-body">
        <div class="form-group row" v-if="this.erro == true">
          <div class="alert alert-danger col-12">
            {{ this.mensagem }}
          </div>
        </div>
        <div class="row">
          <div class="col-2"></div>
          <div class="col-8">
            <div class="row">
              <div class="form-group col-md-12">
                <label>Nome do Projeto</label>
                <input type="text" class="form-control" v-model="nome" />
              </div>
            </div>
             <div class="row">
              <div class="form-group col-md-6">
                  <label>Data de Início</label>
                <b-calendar v-model="inicio"  locale="pt-BR"></b-calendar>
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
      inicio: "",
      termino: "",
      mensagem: null,
      erro: false,
    };
  },
  created: function () {},
  methods: {
    salvar() {
       this.erro = false;
      if (this.validacao()) {
        Conexao.post("/Projetos", { nome: this.nome, inicio:this.inicio })
          .then((response) => {
             if (response.data.isOk) {
              this.$router.push("/Projetos");
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
    validacao(){
        if(this.nome == ""){
            this.erro = true;
            this.mensagem = "Nome do projeto não pode estar vazio";
            return false;
        }else if(this.inicio ==""){
            this.erro = true;
            this.mensagem = "Determine uma data de inicio para o projeto";
            return false;
        }else{
            return true;
        }
    }
  },
};
</script>

<style>
</style>