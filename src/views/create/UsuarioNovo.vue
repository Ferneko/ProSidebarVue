<template>
  <Layout>
      <br>

    <div v-if="!this.isOk">
      <div class="alert alert-danger">
      {{this.mensagem}}
      </div>
    </div>
   <div class="form-group col-8">
      <label for="nome">Nome</label>
      <input type="text" required id="nome" class="form-control" name="nome" v-model="dados.nome" />
    </div>
    <div class="form-group col-8">
      <label>Login</label>
      <input type="text" required class="form-control" name="login" v-model="dados.login" />
    </div>
    <div class="form-group col-8">
      <label>Senha</label>
      <input type="password" required class="form-control" name="senha" v-model="dados.senha" />
    </div>
    <div>
      <input type="file" class="form-control-file">
    </div>
   <div class="form-group col-8">
      <label>Email</label>
      <input class="form-control" required type="email" name="nome" v-model="dados.email" />
      <input type="hidden" name="ativo" v-model="dados.ativo" value="true" />
      <input type="hidden" name="trocarSenha" v-model="dados.trocarSenha" value="true" />
   </div>
    <button class="btn btn-success" @click="this.enviarParaBack">Salvar</button>
  </Layout>
</template>

<script>
import conexao from "../../Conexao.js";
export default {
 data() {
    return {
      dados: {
        nome: "",
        login: "",
        senha: "",
        email: "",
        ativo: true,
        trocarSenha: true,
      },
      mensagem: null,
      isOk: true,
    };
  },
  created: function () {
    
  },
  methods: {
    enviarParaBack() {
      conexao
        .post("/Usuarios", this.dados)
        .then((response) => {
          this.mensagem = response.data.mensagem;
          this.isOk = response.data.isOk;
          if(this.isOk){
              this.$router.push('/Usuarios');
          }
        })
        .catch((e) => {
             this.isOk = false;
          this.mensagem = "Catch: "+e;
        });
    },
  },
};
</script>

<style>

</style>