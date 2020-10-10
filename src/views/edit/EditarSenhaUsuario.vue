<template>
  <Layout>
    <br />

    <div v-if="!this.isOk">
      <div class="alert alert-danger">
        {{ this.mensagem }}
      </div>
    </div>
     <div class="form-group col-8">
      <label for="ID">ID</label>
      <input
        type="text"
        readonly="readonly"
        class="form-control"
        v-model="dados.id"
      />
    </div>
     <div class="form-group col-8">
      <label for="nome">nome</label>
      <input
        type="text"
        readonly="readonly"
        class="form-control"
        v-model="dados.nome"
      />
    </div>
    <div class="form-group col-8">
      <label for="senha">Nova Senha</label>
      <input
        type="password"
        required
     
        class="form-control"
       
        v-model="dados.senha"
      />
    </div>
   
  
    
    <button class="btn btn-success" v-on:click="salvar()">Salvar</button>
  </Layout>
</template>

<script>
import Conexao from "../../Conexao.js";
export default {
  data() {
    return {
      dados: {
        id:this.$route.params.id,
       senha:"",
      },
      mensagem: null,
      isOk: true,
    };
  },
  mounted() {
    Conexao.get("/Usuarios/" + this.dados.id)
      .then((resposta) => {
        if (resposta.data.isOk) {
          console.log(resposta)
          this.dados.nome = resposta.data.dados.nome;
          this.dados.id =   resposta.data.dados.id;
        
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
      Conexao
        .put("/Usuarios/AlterarSenha/", { id:this.dados.id, senha:this.dados.senha})
        .then((response) => {
          this.mensagem = response.data.mensagem;
          this.isOk = response.data.isOk;
          if (this.isOk) {
            this.$router.push("/Usuarios");
          }
        })
        .catch((e) => {
          this.isOk = true;
          this.mensagem = "Catch: " + e;
        });
    },
  },
};
</script>

<style>
</style>