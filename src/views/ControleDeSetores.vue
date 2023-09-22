<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <h3 class="titulo"> Gerenciamento de Setores </h3>
                <hr>
            </div>
        </div>
        <div class="row sub-container">
            <div class="col-sm-2">
                <b-button @click="adicionarSetor" class="b-button">
                    <b-icon icon="plus-circle" aria-hidden="true"></b-icon>
                    Adicionar
                </b-button>
            </div>
        </div>
        <br>
        <div class="container">
            <div>
                <table id="tabela" style="width: 100%;" class="table table-hover ">
    
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nome </th>
                            <th></th>
                        </tr>
    
    
                    </thead>
    
    
                    <tbody>
    
                        <tr v-for="item in paginatedData" :key="item.id">
    
                            <td>{{ item.id }}</td>
                            <td>{{ item.nome }}</td>
    
                            <td class="icon-tabela" style="text-align: center;">
                                <i @click="editarSetor(item)" class="fa fa-edit icones-tabela"></i> |
                                <i @click="excluirSetor(item)" class="fa fa-trash icones-tabela"></i>
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
import setorService from '@/services/setor-service'
import Setores from '@/models/Setor'
import conversorDeData from '../utils/conversor-data'

export default {
    name: "ControleDeSetores",
    components: {

    },
    filters: {
        data(data) {
            return conversorDeData.dataConversor(data);
        }
    },
    data() {
        return {

            setores: [],
            info: null,
            currentPage: 0,
            itemsPerPage: 10

        };
    },

    computed: {
        paginatedData() {
            const startIndex = this.currentPage * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            return this.setores.slice(startIndex, endIndex);
        },
        numberOfPages() {
            return Math.ceil(this.setores.length / this.itemsPerPage);
        },
    },

    methods: {

        getAll() {
            setorService.obterTodos()
                .then((response) => {
                    this.setores = response.data.map((p) => new Setores(p));
                    //console.log(this.setores)
                })
                .catch(error => {
                    console.log(error)
                })
        },

        adicionarSetor() {
            this.$router.push({ name: "AdicionarSetor" })

        },

        editarSetor(setor) {
            this.$router.push({ name: "EditarSetor", params: { id: setor.id } })
        },

        excluirSetor(setor) {
            if (confirm(`Deseja excluir" ${setor.id} - ${setor.nome}"`)) {

                setorService.deletar(setor.id)
                    .then(() => {
                        let indice = this.setores.findIndex(p => p.id == setor.id);
                        this.setores.splice(indice, 1);

                        setTimeout(() => {
                            alert("Setor excluido com sucesso!");
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

    },

    mounted() {
        this.getAll()


    }

};
</script>

<style scoped>

</style>