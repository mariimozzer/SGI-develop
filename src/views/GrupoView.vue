<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <h1 class="titulo">{{modoCadastro ? "Adicionar" : "Editar" }} Grupo </h1>
                <hr/>
                <br>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-2">
                <div class="form-group">
                    <label for="id">ID</label>
                    <input id="id" type="text" v-model="grupo.id" disabled class="form-control">
                </div>
            </div>
            <div class="col-sm-12">
                <div class="form-group">
                    <label for="nome">Grupo</label>
                    <input id="nome" type="text" v-model="grupo.nome" class="form-control">
                </div>
                <button @click="cancelar" class="btn btn-default float-right">Cancelar</button>
                <button @click="salvarGrupo" class="btn btn-primary float-right mr-2">Salvar</button>
            </div>
        </div>
    </div>
</template>

<script>
import Grupo from '@/models/Grupo'
import grupoService from '@/services/grupo-service';


export default {
    name: "GrupoComponent",
    data() {
        return {
            grupo: new Grupo(),
            modoCadastro: true
        }
    },


    mounted() {
        let id = this.$route.params.id;
        if (!id)

            return;

        this.modoCadastro = false;
        this.obterGrupoPorId(id);

    },
    methods: {
        obterGrupoPorId(id) {
            grupoService.obterPorId(id)
                .then(response => {
                    this.grupo = new Grupo(response.data);
                })
                .catch(error => {
                    console.log(error)
                })
        },
        cadastrarGrupo() {

            grupoService.cadastrar(this.grupo)
                .then(() => {
                    alert("Grupo cadastrado com sucesso!");
                    this.grupo = new Grupo();


                })
                .catch(error => {
                    console.log(error);
                });
        },

        salvarGrupo() {

            (this.modoCadastro) ? this.cadastrarGrupo(): this.atualizarGrupo();
        },
        atualizarGrupo() {

            grupoService.atualizar(this.grupo)
                .then(() => {
                    alert("Grupo atualizado com sucesso!");
                    this.$router.push({ name: "ControleDeGrupo" });

                })
                .catch(error => {
                    console.log(error);
                });
        },

        cancelar() {
            this.grupo = new Grupo();
            this.$router.push({ name: "ControleDeGrupo" })
        }
    }
}
</script>

<style scoped>

</style>

