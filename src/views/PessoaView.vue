<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <h3 class="titulo">{{modoCadastro ? "Adicionar" : "Editar" }} Pessoa </h3>
                <hr/>
                <br>
            </div>
        </div>
        <div class="row">
            <br>
            <div class="col-sm-12">
                <div class="form-group">
                    <label for="nomeCompleto">Nome Completo</label>
                    <input id="nomeCompleto" v-model="pessoa.nomeCompleto" type="text" class="form-control">
                </div>
            </div>
            <div class="col-sm-12">
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
            <div class="col-sm-12">
                <div class="form-group">
                    <label for="dtNasc">Data de Nascimento</label>
                    <input id="dtNasc" type="date" v-model="pessoa.dtNasc" class="form-control">
                </div>
            </div>
            <div class="col-sm-12">
                <div class="form-group">
                    <label for="CPF">CPF</label>
                    <input id="CPF" type="text" v-model="pessoa.CPF" class="form-control">
                </div>
            </div>
            <div class="col-sm-12">
                <div class="form-group">
                    <label for="email">Email</label>
                    <input id="email" type="email" v-model="pessoa.email" class="form-control">
                </div>
            </div>
            <div class="col-sm-12">
                <div class="form-group">
                    <label for="celular">Celular</label>
                    <input id="celular" type="text" v-model="pessoa.celular" class="form-control">
                </div>
            </div>
            <div class="col-sm-12">
                <div class="form-group">
                    <label for="id_setor">Setor</label>
                    <select class="combo form-select" v-model="pessoa.id_setor">
                                            <option value="" disabled> Selecione o Setor </option>
                                            <option v-for="item in setores" :key="item.id" :value="item.id">{{ item.nome }}</option></select>
    
                </div>
            </div>
    
            <div class="col-sm-12">
  <div class="form-check">
    <input class="form-check-input" type="checkbox" id="checkUsuario" value="usuarioGerar" v-model="gerarUsuarioCheck" />
    <label class="form-check-label" for="checkUsuario">Gerar Usuario ? </label>
  </div>
</div>

    
    
            <div class="row">
    
                <div class="col-sm-12">
    
                    <button @click="cancelar" class="btn btn-default float-right">Cancelar</button>
                    <button @click="salvarPessoa" class="btn btn-primary float-right mr-2">Salvar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Pessoa from '@/models/Pessoa'
import pessoaService from '@/services/pessoa-service'
import Setor from '@/models/Setor'
import setorService from '@/services/setor-service'
import Usuario from '@/models/Usuario'
import usuarioService from '@/services/usuario-service'
import CryptoJS from 'crypto-js';



export default {
    name: "PessoaComponent",
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
            url: 'http://localhost:8081/vinculo-de-grupo'
        }
    },
    mounted() {
        this.getAllSetor()

        let id = this.$route.params.id;
  this.modoCadastro = !id; // Se não houver um ID, estamos no modo de cadastro
  this.gerarUsuarioCheck = this.modoCadastro; // Marcar por padrão se estivermos no modo de cadastro
  if (!this.modoCadastro) {
    this.obterPessoaPorId(id);
  }
},
    
    methods: {

        gerarHash() {
            const randomString = Math.random().toString(36).substring(2);
            const sha256Hash = CryptoJS.SHA256(randomString);
            this.hash = sha256Hash.toString(CryptoJS.enc.Hex);
            console.log('Generated Unique Hash:', this.hash);
        },

        getAllSetor() {
            setorService.obterTodos()
                .then((response) => {
                    this.setores = response.data.map((p) => new Setor(p));
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
        makeToast() {
            this.$bvToast.toast(`Usuário cadastrado com sucesso! \n Para dar permissões
            `, {
                href: this.url,
                title: 'Adicionar Usuário',
                autoHideDelay: 5000,
            })
        },

        async cadastrarPessoa() {
            this.usuario.email = this.pessoa.email
            this.usuario.name = this.pessoa.nomeCompleto

            if (this.gerarUsuarioCheck) {
                pessoaService.cadastrar(this.pessoa)
                    .then(() => {
                        this.pessoa = new Pessoa();
                    })


                usuarioService.cadastrar(this.usuario)
                    .then(() => {
                        this.usuario = new Usuario()
                        this.makeToast()
                    })

                    .catch(error => {
                        console.log(error);
                    });






            } else {

                pessoaService.cadastrar(this.pessoa)
                    .then(() => {
                        this.pessoa = new Pessoa();
                        this.$router.push({ name: "ControleDePessoas" })

                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        },

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
