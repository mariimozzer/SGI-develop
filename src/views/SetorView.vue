<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <h1 class="titulo">{{modoCadastro ? "Adicionar" : "Editar" }} Setor </h1>
                <hr/>
                <br>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-2">
                <div class="form-group">
                    <label for="id">ID</label>
                    <input id="id" type="text" v-model="setor.id" disabled class="form-control">
                </div>
            </div>
            <div class="col-sm-12">
                <div class="form-group">
                    <label for="nome">Setor</label>
                    <input id="nome" type="text" v-model="setor.nome" class="form-control">
                </div>
                <button @click="cancelar" class="btn btn-default float-right">Cancelar</button>
                <button @click="salvarSetor" class="btn btn-primary float-right mr-2">Salvar</button>
            </div>
        </div>
    </div>
</template>

<script>
import Setor from '@/models/Setor'
import setorService from '@/services/setor-service';


export default {
    name: "SetorComponent",
    data() {
        return {
            setor: new Setor(),
            modoCadastro: true
        }
    },


    mounted() {
        let id = this.$route.params.id;
        if (!id)

            return;

        this.modoCadastro = false;
        this.obterSetorporId(id);

    },
    methods: {
        obterSetorporId(id) {
            setorService.obterPorId(id)
                .then(response => {
                    this.setor = new Setor(response.data);
                })
                .catch(error => {
                    console.log(error)
                })
        },
        cadastrarSetor() {

            setorService.cadastrar(this.setor)
                .then(() => {
                    console.log(this.setor)
                    alert("Setor cadastrado com sucesso!");
                    this.setor = new Setor();
                   

                    if (!this.continuarAdicionando) {
                        this.$router.push({ name: "ControleDeSetores" })
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },

        salvarSetor() {

            (this.modoCadastro) ? this.cadastrarSetor(): this.atualizarSetor();
        },
        atualizarSetor() {

            setorService.atualizar(this.setor)
                .then(() => {
                    alert("Setor atualizada com sucesso!");
                    this.$router.push({ name: "ControleDeSetores" });

                })
                .catch(error => {
                    console.log(error);
                });
        },

        cancelar() {
            this.setor = new Setor();
            this.$router.push({ name: "ControleDeSetores" })
        }
    }
}
</script>

<style scoped>

</style>

