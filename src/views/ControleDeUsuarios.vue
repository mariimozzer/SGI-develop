<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <h3 class="titulo"> Gerenciamento de Usuários </h3>
                <hr>
            </div>
        </div>
        <div class="row sub-container">
            <div class="col-sm-2">
                <b-button @click="adicionarUsuario" class="b-button">
                    <b-icon icon="plus-circle" aria-hidden="true"></b-icon>
                    Adicionar
                </b-button>
            </div>
        </div>
        <br>
        <div class="row">
            <div class="col-sm-16">
                <table class="table table-hover ">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome </th>
                            <th>Email </th>
                            <th>Grupo ID </th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
    
                        <tr v-for="item in paginatedData" :key="item.id">
    
                            <td>{{ item.id }}</td>
                            <td>{{ item.name }}</td>
                            <td>{{ item.email }}</td>
                            <td>{{ item.grupo_id }}</td>
    
                            <td class="icon-tabela">
                                <i @click="editarUsuario(item)" class="fa fa-edit icones-tabela"></i> |
                                <i @click="excluirUsuario(item)" class="fa fa-trash icones-tabela"></i>
    
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
import usuarioService from '@/services/usuario-service'
import Usuários from '@/models/Usuario'
import Grupo from '@/models/Grupo'
import grupoService from '@/services/grupo-service'

export default {
    name: "ControleDeUsuarios",
    components: {

    },
    filters: {

    },
    data() {
        return {

            usuarios: [],
            grupoUsuario: [],
            info: null,
            currentPage: 0,
            itemsPerPage: 10,

        };
    },

    computed: {
        paginatedData() {
            const startIndex = this.currentPage * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            return this.usuarios.slice(startIndex, endIndex);
        },
        numberOfPages() {
            return Math.ceil(this.usuarios.length / this.itemsPerPage);
        },
    },

    methods: {

        obterGrupoPorId(id) {
            grupoService.obterPorId(id)
                .then(response => {
                    this.grupoUsuario = new Grupo(response.data);
                })
                .catch(error => {
                    console.log(error)
                })
        },

        getAll() {
            usuarioService.obterTodos()
                .then((response) => {
                    this.usuarios = response.data.map((p) => new Usuários(p));
                })
                .catch(error => {
                    console.log(error)
                })
        },

        adicionarUsuario() {
            this.$router.push({ name: "AdicionarUsuario" })

        },

        editarUsuario(usuario) {
            this.$router.push({ name: "EditarUsuario", params: { id: usuario.id } })
        },

        excluirUsuario(usuario) {
            // if (confirm(`Deseja excluir" ${usuario.id} - ${usuario.name}"`)) {

            usuarioService.deletar(usuario.id)
                .then(() => {
                    let indice = this.usuarios.findIndex(p => p.id == usuario.id);
                    this.usuarios.splice(indice, 1);

                    // setTimeout(() => {
                    //     alert("Usuário excluido com sucesso!");
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

<style scoped>

</style>