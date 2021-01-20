<template>

  <div>
    <Loader></Loader>
    <main class="login-form">
      <div class="cotainer">
        <div class="row justify-content-center">
          <div class="col-md-8">
            <div class="card">
              <div class="card-header">The Second Floor</div>
              <div class="card-body">
                <div class="form-group row">
                  <label
                    for="login"
                    class="col-md-4 col-form-label text-md-right"
                    >Login</label
                  >
                  <div class="col-md-6">
                    <input
                      type="text"
                      id="Login"
                      class="form-control"
                      name="login"
                       v-on:keyup.enter="setFocus"
                      required
                      autofocus
                      v-model="login"
                    />
                  </div>
                </div>

                <div class="form-group row">
                  <label
                    for="senha"
                    class="col-md-4 col-form-label text-md-right"
                    >Senha</label
                  >
                  <div class="col-md-6">
                    <input
                      type="password"
                      id="senhaId"
                      class="form-control"
                      name="senha"
                      ref="camposenha"
                      required
                      v-model="senha"
                      v-on:keyup.enter="validacao"
                    />
                  </div>
                </div>

                <div class="form-group row" v-if="this.erro == true">
                  <div class="alert alert-danger offset-md-3 col-md-7">
                    {{ this.mensagem }}
                  </div>
                </div>

                <!--
                  <div class="form-group row">
                    <div class="col-md-6 offset-md-4">
                      <div class="checkbox">
                        <label>
                          <input type="checkbox" name="remember" /> Remember Me
                        </label>
                      </div>
                    </div>
                  </div>
                  -->

                <div class="col-md-6 offset-md-4">
                  <button
                    type="submit"
                    class="btn btn-primary"
                    @click="validacao"
                  >
                    Entrar
                  </button>
                  <!--
                        //<a href="#" class="btn btn-link"> Forgot Your Password? </a> 
                  -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Conexao from "../Conexao.js";
export default {
  data() {
    return {
      login: "",
      senha: "",
      resposta: "",
      erro: false,
      mensagem: "",
    };
  },
  created() {},
  mounted() {
      
  },
  components: {},
  methods: {
    setFocus(){
      this.$refs.camposenha.focus();
    },
     logar() {
      Conexao.post("/Login", { login: this.login, senha: this.senha })
        .then((resposta) => {
          //console.log(resposta);
          //  this.resposta = resposta.data.mensagem;

          if (resposta.data.isOk) {
            sessionStorage.setItem("TokenJWT", resposta.data.dados.token);
            sessionStorage.setItem("UsuarioId", resposta.data.dados.usuarioId);
            sessionStorage.setItem("Nome", resposta.data.dados.nome);
            sessionStorage.setItem("Login", resposta.data.dados.login);

            resposta.data.dados.roles.map(function (value, key) {
              sessionStorage.setItem(value, value);
            });
            location.reload();
            //console.log(resposta.data.dados.roles);
            //this.$router.push('/')
            this.$root.desativarLoader();
          } else {
            this.erro = true;
            this.mensagem = resposta.data.mensagem;
          }
        })
        .catch((resposta) => {
          console.log(resposta);
        });
    },
    async validacao() {
      this.$root.ativarLoader();
      this.erro = false;
      this.mensagem = "";
      if (this.login == "") {
        this.erro = true;
        this.mensagem = "Login não pode estar em branco";
      } else if (this.senha == "") {
        this.erro = true;
        this.mensagem = "Senha não pode estar em branco";
      } else {
        await this.logar();
      }
       this.$root.desativarLoader();
    },
  },
};
</script>

<style>
.my-form {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
}

.my-form .row {
  margin-left: 0;
  margin-right: 0;
}

.login-form {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
}

.login-form .row {
  margin-left: 0;
  margin-right: 0;
}
</style>