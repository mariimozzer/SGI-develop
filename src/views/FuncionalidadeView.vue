<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <h1 class="titulo">{{modoCadastro ? "Adicionar" : "Editar" }} Funcionalidade </h1>
                <hr/>
                <br>
            </div>
        </div>
        <div class="row">
    
            <br>
            <div class="col-sm-10">
                <div class="form-group">
                    <label for="nome">Nome</label>
                    <input id="nome" v-model="funcionalidade.nome" type="text" class="form-control">
                </div>
            </div>
            <div class="col-sm-12">
                <div class="form-group">
                    <label for="url">URL</label>
                    <input id="url" type="text" v-model="funcionalidade.url" class="form-control">
                </div>
            </div>
            <div class="col-sm-5">
                <div class="form-group">
                    <label for="menu">Menu Principal</label>
                    <br>
    
                    <input type="radio" id="yes" value="sim" v-model="funcionalidade.menu">
                    <label for="yes">Sim</label>
                    <br>
                    <input type="radio" id="no" value="nao" v-model="funcionalidade.menu">
                    <label for="no">Não</label> {{ funcionalidade.menu }}
                </div>
            </div>
            <div class="col-sm-5">
                <div class="form-group">
                    <label for="sistema_id">Sistema</label>
                    <select class="combo" v-model="sistemaSelecionado">
                            <option value="" disabled>Selecione o sistema</option>
                            <option v-for="item in sistemas" :key="item.id" :value="item.id">(ID: {{item.id}} Nome: {{ item.nome }})</option></select>
    
    
    
                </div>
            </div>
    
        </div>
    
        <div class="row">
            <div class="col-sm-12">
                <hr>
                <br>
    
            </div>
            <div class="col-sm-12">
    
                <button @click="cancelar" class="btn btn-default float-right">Cancelar</button>
                <button @click="salvarFuncionalidade" class="btn btn-primary float-right mr-2">Salvar</button>
            </div>
        </div>
    </div>
</template>

<script>
import Funcionalidade from '@/models/Funcionalidade'
import funcionalidadeService from '@/services/funcionalidade-service';
import sistemaService from '@/services/sistema-service'
import Sistema from '@/models/Sistema'


export default {
    name: "FuncionalidadeComponent",
    data() {
        return {
            funcionalidade: new Funcionalidade(),
            modoCadastro: true,
            sistemas: [],
            sistemaSelecionado: null
        }
    },


    mounted() {
        let id = this.$route.params.id;
        if (!id)

            return;

        this.modoCadastro = false;
        this.obterFuncPorId(id);
        this.obterSistema;

    },
    methods: {

        obterSistema() {
            sistemaService.obterTodos()
                .then(response => {
                    this.sistemas = response.data.data.map((p) => new Sistema(p));
                })
                .catch(error => {
                    console.log(error)
                })
        },



        obterFuncPorId(id) {
            funcionalidadeService.obterPorId(id)
                .then(response => {
                    this.funcionalidade = new Funcionalidade(response.data);
                })
                .catch(error => {
                    console.log(error)
                })
        },
        cadastrarFuncionalidade() {

            funcionalidadeService.cadastrar(this.funcionalidade)
                .then(() => {
                    alert("Funcionalidade cadastrado com sucesso!");
                    this.funcionalidade = new Funcionalidade();


                })
                .catch(error => {
                    console.log(error);
                });
        },

        salvarFuncionalidade() {

            (this.modoCadastro) ? this.cadastrarFuncionalidade(): this.atualizarFuncionalidade();
        },
        atualizarFuncionalidade() {

            funcionalidadeService.atualizar(this.funcionalidade)
                .then(() => {
                    alert("Funcionalidade atualizado com sucesso!");
                    this.$router.push({ name: "ControleDeFuncionalidade" });

                })
                .catch(error => {
                    console.log(error);
                });
        },

        cancelar() {
            this.funcionalidade = new Funcionalidade();
            this.$router.push({ name: "ControleDeFuncionalidade" })
        }
    }
}
</script>

<style scoped>

</style>

