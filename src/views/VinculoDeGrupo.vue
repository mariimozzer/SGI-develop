
<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <h2 class="titulo"> Vincular Grupos </h2>
                <hr>
                <br>
            </div>
            <div>
                <label>Selecione um grupo: </label>
                <select class="combo" v-model="grupoSelecionado" @change="handleGrupoSelecionadoChange">
                                                                                                            <option value="" disabled>Selecione o grupo</option>
                                                                                                            <option v-for="item in gruposDisponiveis" :key="item.id" :value="item.id">ID: {{item.id}} Nome: {{ item.nome }}</option></select>
            </div>
            <hr>
            <br>
            <div>
    
                <label>Usuários no grupo: </label>
                <ul>
                    <li v-for="user in grupoUsuario" :key="user.id">
                        <label>
                                                                                <input type="checkbox" :value="user.id" v-model="selectUsersToRemove" @change="toggleUserToRemove(user.id)"/> ID: {{ user.id }} Nome: {{ user.name }} 
                                                                            </label>
                    </li>
                    {{ selectUsersToRemove }}
                </ul>
            </div>
            <hr>
            <br>
            <div>
                <label>Usuários disponíveis: </label>
                <div>
                    <ul>
                        <li v-for="user in usuariosParaAdicionar" :key="user.id">
                            <label>
                                                                        <input type="checkbox" :value="user.id" v-model="selectedUsersToAdd" @change="toggleUserToAdd(user.id)"/>
                                                                        ID: {{ user.id }} Nome: {{ user.name }}          
                                                                        </label>
                        </li>
                    </ul>
                    {{ selectedUsersToAdd }}
                </div>
    
    
            </div>
            <div>
    
    
            </div>
            <hr>
            <br>
            <div>
                <Button :callback="adicionarUsuarios" value=" Adicionar Usuários"></Button>
                <Button :callback="adicionarUsuariosGrupo" value=" Adicionar Usuários em Grupo"></Button>
                <Button :callback="removerUsuariosGrupo" value=" Remover Usuários em Grupo"></Button>
    
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

        }
    },

    methods: {

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
        }
    },

    mounted() {
        this.getAllGrupos();
        this.getAllPessoas();
        this.getAllUsuarios();

    }
}
</script>

