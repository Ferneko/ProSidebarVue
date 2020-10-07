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
      <label for="nome">Nome</label>
      <input
        type="text"
        required
        id="nome"
        class="form-control"
        name="nome"
        v-model="dados.nome"
      />
    </div>
    <div class="form-group col-8">
      <label>Login</label>
      <input
        type="text"
        class="form-control"
        v-model="dados.login"
      />
    </div>
  
    <div class="form-group col-8">
      <label>Email</label>
      <input
        class="form-control"
        type="email"
        v-model="dados.email"
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
        nome: "",
        login: "",
        email: "",
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
          this.dados.login = resposta.data.dados.login;
          this.dados.email = resposta.data.dados.email;
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
        .put("/Usuarios", {id:this.dados.id,nome:this.dados.nome,login:this.dados.login,email:this.dados.email})
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