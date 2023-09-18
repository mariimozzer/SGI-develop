<template>
    <div class="container mt-2">
        <h3 class="titulo"> Vincular Usuário a Grupos </h3>
        <hr>
    
        <div class="d-flex p-2 justify-content-center row align-items-start gap-4 mb-2">
            <!-- COLUNA 1 -->
            <div class="align-content-center flex-wrap col-3">
                <Button :callback="removerUsuariosGrupo" v-if="grupoSelecionado"   value=" Remover"></Button>

                <label>Selecione um grupo: </label>
                <select class="combo form-select" v-model="grupoSelecionado" @change="handleGrupoSelecionadoChange">
                        <option value="" disabled>Selecione o grupo</option>
                         <option v-for="item in gruposDisponiveis" :key="item.id" :value="item.id">{{ item.nome }}</option></select>
    
                <br>
                <div class="mb-2">
                    <label>Usuários no grupo: </label>
    
                    
                        <div v-for="user in grupoUsuario" :key="user.id">
    
                            <label>
                                <input type="checkbox" :value="user.id" v-model="selectUsersToRemove" @click="toggleUserToRemove(user.id)"/>  {{ user.name }} 
                                </label>
                            </div>
                  

                </div>
    
    
            </div>
            
            
            
            <!-- COLUNA 2 -->
            <div class="align-content-end flex-flow col-md-3">
                <div class="mb-2" v-if="grupoSelecionado">
                    <Button :callback="adicionarUsuariosGrupo" v-if="grupoSelecionado"  value=" Adicionar"></Button>

                    <label>Usuários disponíveis: </label>
    
                    <div>
                        <input type="text" class="form-control" v-model="searchTerm" @input="searchUser" placeholder=" Pesquisar Usuario  " />
                        <br>
                        
                            <div v-for="user in searchedUser" :key="user.id">
                                <label>
                                                                                <input type="checkbox" :value="user.id" v-model="selectedUsersToAdd" @click="toggleUserToAdd(user.id)"/>
                                                                                 {{ user.name }}          
                                                                                </label>
                                                                            </div>
                       
                    </div>
    
                </div>
            </div>
    
           

        </div>
       
    </div>
</template>
  
<script>
import Button from '@/components/button/ButtonComponent.vue'
import Grupo from '@/models/Grupo'
import grupoService from '@/services/grupo-service'
import Pessoa from '@/models/Pessoa'
import pessoaService from '@/services/pessoa-service'
import Usuario from '@/models/Usuario'
import usuarioService from '@/services/usuario-service'
import grupoUsuarioService from '@/services/grupo_usuario-service'


export default {
    name: "VinculoDeGrupo",
    components: {
        Button

    },

    data() {
        return {

            gruposDisponiveis: [],
            grupoSelecionado: null,
            pessoas: [],
            usuarios: [],
            usuario: new Usuario(),
            grupos: [],
            grupoUsuario: [],
            selectedUsersToAdd: [],
            selectUsersToRemove: [],
            searchTerm: ""

        }
    },

    methods: {

        searchUser() {
            // Chamado quando o usuário digita para atualizar a lista filtrada
        },

        adicionarUsuarios() {
            this.$router.push({ name: "ControleDeUsuarios" })
        },

        removerUsuariosGrupo() {
            let selectUsersToRemove = this.selectUsersToRemove.map(user => user);
            selectUsersToRemove = parseFloat(selectUsersToRemove)
            const grupoSelecionado = this.grupoSelecionado;
            if (!grupoSelecionado || selectUsersToRemove.length === 0) {
                return;
            }

            grupoUsuarioService.deletarTeste(selectUsersToRemove, grupoSelecionado)
                .then(() => {
                    this.obterUsuarioPorGrupo(grupoSelecionado);
                    this.selectUsersToRemove = [];
                })
                .catch(error => {
                    console.log(error);
                });
        },

        adicionarUsuariosGrupo() {
            let selectedUsersToAdd = this.selectedUsersToAdd.map(user => user);
            selectedUsersToAdd = parseFloat(selectedUsersToAdd)
            const grupoSelecionado = this.grupoSelecionado;
            if (!grupoSelecionado || selectedUsersToAdd.length === 0) {
                return;
            }

            grupoUsuarioService
                .cadastrar(selectedUsersToAdd, grupoSelecionado)
                .then(() => {
                    this.obterUsuarioPorGrupo(grupoSelecionado);
                    this.selectedUsersToAdd = [];
                })
                .catch(error => {
                    console.log(error);
                });
        },

        toggleUserToAdd(userId) {
            if (this.selectedUsersToAdd.includes(userId)) {
                this.selectedUsersToAdd = this.selectedUsersToAdd.filter(id => id !== userId);
            } else {
                this.selectedUsersToAdd.push(userId);
            }
        },

        toggleUserToRemove(userId) {
            if (this.selectUsersToRemove.includes(userId)) {
                this.selectUsersToRemove = this.selectUsersToRemove.filter(id => id !== userId);
            } else {
                this.selectUsersToRemove.push(userId);
            }
        },

        getAllUsuarios() {
            usuarioService.obterTodos()
                .then(response => {
                    this.usuarios = response.data.map((p) => new Usuario(p));

                })
                .catch(error => {
                    console.log(error)
                })
        },
        getAllGrupos() {
            grupoService.obterTodos()
                .then((response) => {
                    this.gruposDisponiveis = response.data.data.map((p) => new Grupo(p));
                })
                .catch(error => {
                    console.log(error)
                })
        },

        getAllPessoas() {
            pessoaService.obterTodos()
                .then((response) => {
                    this.pessoas = response.data.data.map((p) => new Pessoa(p));
                })
                .catch(error => {
                    console.log(error)
                })
        },


        obterUsuarioPorGrupo(id) {
            grupoUsuarioService.obterPorId(id)
                .then(response => {
                    return this.grupoUsuario = response.data;
                })
                .catch(error => {
                    console.log(error)
                })
        },

        obterGrupoPorId(id) {
            grupoService.obterPorId(id)
                .then(response => {
                    this.grupos = new Grupo(response.data);
                })
                .catch(error => {
                    console.log(error)
                })
        },

        handleGrupoSelecionadoChange() {
            if (this.grupoSelecionado) {
                this.obterUsuarioPorGrupo(this.grupoSelecionado);
            }
        },

    },

    computed: {

        filteredUsers() {
            const selectedGroupId = parseInt(this.grupoSelecionado);
            return this.usuarios.filter(user => user.grupo_id === selectedGroupId);
        },

        usuariosParaAdicionar() {
            return this.usuarios.filter(user => !this.grupoUsuario.some(grupoUser => grupoUser.id === user.id));
        },

        searchedUser() {

            return this.usuariosParaAdicionar.filter((user) =>
                user.name.toLowerCase().includes(this.searchTerm.toLowerCase())

            );
        }
    },

    mounted() {
        this.getAllGrupos();
        this.getAllPessoas();
        this.getAllUsuarios();

    }
}
</script>

  