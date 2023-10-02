<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <h3 class="titulo"> Gerenciamento de Grupo </h3>
                <hr>
            </div>
        </div>
        <div class="row sub-container">
            <div class="col-sm-2">
                <b-button @click="adicionarGrupo" class="b-button">
                    <b-icon icon="plus-circle" aria-hidden="true"></b-icon>
                    
                </b-button>
    
            </div>
        </div>
        <br>
        <div class="row">
    
            <div class="col-md-4">
                <!-- Filtro -->
        
                <b-input-group class="mb-2">
                   
                   <b-input-group-prepend is-text>
                       <b-icon icon="search"></b-icon>
                   </b-input-group-prepend>
                   <b-form-input type="text" placeholder="Pesquisar grupo por nome" v-model="filtro"></b-form-input>

               </b-input-group>
            </div>
            <br>
            <br>
            <div class="col-sm-12">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome </th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item) in paginatedData" :key="item.id">
                            <td>{{ item.id }}</td>
                            <td>{{ item.nome }}</td>
                            <td class="icon-tabela">
                                <i @click="editarGrupo(item)" class="fa fa-edit icones-tabela"></i> |
                                <i @click="excluirGrupo(item)" class="fa fa-trash icones-tabela"></i>
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
import grupoService from '@/services/grupo-service'
import Grupo from '@/models/Grupo'
import conversorDeData from '../utils/conversor-data'

export default {
    name: "ControleDeGrupo",
    components: {


    },
    filters: {
        data(data) {
            return conversorDeData.dataConversor(data);
        }
    },
    data() {
        return {
            grupos: [],
            currentPage: 0,
            itemsPerPage: 5,
            filtro: ''
        };
    },
    computed: {
        paginatedData() {
            const startIndex = this.currentPage * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            let grupoFiltrado = this.grupos.filter(item => {
                return item.nome.toLowerCase().includes(this.filtro.toLowerCase());
            });
            return grupoFiltrado.slice(startIndex, endIndex);


        },
        numberOfPages() {
            return Math.ceil(this.grupos.length / this.itemsPerPage);
        },
    },
    methods: {
        getAll() {
            grupoService.obterTodos()
                .then((response) => {
                    this.grupos = response.data.data.map((p) => new Grupo(p));
                })
                .catch(error => {
                    console.log(error)
                })
        },
        vincularGrupo() {
            this.$router.push({ name: "VincularGrupo" })
        },
        adicionarGrupo() {
            this.$router.push({ name: "AdicionarGrupo" })
        },
        editarGrupo(grupo) {
            this.$router.push({ name: "EditarGrupo", params: { id: grupo.id } })
        },
        excluirGrupo(grupo) {
            // if (confirm(`Deseja excluir" ${grupo.id} - ${grupo.nome}"`)) {
            grupoService.deletar(grupo.id)
                .then(() => {
                    let indice = this.grupos.findIndex(p => p.id == grupo.id);
                    this.grupos.splice(indice, 1);

                    //     setTimeout(() => {
                    //         alert("Grupo excluido com sucesso!");
                    //     }, 500);

                })
                .catch(error => {
                    console.log(error);
                });

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
  