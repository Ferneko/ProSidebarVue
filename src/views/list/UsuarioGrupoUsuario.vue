<template>
  <Layout>
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <div class="input-group">
              <input
                type="text"
                class="form-control"
                placeholder="Digite aqui sua pesquisa"
                aria-label="Digite aqui sua pesquisa"
                aria-describedby="basic-addon2"
                v-model="query"
                v-on:input="pesquisar()"
              />
              <div class="input-group-append">
                <button class="btn btn-primary" @onClick="pesquisar()">
                  Pesquisar
                </button>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div class="form-group row" v-if="this.erro == true">
              <div class="alert alert-danger col-md-12">
                {{ this.mensagem }}
              </div>
            </div>
            <table class="table table-hover table-striped table-sm">
              <thead class="thead-dark">
                <tr>
                  <th></th>

                  <th>Nome</th>
                  <th>Descrição</th>
                </tr>
              </thead>
              <tbody v-if="this.dados.length >= 1">
                <tr v-for="(item, i) in this.dados" :key="i">
                  <td>
                    <button
                      v-if="item.ativo"
                      class="btn btn-danger"
                      @click="excluirPermissao(item)"
                    >
                      Excluir Permissão
                    </button>

                    <button
                      v-else
                      class="btn btn-success"
                      @click="adicionarPermissao(item)"
                    >
                      Conceder Permissão
                    </button>
                  </td>

                  <td>{{ item.nome }}</td>
                  <td>{{ item.descricao }}</td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr>
                  <td colspan="3" align="center">Nenhum grupo de usuário encontrado</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <br />
  </Layout>
</template>

<script>
import Conexao from "../../Conexao";
export default {
  data() {
    return {
      dados: [],
      mensagem: null,
      erro: false,
      id: this.$route.params.id,
      query: "",
    };
  },
  mounted() {
   this.startData();
  },
  methods: {
    excluirPermissao(item) {
      Conexao.delete(
        "/UsuarioGrupoUsuario/" + item.idGrupoUsuario + "/" + item.idUsuario 
      ).then((resposta) => {
        if (resposta.data.isOk) {
          item.ativo = !item.ativo;
        } else {
          this.mensagem = resposta.data.mensagem;
          this.erro = true;
        }
      });
    },
    adicionarPermissao(item) {
      Conexao.post("/UsuarioGrupoUsuario", {
        idUsuario: Number(item.idUsuario),
        idGrupoUsuario: Number(item.idGrupoUsuario),
      })
        .then((resposta) => {
          const dados = resposta.data;

          if (resposta.data.isOk) {
            item.ativo = !item.ativo;
          } else {
            this.mensagem = resposta.data.mensagem;
            this.erro = true;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    pesquisar() {
      if (this.query != "") {
        Conexao.get(
          "/UsuarioGrupoUsuario/PesquisarUsuariosGrupoUsuarios/" +
            this.id +
            "/" +
            this.query
        ).then((resposta) => {
          const dados = resposta.data;
          if (resposta.data.isOk) {
            this.dados = dados.dados;
          } else {
            this.mensagem = resposta.data.mensagem;
            this.erro = true;
          }
        });
      }else{
          this.startData()
      }
    },
    startData() {
       Conexao.get("/UsuarioGrupoUsuario/" + this.id)
      .then((resposta) => {
        if (resposta.data.isOk) {
          console.log(resposta.data.dados);

          this.dados = resposta.data.dados;
        } else {
          console.log(resposta.data.mensagem);
        }
      })
      .catch((resposta) => {
        //console.log(resposta);
      });
    },
  },
};
</script>

<style>
</style>