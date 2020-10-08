<template>
  <Layout>
   
   <div class="card">
      <div class="card-header">Cadastro de Usuários</div>
      <div class="card-body">
        <div class="form-group row" v-if="this.erro">
          <div class="alert alert-danger offset-md-3 col-md-7">
            {{ this.mensagem }}
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
   <div class="form-group col-8">
      <label>Email</label>
      <input class="form-control" required type="email" name="nome" v-model="dados.email" />
      <input type="hidden" name="ativo" v-model="dados.ativo" value="true" />
      <input type="hidden" name="trocarSenha" v-model="dados.trocarSenha" value="true" />
   </div>
    <div class="form-group col-8">
    <button class="btn btn-success" @click="salvar()">Salvar</button>
    </div>

      </div>
   </div>
   


  
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
      erro: false
    };
  },
  created: function () {
    
  },
  methods: {
    salvar() {
      conexao
        .post("/Usuarios", this.dados)
        .then((response) => {
          
          if(response.data.isOk){
              this.$router.push('/Usuarios');
          }else{
            this.erro = true;
            this.mensagem = response.data.mensagem

          }
        })
        .catch((e) => {
          console.log(e);
              this.erro = true;
              this.mensagem = "Catch: "+e;
        });
    },
  },
};
</script>

<style>

</style>