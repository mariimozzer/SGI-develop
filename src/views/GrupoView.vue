<template>
    <div class="container">
        <FlashMessage></FlashMessage>
        <div class="row">
            <div class="col-sm-12">
                <h3 class="titulo">{{modoCadastro ? "Adicionar" : "Editar" }} Grupo </h3>
                <hr/>
                <br>
            </div>
        </div>
        <div class="row">
            <!-- <div class="col-sm-2">
                    <div class="form-group">
                        <label for="id">ID</label>
                        <input id="id" type="text" v-model="grupo.id" disabled class="form-control">
                    </div>
                </div> -->
            <div class="col-sm-12">
                <div class="form-group">
                    <label for="nome">Nome do Grupo</label>
                    <input id="nome" type="text" v-model="grupo.nome" class="form-control">
                </div>
                <button @click="cancelar" class="btn btn-default float-right">Cancelar</button>
    
                <b-button @click="salvarGrupo" aria-hidden="true" class="btn btn-primary float-right mr-2">
                    <i v-if="loading" class="fas fa-spinner fa-spin"></i>
                    <span v-if="!loading">Salvar</span>
                    <span v-if="loading">&nbsp; Salvando...</span>
    
                </b-button>
    
    
            </div>
        </div>
    </div>
</template>

<script>
import Grupo from '@/models/Grupo'
import grupoService from '@/services/grupo-service';
import FlashMessage from '@/components/flashMessage/FlashOKComponent.vue'
import { mapMutations } from 'vuex';


export default {
    name: "GrupoComponent",
    components: {
        FlashMessage
    },
    data() {
        return {
            grupo: new Grupo(),
            modoCadastro: true,
            loading: false
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
            this.loading = true

            grupoService.cadastrar(this.grupo)
                .then(() => {
                    this.grupo = new Grupo();
                    // this.$router.push({ name: "ControleDeGrupo" })
                    this.loading = false

                    this.$store.commit('setFlashMessage', 'Grupo cadastrado com sucesso!');
                    setTimeout(() => {
                        this.$store.commit('clearFlashMessage');
                    }, 5000)


                })
                .catch(error => {
                    this.loading = false
                    console.log(error);
                });
        },

        salvarGrupo() {

            (this.modoCadastro) ? this.cadastrarGrupo(): this.atualizarGrupo();
        },
        atualizarGrupo() {
            this.loading = true

            grupoService.atualizar(this.grupo)
                .then(() => {
                    // this.$router.push({ name: "ControleDeGrupo" });
                    this.loading = false
                    this.$store.commit('setFlashMessage', 'Grupo atualizado com sucesso!');
                    setTimeout(() => {
                        this.$store.commit('clearFlashMessage');
                    }, 5000)


                })
                .catch(error => {
                    this.loading = false
                    console.log(error);
                });
        },

        cancelar() {
            this.grupo = new Grupo();
            this.$router.push({ name: "ControleDeGrupo" })
        },

        ...mapMutations(['setFlashMessage'])

    }
}
</script>

<style scoped>

</style>

