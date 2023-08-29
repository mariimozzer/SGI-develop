<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <h2 class="titulo"> Gerenciamento de Pessoas </h2>
                <hr>
            </div>
        </div>
        <div class="row sub-container">
            <div class="col-sm-2">
                <Button :callback="adicionarPessoa" value=" Adicionar "></Button>
            </div>
        </div>
    
        <div class="row">
            <div class="col-sm-16">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome Completo</th>
                            <th>Sexo</th>
                            <th>Data de Nascimento</th>
                            <th>CPF</th>
                            <th>Email</th>
                            <th>Celular</th>
                            <th>ID Setor</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in pessoas" :key="item.id">
    
                            <td>{{ item.id }}</td>
                            <td>{{ item.nomeCompleto }}</td>
                            <td>{{ item.sexo }}</td>
                            <td>{{ item.dtNasc | data}}</td>
                            <td>{{ item.CPF }}</td>
                            <td>{{ item.email}}</td>
                            <td>{{ item.celular }}</td>
                            <td>{{ item.id_setor }}</td>
                            <td class="icon-tabela">
                                <i @click="editarPessoa(item)" class="fa fa-edit icones-tabela"></i> |
                                <i @click="excluirPessoa(item)" class="fa fa-trash icones-tabela"></i>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

  
<script>
import Button from '../components/button/ButtonComponent.vue'
import pessoaService from '@/services/pessoa-service'
import Pessoa from '@/models/Pessoa'
import conversorDeData from '../utils/conversor-data'

export default {
    name: "ControleDePessoas",
    components: {
        Button
    },
    filters: {
        data(data) {
            return conversorDeData.dataConversor(data);
        }
    },
    data() {
        return {

            pessoas: [],
            info: null

        };
    },

    methods: {

        getAll() {
            pessoaService.obterTodos()
                .then((response) => {
                    this.pessoas = response.data.data.map((p) => new Pessoa(p));
                    //console.log(this.pessoas)
                })
                .catch(error => {
                    console.log(error)
                })
        },

        adicionarPessoa() {
            this.$router.push({ name: "AdicionarPessoa" })

        },

        editarPessoa(pessoa) {
            this.$router.push({ name: "EditarPessoa", params: { id: pessoa.id } })
        },

        excluirPessoa(pessoa) {
            if (confirm(`Deseja excluir" ${pessoa.id} - ${pessoa.nomeCompleto}"`)) {

                pessoaService.deletar(pessoa.id)
                    .then(() => {
                        let indice = this.pessoas.findIndex(p => p.id == pessoa.id);
                        this.pessoas.splice(indice, 1);

                        setTimeout(() => {
                            alert("Pessoa excluida com sucesso!");
                        }, 500);

                    })
                    .catch(error => {
                        console.log(error);
                    });

            }

        },
    },

    mounted() {
        this.getAll()
    }

};
</script>

<style scoped>
.icon-tabela {
    margin: 5px;
    cursor: pointer;
    color: dimgray;
}
</style>