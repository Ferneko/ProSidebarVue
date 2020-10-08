<template>
  <Layout>
    <div class="card">
      <div class="card-header">Trocar Senha</div>
      <div class="card-body">
        <div class="form-group row" v-if="this.erro">
          <div class="alert alert-danger col-12">
            {{ this.mensagem }}
          </div>
        </div>

        <div class="form-group col-8">
          <label>Senha Atual</label>
          <input type="password" class="form-control" v-model="senhaAtual" />
        </div>
        <div class="form-group col-8">
          <label>Nova Senha</label>
          <input type="password" class="form-control" v-model="senhaNova" />
        </div>
        <div class="form-group col-8">
          <label>Confirmar a senha</label>
          <input type="password" class="form-control" v-model="confirmacao" />
        </div>
        <div class="form-group col-8">
          <button class="btn btn-success" @click="validacao()">Salvar</button>
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
      id: Number(localStorage.getItem("UsuarioId")),
      senhaAtual: "",
      senhaNova: "",
      confirmacao: "",
      mensagem: null,
      erro: false,
    };
  },
  methods: {
    salvar() {
     
      Conexao.put("/Usuarios/trocarSenha", {
        id: this.id,
        senhaAntiga: this.senhaAtual,
        senhaNova: this.senhaNova,
        confirmacao: this.confirmacao,
      })
        .then((response) => {
          if (response.data.isOk) {
            alert(response.data.mensagem);
            localStorage.clear();
            window.location = '/login';
          } else {
            this.erro = true;
            this.mensagem = response.data.mensagem;
          }
        })
        .catch((e) => {
          this.erro = true;
          this.mensagem = "Catch: " + e;
        
        });
    },
    validacao() {
      this.erro = false;
      this.mensagem = "";
      if (this.senhaAtual == "") {
        this.mensagemErro("Senha Atual precisa ser preenchido");
      } else if (this.senhaNova == "") {
        this.mensagemErro("Nova Senha precisa ser preenchido");
      } else if (this.confirmacao == "") {
        this.mensagemErro("Confirmação da senha precisa ser preenchido");
      } else if (this.confirmacao != this.senhaNova) {
        this.mensagemErro("A nova senha e a confirmação estão diferentes");
      } else {
        this.salvar();
      }
    },
    mensagemErro(mensagem) {
      this.erro = true;
      this.mensagem = mensagem;
    },
  },
};
</script>

<style>
</style>