<template>
  <Layout>
    <div class="card">
      <div class="card-header">Filtros</div>
      <div class="card-body">
        <div class="form-group row" v-if="this.erro == true">
          <div class="alert alert-danger col-12">
            {{ this.mensagem }}
          </div>
        </div>
        <div class="row">
          <div class="col-4">
            <div class="form-group col-md-12">
              <label>Responsável</label>
              <input
                class="form-control"
                style="margin-bottom: 10px"
                type="text"
                v-model="queryUsuario"
                v-on:input="pesquisarUsuario()"
                placeholder="Buscar Usuário"
              />
              <b-form-select
                v-model="usuarioIdSelecionado"
                :options="todosUsuarios"
                :select-size="10"
              ></b-form-select>
            </div>
          </div>
          <div class="col-4">
            <div class="form-group col-md-12">
              <label>Projeto</label>
              <input
                class="form-control"
                v-on:input="pesquisarProjeto()"
                v-model="queryProjeto"
                style="margin-bottom: 10px"
                type="text"
                placeholder="Buscar projeto"
              />
              <b-form-select
                v-model="projetoIdSelecionado"
                :options="todosProjetos"
                :select-size="10"
              ></b-form-select>
            </div>
          </div>
          <div class="col-4">
            <div class="form-group col-md-12">
              
              <button class="btn btn-success" @click="validacao()">
                <i class="fa fa-search"></i> Filtrar
              </button>
            </div>
          </div>

          <!--
          <div class="col-4">
            <label>Data Inicial</label><br />
            <b-calendar
              v-model="dataInicial"
              :max="this.dataFinal"
              locale="pt-BR"
            ></b-calendar>
          </div>
          <div class="col-4">
            <label>Data Final</label><br />
            <b-calendar
              v-model="dataFinal"
              :min="this.dataInicial"
              locale="pt-BR"
            ></b-calendar>
          </div>
          -->
        </div>
        <br />
        <div class="row">
          <div class="col-12">
            <table class="table table-hover table-striped table-sm">
              <thead class="thead-dark">
                <tr>
                  <th>Nome</th>
                  <th>Descrição</th>
                  <th>Duração (Horas)</th>
                  <th>Horas Trabalhadas</th>
                  <th></th>
                </tr>
              </thead>
              <tbody v-if="this.itensTabela.length >= 1">
                <tr v-for="(item, i) in this.itensTabela" :key="i">
                  <td>{{ item.tarefa.nome }}</td>
                  <td>{{ item.tarefa.descricao }}</td>
                  <td>{{ item.tarefa.duracaoHoras }}</td>
                  <td>{{ item.horasTrabalhadas.toFixed(2) }}</td>
                  <td>
                    <b-button
                      id="show-btn"
                      @click="showModal(item.registrosTarefa)"
                      >Detalhes</b-button
                    >
                  </td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr>
                  <td colspan="6" align="center">Nenhuma Tarefa encontrada</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <b-modal ref="my-modal" hide-footer title="Registros" size="lg">
      <table class="table table-hover table-striped table-sm">
        <thead class="thead-dark">
          <tr>
            <th>Tarefa</th>
            <th>Inicio</th>
            <th>Término</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody v-if="this.itensRegistro.length >= 1">
          <tr v-for="(item, i) in this.itensRegistro" :key="i">
            <td>{{ item.tarefa.nome }}</td>
            <td>{{ item.play | formatDate }}</td>
            <td>{{ item.stop | formatDate }}</td>
            <td><button class="btn btn-danger" @click="excluir(item)"><i class="fa fa-trash"></i>  Excluir</button></td>
            <td><router-link class="btn btn-warning" :to="'/Registros/Editar/'+item.id"><i class="fa fa-edit"></i>  Editar</router-link></td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="5" align="center">Nenhum registro encontrado</td>
          </tr>
        </tbody>
      </table>
      <b-button class="mt-3" variant="outline-danger" block @click="hideModal"
        >Fechar</b-button
      >
    </b-modal>
  </Layout>
</template>

<script>
import Conexao from "../../Conexao";
export default {
  data() {
    return {
      mensagem: "",
      erro: false,
      //dataInicial: "",
      //dataFinal: "",
      todosUsuarios: [],
      todosProjetos: [],
      usuarioIdSelecionado: 0,
      projetoIdSelecionado: 0,
      queryUsuario: "",
      queryProjeto: "",

      itensTabela: [],
      itensRegistro: [],
    };
  },
  todos: null,
  mounted() {
    this.getTodosUsuarios();
    this.getTodosProjetos();
  },
  methods: {
    hideModal() {
      this.itensRegistro = [];
      this.$refs["my-modal"].hide();
    },
    showModal(registros) {
      this.itensRegistro = registros;
      this.$refs["my-modal"].show();
    },
    getTodosUsuarios() {
      Conexao.get("/Relatorios/getTodosUsuarios")
        .then((resposta) => {
          if (resposta.data.isOk) {
            this.todosUsuarios = resposta.data.dados;
          } else {
            this.erro = true;
            this.mensagem = resposta.data.mensagem;
          }
        })
        .catch((e) => {
          this.erro = true;
          this.mensagem = e;
        });
    },
    getTodosProjetos() {
      Conexao.get("/Relatorios/getTodosProjetos")
        .then((resposta) => {
          if (resposta.data.isOk) {
            this.todosProjetos = resposta.data.dados;
          } else {
            this.erro = true;
            this.mensagem = resposta.data.mensagem;
          }
        })
        .catch((e) => {
          this.erro = true;
          this.mensagem = e;
        });
    },
    pesquisarUsuario() {

      if (this.queryUsuario == "") {
        this.usuarioIdSelecionado = 0;
        this.todosUsuarios = this.getTodosUsuarios();
      } else {
        Conexao.get("/Relatorios/pesquisarUsuario/" + this.queryUsuario)
          .then((resposta) => {
            if (resposta.data.isOk) {
              this.todosUsuarios = resposta.data.dados;
            } else {
              this.mensagem = resposta.data.mensagem;
              this.erro = true;
            }
          })
          .catch((error) => {
            this.erro = true;
            this.mensagem = error;
          });
      }
    },
    pesquisarProjeto() {
       if (this.queryProjeto == "") {
         this.projetoIdSelecionado = 0;
        this.todosProjetos = this.getTodosProjetos();
      } else {
        Conexao.get("/Relatorios/pesquisarProjeto/" + this.queryProjeto)
          .then((resposta) => {
            if (resposta.data.isOk) {
              this.todosProjetos = resposta.data.dados;
            } else {
              this.mensagem = resposta.data.mensagem;
              this.erro = true;
            }
          })
          .catch((error) => {
            this.erro = true;
            this.mensagem = error;
          });
      }
    },
    buscar() {
      Conexao.post("/Relatorios", {
        usuarioId: this.usuarioIdSelecionado,
        projetoId: this.projetoIdSelecionado,
        //dataInicio: this.dataInicial,
        //dataFinal: this.dataFinal,
      })
        .then((response) => {
          if (response.data.isOk) {
            //console.log(response.data.dados);
            this.itensTabela = response.data.dados;
          } else {
            this.mensagem = response.data.mensagem;
            this.erro = true;
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
      if (this.usuarioIdSelecionado == 0) {
        this.erro = true;
        this.mensagem = "Por favor selecione um responsável";
      } else if (this.projetoIdSelecionado == 0) {
        this.erro = true;
        this.mensagem = "Por favor selecione um projeto";
      } /*else if(this.dataInicial == ""){
        this.erro = true;
        this.mensagem = "Por favor selecione uma data inicial";
      }
      else if(this.dataFinal == ""){
        this.erro = true;
        this.mensagem = "Por favor selecione uma data final";
      }*/ else {
        this.buscar();
      }
    },
    excluir(item) {
      Conexao.delete("/Registros/" + item.id)
        .then((resposta) => {
          if (resposta.data.isOk) {
            this.hideModal() ;
            this.buscar();
          } else {
            this.erro = true;
            this.mensagem = resposta.data.mensagem;
          }
        })
        .catch((error) => {
          this.erro = true;
          this.mensagem = error;
        });
    },
  },
};
</script>

<style>
</style>