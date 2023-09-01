<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <h1 class="titulo">{{modoCadastro ? "Adicionar" : "Editar" }} Pessoa </h1>
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
                    <label for="sexo">Sexo</label>
                    <input id="sexo" type="text" v-model="pessoa.sexo" class="form-control">
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
                    <input id="CPF" type="number" v-model="pessoa.CPF" class="form-control">
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
                    <select class="combo form-control" v-model="pessoa.id_setor">
                            <option value="" disabled> Selecione o Setor </option>
                            <option v-for="item in setores" :key="item.id" :value="item.id">{{ item.nome }}</option></select>



                </div>
    
            </div>
    
    
        </div>
    
        <div class="row">
    
        </div>
        <div class="row">
            <div class="col-sm-12">
                <hr>
                <h1>
                    <!-- {{ pessoa }} -->
                </h1>
                <br>
    
            </div>
            <div class="col-sm-12">
                <!-- <h1>check {{ continuarAdicionando }}</h1> -->
                <div v-show="modoCadastro" class="form-check-inline">
                    <label class="form-check-label">
                                                      <input type="checkbox" class="form-check-input" v-model="continuarAdicionando">
                                                      Continuar adicionando
                                                  </label>
                </div>
                <button @click="cancelar" class="btn btn-default float-right">Cancelar</button>
                <button @click="salvarPessoa" class="btn btn-primary float-right mr-2">Salvar</button>
            </div>
        </div>
    </div>
</template>

<script>
import Pessoa from '@/models/Pessoa'
import pessoaService from '@/services/pessoa-service'
import conversorDeData from '@/utils/conversor-data'
import Setor from '@/models/Setor'
import setorService from '@/services/setor-service'


export default {
    name: "PessoaComponent",
    data() {
        return {
            pessoa: new Pessoa(),
            modoCadastro: true,
            continuarAdicionando: false,
            setores: [],
            setorSelecionado: null
        }
    },
    mounted() {
        this.getAllSetor()

        let id = this.$route.params.id;
        if (!id)

            return;

        this.modoCadastro = false;
        this.obterPessoaPorId(id);
        //alert(this.$route.params.id)
    },
    methods: {

        getAllSetor(){
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
        cadastrarPessoa() {

            this.pessoa.dtNasc =
                conversorDeData.aplicarMascaraISOEmFormatoAmericano(this.pessoa.dtNasc);

            pessoaService.cadastrar(this.pessoa)
                .then(() => {
                    alert("Pessoa cadastrado com sucesso!");
                    this.pessoa = new Pessoa();


                    this.$router.push({ name: "ControleDePessoas" })

                })
                .catch(error => {
                    console.log(error);
                });
        },

        salvarPessoa() {

            (this.modoCadastro) ? this.cadastrarPessoa(): this.atualizarPessoa();
        },
        atualizarPessoa() {

            this.pessoa.dtNasc =
                conversorDeData.aplicarMascaraISOEmFormatoAmericano(this.pessoa.dtNasc);

            pessoaService.atualizar(this.pessoa)

                .then(() => {
                    alert("Pessoa atualizada com sucesso!");
                    this.$router.push({ name: "ControleDePessoas" });
                    console.log(this.pessoa)

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
