<template>
    <div class="container">
        <FlashMessage v-if="flashMessage"></FlashMessage>
        <div class="row">
            <div class="col-sm-12">
    
                <h3 class="titulo">{{modoCadastro ? "Adicionar" : "Editar" }} Telas </h3>
                <hr/>
                <br>
            </div>
        </div>
        <div class="row">
    
            <div class="col-sm-12">
                <div class="form-group">
                    <label for="nome">Nome</label>
                    <input id="nome" type="text" v-model="funcionalidade.nome" class="form-control">
                </div>
            </div>
            <div class="col-sm-12">
                <div class="form-group">
                    <label for="url">URL</label>
                    <input id="url" type="text" v-model="funcionalidade.URL" class="form-control">
                </div>
            </div>
            <div class="col-sm-12">
                <div class="form-group">
    
                    <label>Menu</label>
                    <br>
    
                    <div class="form-check">
                        <input class="form-check-input" type="radio" id="sim" value="1" v-model="funcionalidade.menu">
                        <label class="form-check-label" for="sim"> Sim </label>
                        <br>
                        <input class="form-check-input" type="radio" id="nao" value="0" v-model="funcionalidade.menu">
                        <label class="form-check-label" for="nao"> Não </label>
    
                    </div>
                </div>
    
            </div>
            <br>
    
            <div class="col-sm-12">
                <div class="form-group">
    
                    <label>Sistema</label>
                    <br>
                    <select class="form-select" v-model="funcionalidade.sistema_id">
                                                                <option value="" disabled>Selecione o sistema</option>
                                                                <option v-for="item in sistemasDisponiveis" :key="item.id" :value="item.id">{{ item.nome }}</option></select>
                    <!-- <input id="sistema" type="text" v-model="funcionalidade.sistema_id" class="form-control"> -->
    
                </div>
            </div>
           
                <div class="col-sm-12">
                    <div class="form-group">
                    <label>URL Ícone (SVG)</label>
                    <input id="icone" type="text" v-model="funcionalidade.icone" class="form-control">
    
                </div>
            </div>
            <div class="col-sm-12">
                <div class="form-group">
                    <label>Tema</label>
                    <select class="form-select" v-model="funcionalidade.sistema_id">
                                                                <option value="" disabled>Selecione o sistema</option>
                                                                <option v-for="item in sistemasDisponiveis" :key="item.id" :value="item.id">{{ item.nome }}</option></select>
                </div>

            </div>
            <div class="col-sm-12">
                <div class="form-group">
                    <label>Área</label>
                    <select class="form-select" v-model="funcionalidade.sistema_id">
                                                                <option value="" disabled>Selecione o sistema</option>
                                                                <option v-for="item in sistemasDisponiveis" :key="item.id" :value="item.id">{{ item.nome }}</option></select>
                </div>

            </div>
    
            <div class="form-group">
                <div class="col-sm-12">
                    <button @click="cancelar" class="btn btn-default float-right">Cancelar</button>
                    <!-- <button @click="salvarFuncionalidade" class="btn btn-primary float-right mr-2">Salvar</button> -->
                    <b-button @click="salvarFuncionalidade" aria-hidden="true" class="btn btn-primary float-right mr-2">
                        <i v-if="loading" class="fas fa-spinner fa-spin"></i>
                        <span v-if="!loading">Salvar</span>
                        <span v-if="loading">&nbsp; Salvando...</span>
    
                    </b-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import sistemaService from '@/services/sistema-service';
import Sistema from '@/models/Sistema';
import Funcionalidade from '@/models/Funcionalidade'
import funcionalidadeService from '@/services/funcionalidade-service';
import { mapMutations } from 'vuex';
import FlashMessage from '@/components/flashMessage/FlashOKComponent.vue'


export default {
    name: "FuncionalidadeComponent",
    components: {
        FlashMessage
    },
    data() {
        return {
            funcionalidade: new Funcionalidade(),
            modoCadastro: true,
            sistemasDisponiveis: [],
            loading: false,
        }
    },

    computed: {
        flashMessage() {
            return this.$store.state.flashMessage
        }
    },

    mounted() {


        this.getAllSistemas()

        let id = this.$route.params.id;
        if (!id) {
            return;
        }


        this.modoCadastro = false
        this.obterFuncporId(id)


    },
    methods: {

        getAllSistemas() {
            sistemaService.obterTodos()
                .then(response => {
                    this.sistemasDisponiveis = response.data.data.map((p) => new Sistema(p));
                })
                .catch(error => {
                    console.log(error)
                })
        },


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
            this.loading = true

            funcionalidadeService.cadastrar(this.funcionalidade)
                .then(() => {

                    this.funcionalidade = new Funcionalidade();
                    this.loading = false

                    this.$store.commit('setFlashMessage', 'Tela cadastrada com sucesso!');
                    setTimeout(() => {
                        this.$store.commit('clearFlashMessage');
                    }, 5000)

                })
                .catch(error => {
                    this.loading = false
                    console.log(error);
                });
        },

        salvarFuncionalidade() {

            (this.modoCadastro) ? this.cadastrarFuncionalidade(): this.atualizarFuncionalidade();


        },
        atualizarFuncionalidade() {
            this.loading = true

            funcionalidadeService.atualizar(this.funcionalidade)
                .then(() => {
                        this.loading = false
                        this.$store.commit('setFlashMessage', 'Tela atualizada com sucesso!');
                        setTimeout(() => {
                            this.$store.commit('clearFlashMessage');
                        }, 5000)

                        this.$router.push({ name: "ControleDeFuncionalidade" });
                    }

                )

                .catch(error => {
                    this.loading = false
                    console.log(error);
                });


        },

        cancelar() {
            this.funcionalidade = new Funcionalidade();
            this.$router.push({ name: "ControleDeFuncionalidade" })
        },

        ...mapMutations(['setFlashMessage'])
    }
}
</script>

<style scoped>

</style>

