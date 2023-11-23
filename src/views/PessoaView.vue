<template>
    <div class="container">
        <FlashMessage></FlashMessage>
        <div class="row">
            <div class="col-sm-12">
                <h3 class="titulo">{{modoCadastro ? "Adicionar" : "Editar" }} Pessoa </h3>
                <hr/>
    
            </div>
        </div>
        <div class="row">
            <br>
            <div class="col-sm-10">
                <div class="form-group">
                    <label for="nomeCompleto">Nome Completo</label>
                    <input id="nomeCompleto" v-model="pessoa.nomeCompleto" type="text" class="form-control">
                </div>
            </div>
            <div class="col-sm-2">
                <div class="form-group">
                    <label>Sexo</label>
                    <br>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" id="feminino" value="f" v-model="pessoa.sexo">
                        <label class="form-check-label" for="feminino"> Feminino </label>
                        <br>
                        <input class="form-check-input" type="radio" id="masculino" value="m" v-model="pessoa.sexo">
                        <label class="form-check-label" for="masculino"> Masculino </label>
                    </div>
                </div>
            </div>
            <div class="col-sm-4">
                <div class="form-group">
                    <label for="dtNasc">Data de Nascimento</label>
                    <input id="dtNasc" type="date" v-model="pessoa.dtNasc" class="form-control">
                </div>
            </div>
            
            <div class="col-sm-4">
                <div class="form-group">
                    <label for="CPF">CPF</label>
                    <input id="CPF" type="text" v-model="pessoa.CPF" pattern="\d{3}\.?\d{3}\.?\d{3}-?\d{2}" class="form-control">
                </div>
            </div>
            <div class="col-sm-6">
                <div class="form-group">
                    <label for="email">Email</label>
                    <input id="email" type="email" v-model="pessoa.email" class="form-control">
                </div>
            </div>
            <div class="col-sm-4">
                <div class="form-group">
                    <label for="celular">Celular</label>
                    <input id="celular" type="text" v-model="pessoa.celular" class="form-control">
                </div>
            </div>
            <div class="col-sm-4">
                <div class="form-group">
                    <label for="id_setor">Setor</label>
                    <select class="combo form-select" v-model="pessoa.id_setor">
                                                <option value="" disabled> Selecione o Setor </option>
                                                <option v-for="item in setores" :key="item.id" :value="item.id">{{ item.nome }}</option>
                                        </select>
                </div>
            </div>
            <br><br>
            <div class="col-sm-8">
                <div class="form-group">
                    <label for="avatar">Selecione uma foto:</label><br>
                    <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" />
                </div>
            </div>
    
            <div class="col-sm-12">
                <div class="form-check checkbox">
                    <br>
                    <input class="form-check-input" type="checkbox" id="checkUsuario" value="usuarioGerar" v-model="gerarUsuarioCheck" />
                    <label class="form-check-label" for="checkUsuario">Gerar Usuario ? </label>
                </div>
            </div>
            <div class="row">
    
                <div class="col-sm-12">
                    <button @click="cancelar" class="btn btn-default float-right">Cancelar</button>
                    <b-button @click="salvarPessoa" aria-hidden="true" class="btn btn-primary float-right mr-2">
                        <i v-if="loading" class="fas fa-spinner fa-spin"></i>
                        <span v-if="!loading">Salvar</span>
                        <span v-if="loading"> &nbsp; Salvando...</span>
    
                    </b-button>
                    <br>
                    <!-- <button @click="salvarPessoa" class="btn btn-primary float-right mr-2" ><i v-if="!loading" class="fas fa-spiner fa-spin"></i>Salvar</button> -->
                </div>
    
            </div>
    
        </div>
        <br>
    </div>
</template>

<script>
import Pessoa from '@/models/Pessoa'
import pessoaService from '@/services/pessoa-service'
import Setor from '@/models/Setor'
import setorService from '@/services/setor-service'
import Usuario from '@/models/Usuario'
import usuarioService from '@/services/usuario-service'
import FlashMessage from '@/components/flashMessage/FlashOKComponent.vue'
// import CryptoJS from 'crypto-js';
import { mapMutations } from 'vuex'
import axios from 'axios'


export default {
    name: "PessoaComponent",
    components: {
        FlashMessage
    },
    props: {
        nome: String
    },
    data() {
        return {
            pessoa: new Pessoa(),
            usuario: new Usuario(),
            gerarUsuarioCheck: '',
            modoCadastro: true,
            continuarAdicionando: false,
            setores: [],
            setorSelecionado: null,
            hash: '',
            url: 'http://localhost:8081/vinculo-de-grupo',
            cpfInput: '',
            telefoneInput: '',
            emailCriar: '',
            loading: false
        }
    },


    mounted() {
        this.getAllSetor()

        let id = this.$route.params.id;
        this.modoCadastro = !id;
        this.gerarUsuarioCheck = this.modoCadastro;
        if (!this.modoCadastro) {
            this.obterPessoaPorId(id);
        }
    },

    methods: {
        clearFlashMessage() {
            setTimeout(() => {
                this.setFlashMessage(null);
            }, 3000);
        },

        // gerarHash() {
        //     const randomString = Math.random().toString(36).substring(2);
        //     const sha256Hash = CryptoJS.SHA256(randomString);
        //     this.hash = sha256Hash.toString(CryptoJS.enc.Hex);
        //     console.log('Generated Unique Hash:', this.hash);
        // },

        getAllSetor() {
            setorService.obterTodos()
                .then((response) => {
                    this.setores = response.data.data.map((p) => new Setor(p));
                })
                .catch(error => {
                    console.log(error)
                })
        },

        obterPessoaPorId(id) {
            pessoaService.obterPorId(id)
                .then(response => {
                    this.pessoa = new Pessoa(response.data);
                })
                .catch(error => {
                    console.log(error)
                })
        },

        cadastrarPessoa() {
            this.loading = true
            this.usuario.email = this.pessoa.email
            this.usuario.name = this.pessoa.nomeCompleto
            this.emailCriar = this.usuario.email



            if (this.gerarUsuarioCheck) {
                pessoaService.cadastrar(this.pessoa)
                    .then(() => {
                        this.pessoa = new Pessoa();
                    })


                usuarioService.cadastrar(this.usuario)
                    .then(() => {
                        this.usuario = new Usuario()
                        axios.post('http://192.168.0.6:8000/api/enviar-codigo', {
                            email: this.emailCriar
                        }).then(res => {
                            this.$store.commit('setFlashMessage', 'Usuário criado com sucesso! \n E-mail com informações de login foi enviado!');
                            this.$router.push({ name: "ControleDePessoas" })
                            setTimeout(() => {
                                this.$store.commit('clearFlashMessage');
                            }, 5000)
                            this.loading = false;
                            console.log(res)
                        })
                    })


                    .catch(error => {
                        this.loading = false
                        console.log(error);
                    });

            } else {

                pessoaService.cadastrar(this.pessoa)
                    .then(() => {
                        this.loading = true
                        this.pessoa = new Pessoa();
                        this.$router.push({ name: "ControleDePessoas" })
                    })
                    .catch(error => {
                        this.loading = false
                        console.log(error);
                    });
            }
        },

        ...mapMutations(['setFlashMessage']),

        salvarPessoa() {

            (this.modoCadastro) ? this.cadastrarPessoa(): this.atualizarPessoa();
        },
        atualizarPessoa() {

            pessoaService.atualizar(this.pessoa)

                .then(() => {
                    this.$router.push({ name: "ControleDePessoas" });

                })
                .catch(error => {
                    console.log(error);
                });
        },

        cancelar() {
            this.pessoa = new Pessoa();
            this.$router.push({ name: "ControleDePessoas" })
        }
    }
}
</script>

<style scoped>

</style>
