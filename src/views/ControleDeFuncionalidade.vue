<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <h3 class="titulo"> Gerenciamento de Telas </h3>
                <hr>
            </div>
        </div>
        <div class="row sub-container">
    
            <div class="col-sm-2">
                <b-button @click="adicionarFuncionalidade" class="b-button">
                    <b-icon icon="plus-circle" aria-hidden="true"></b-icon>
    
                </b-button>
            </div>
        </div>
        <br>
    
        <div class="row">
            <div class="col-sm-4">
                <!-- Filtro -->
                <b-input-group class="mb-2">
                    <b-input-group-prepend is-text>
                        <b-icon icon="search"></b-icon>
                    </b-input-group-prepend>
                    <b-form-input type="text" placeholder="Pesquisar telas por nome" v-model="filtro"></b-form-input>
                </b-input-group>
            </div>
            <br>
            <br>
            <div class="col-sm-16">

                <table class="table table-hover ">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>URL</th>
                            <th>Menu Principal</th>
                            <th>ID Sistema</th>
                            <th></th>
    
                        </tr>
                    </thead>
                    <tbody>
    
                        <tr v-for="item in paginatedData" :key="item.id">
    
                            <td>{{ item.id }}</td>
                            <td>{{ item.nome }}</td>
                            <td>{{ item.URL }}</td>
                            <td>{{ item.menu }}</td>
                            <td>{{ item.sistema_id }}</td>
                            <td class="icon-tabela">
                                <i @click="editarFuncionalidade(item)" class="fa fa-edit icones-tabela"></i> |
                                <i @click="excluirFuncionalidade(item)" class="fa fa-trash icones-tabela"></i>
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
        <br>
        <br>
    </div>
</template>

  
<script>
import funcionalidadeService from '@/services/funcionalidade-service'
import Funcionalidade from '@/models/Funcionalidade'

export default {
    name: "ControleDeFuncionalidades",
    components: {},

    data() {
        return {

            funcionalidades: [],
            info: null,
            currentPage: 0,
            itemsPerPage: 10,
            filtro: '',


        };
    },
    computed: {
        paginatedData() {
            const startIndex = this.currentPage * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            let funcionalidadesFiltradas = this.funcionalidades.filter(item => {
                return item.nome.toLowerCase().includes(this.filtro.toLowerCase());
            });
            return funcionalidadesFiltradas.slice(startIndex, endIndex);
        },
        numberOfPages() {
            return Math.ceil(this.funcionalidades.length / this.itemsPerPage);
        },

    },

    methods: {

        vincularFuncionalidade() {
            this.$router.push({ name: "VincularFuncionalidade" })

        },


        getAllFuncionalidades() {
            funcionalidadeService.obterTodos()
                .then((response) => {
                    this.funcionalidades = response.data.data.map((p) => new Funcionalidade(p));
                    // console.log(this.funcionalidades)
                })
                .catch(error => {
                    console.log(error)
                })
        },

        adicionarFuncionalidade() {
            this.$router.push({ name: "AdicionarFuncionalidade" })

        },

        editarFuncionalidade(funcionalidade) {
            this.$router.push({ name: "EditarFuncionalidade", params: { id: funcionalidade.id } })
        },

        excluirFuncionalidade(funcionalidade) {
            if (confirm(`Deseja excluir" ${funcionalidade.id} - ${funcionalidade.nome}"`)) {

                funcionalidadeService.deletar(funcionalidade.id)
                    .then(() => {
                        let indice = this.funcionalidades.findIndex(p => p.id == funcionalidade.id);
                        this.funcionalidades.splice(indice, 1);

                        setTimeout(() => {
                            alert("Funcionalidade excluida com sucesso!");
                        }, 500);

                    })
                    .catch(error => {
                        console.log(error);
                    });

            }

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
        changePage() {
            this.currentPage = this.selectedPage;
        },
    },

    mounted() {
        this.getAllFuncionalidades()


    }

};
</script>

<style scoped>
.input-group {
    max-width: 300px;
    /* Ajuste conforme necessário */
}
</style>

