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
            <!-- <div class="col-sm-12">
                <div class="form-group">
                    <label for="id">ID</label>
                    <input id="id" type="text" v-model="funcionalidade.id" disabled class="form-control">
                </div>
            </div> -->
            <div class="col-sm-12">
                <div class="form-group">
                    <label for="id">Nome</label>
                    <input id="id" type="text" v-model="funcionalidade.nome"  class="form-control">
                </div>
            </div>
            <div class="col-sm-12">
                <div class="form-group">
                    <label for="id">URL</label>
                    <input id="id" type="text" v-model="funcionalidade.URL"  class="form-control">
                </div>
            </div>
            <div class="col-sm-12">
                <div class="form-group">
                    <label for="id">Menu</label>
                    <input id="id" type="text" v-model="funcionalidade.menu"  class="form-control">
                </div>
            </div>
            <div class="col-sm-12">
                <div class="form-group">
                    <label for="nome">Sistema ID</label>
                    <input id="nome" type="text" v-model="funcionalidade.sistema_id" class="form-control">
                </div>
                <button @click="cancelar" class="btn btn-default float-right">Cancelar</button>
                <button @click="salvarFuncionalidade" class="btn btn-primary float-right mr-2">Salvar</button>
            </div>
        </div>
    </div>
</template>

<script>
import Funcionalidade from '@/models/Funcionalidade'
import funcionalidadeService from '@/services/funcionalidade-service';


export default {
    name: "FuncionalidadeComponent",
    data() {
        return {
            funcionalidade: new Funcionalidade(),
            modoCadastro: true
        }
    },


    mounted() {
        let id = this.$route.params.id;
        if (!id)

            return;

        this.modoCadastro = false;
        this.obterFuncporId(id);

    },
    methods: {
        obterFuncporId(id) {
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
                    // console.log(this.funcionalidade)
                    alert("funcionalidade cadastrado com sucesso!");
                    this.funcionalidade = new Funcionalidade();
                   

                    if (!this.continuarAdicionando) {
                        this.$router.push({ name: "ControleDeFuncionalidade" })
                    }
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
                    alert("Funcionalidade atualizada com sucesso!");
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

