<template>
    <div class="container">
        <!-- Flash Message -->
        <FlashMessage></FlashMessage>
        <br>


        <div class="row">
            <div class="col-md-12">
                <h3 class="titulo"> Gerenciamento de Pessoas </h3>
                <hr>
            </div>
        </div>
        <div class="row sub-container">
            <div class="col-md-1">
                <b-button @click="adicionarPessoa" class="b-button">
                    <!-- <b-icon icon="person-badge"  aria-hidden="true"></b-icon>
                    <b-icon icon="plus"  aria-hidden="true"></b-icon> -->
                    <i class="fa-solid fa-plus"></i>

                </b-button>
            </div>
        </div>
        <br>
        <div class="row">
            <div class="col-md-4">
                <b-input-group class="mb-2">
                    <b-input-group-prepend is-text>
                        <b-icon icon="search"></b-icon>
                    </b-input-group-prepend>
                    <b-form-input type="text" placeholder="Pesquisar pessoa por nome" v-model="filtro"></b-form-input>
                </b-input-group>
            </div>
            <br>
            <br>
            <div class="col-md-12">
                <table class="table table-hover ">
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
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in paginatedData" :key="item.id">
    
                            <td>{{ item.id }}</td>
                            <td>{{ item.nomeCompleto }}</td>
                            <td>{{ item.sexo }}</td>
                            <td>{{ item.dtNasc | data}}</td>
                            <td>{{ item.CPF }}</td>
                            <td>{{ item.email}}</td>
                            <td>{{ item.celular }}</td>
                            <td>{{ item.id_setor }}</td>
                            <td class="icon-tabela" style="text-align: center;">
                                <i @click="editarPessoa(item)" class="fa fa-edit icones-tabela"></i> |
                                <i @click="excluirPessoa(item)" class="fa fa-trash icones-tabela"></i>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <nav>
                    <ul class="pagination">
                        <li class="page-item" :class="{disabled: currentPage === 0}">
                            <a class="page-link" href="#" aria-label="Previous" @click="prevPage">
                                  <span aria-hidden="true">&laquo;</span>
                                </a>
                        </li>
                        <li v-for="n in numberOfPages" :key="n" class="page-item" :class="{active: n === currentPage}">
                            <a class="page-link" href="#" @click="setPage(n)">{{ n + 1 }}</a>
                        </li>
                        <li class="page-item" :class="{disabled: currentPage === numberOfPages - 1}">
                            <a class="page-link" href="#" aria-label="Next" @click="nextPage">
                                  <span aria-hidden="true">&raquo;</span>
                                </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </div>
</template>

  
<script>
import pessoaService from '@/services/pessoa-service'
import Pessoa from '@/models/Pessoa'
import conversorDeData from '../utils/conversor-data'
import FlashMessage from '../components/flashMessage/FlashOKComponent.vue'

export default {
    name: "ControleDePessoas",
    components: {
        FlashMessage
    },
    filters: {
        data(data) {
            return conversorDeData.dataConversor(data);
        }
    },
    data() {
        return {

            pessoas: [],
            info: null,
            currentPage: 0,
            itemsPerPage: 10,
            filtro: ''

        };
    },

    computed: {
        paginatedData() {
            const startIndex = this.currentPage * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            let pessoasFiltradas = this.pessoas.filter(item => {
                return item.nomeCompleto.toLowerCase().includes(this.filtro.toLowerCase());
            });
            return pessoasFiltradas.slice(startIndex, endIndex);
        },
        
        numberOfPages() {
            return Math.ceil(this.pessoas.length / this.itemsPerPage);
        },
    },


    methods: {

        getAll() {
            pessoaService.obterTodos()
                .then((response) => {
                    this.pessoas = response.data.data.map((p) => new Pessoa(p));
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
            // if (confirm(`Deseja excluir" ${pessoa.id} - ${pessoa.nomeCompleto}"`)) {

            pessoaService.deletar(pessoa.id)
                .then(() => {
                    let indice = this.pessoas.findIndex(p => p.id == pessoa.id);
                    this.pessoas.splice(indice, 1);

                    // setTimeout(() => {
                    //     alert("Pessoa excluida com sucesso!");
                    // }, 500);

                })
                .catch(error => {
                    console.log(error);
                });

            // }

        },
        setPage(pageNumber) {
            this.currentPage = pageNumber;
        },
        prevPage() {
            if (this.currentPage > 0) {
                this.currentPage--;
            }
        },
        nextPage() {
            if (this.currentPage < this.numberOfPages - 1) {
                this.currentPage++;
            }
        },
    },

    mounted() {
        this.getAll()
    }

};
</script>

