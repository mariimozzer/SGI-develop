<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <h2 class="titulo"> Gerenciamento de Usuários </h2>
                <hr>
            </div>
        </div>
        <div class="row sub-container">
            <div class="col-sm-2">
                <Button :callback="adicionarUsuario" value=" Adicionar "></Button>
            </div>
        </div>
    
        <div class="row">
            <div class="col-sm-16">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome </th>
                            <th>Email </th>
                            <th>Grupo ID </th>
                        </tr>
                    </thead>
                    <tbody>
    
                        <tr v-for="item in usuarios" :key="item.id">
    
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
            </div>
        </div>
    </div>
</template>

  
<script>
import Button from '../components/button/ButtonComponent.vue'
import usuarioService from '@/services/usuario-service'
import Usuários from '@/models/Usuario'


export default {
    name: "ControleDeUsuarios",
    components: {
        Button
    },
    filters: {
       
    },
    data() {
        return {

            usuarios: [],
            info: null

        };
    },

    methods: {

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
            if (confirm(`Deseja excluir" ${usuario.id} - ${usuario.name}"`)) {

                usuarioService.deletar(usuario.id)
                    .then(() => {
                        let indice = this.usuarios.findIndex(p => p.id == usuario.id);
                        this.usuarios.splice(indice, 1);

                        setTimeout(() => {
                            alert("Usuário excluido com sucesso!");
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

</style>