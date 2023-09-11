<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <h3 class="titulo">{{modoCadastro ? "Adicionar" : "Editar" }} Usuário </h3>
                <hr/>
                <br>
            </div>
        </div>
        <div class="row">
    
            <div class="col-sm-12">
                <div class="form-group">
                    <label for="nome">Nome</label>
                    <input id="nome" type="text" v-model="usuario.name" class="form-control">
                </div>
            </div>
            <div class="col-sm-12">
                <div class="form-group">
                    <label for="email">Email</label>
                    <input id="email" type="text" v-model="usuario.email" class="form-control">
                </div>
            </div>
            <div class="col-sm-12">
                <div class="form-group">
                    <label for="password">Password</label>
                    <input id="password" type="text" v-model="usuario.password" class="form-control">
                </div>
            </div>
            <div class="col-sm-12">
                <div class="form-group">
                    <label for="grupo_id">Grupo</label>
                    <select class="form-select combo" v-model="usuario.grupo_id">
                                    <option value="" disabled>Selecione o grupo</option>
                                    <option v-for="item in grupos" :key="item.id" :value="item.id">{{ item.nome }}</option></select>
    
    
    
                </div>
                <button @click="cancelar" class="btn btn-default float-right">Cancelar</button>
                <button @click="salvarUsuario" class="btn btn-primary float-right mr-2">Salvar</button>
    
    
            </div>
    
    
        </div>
    </div>
</template>

<script>
import Usuario from '@/models/Usuario'
import usuarioService from '@/services/usuario-service';
import grupoService from '@/services/grupo-service';
import Grupo from '@/models/Grupo'


export default {
    name: "UsuarioComponent",
    data() {
        return {
            usuario: new Usuario(),
            modoCadastro: true,
            grupos: [],
            grupoSelecionado: null
        }
    },


    mounted() {

        this.getAllGrupos()

        let id = this.$route.params.id;
        if (!id)

            return;

        this.modoCadastro = false;
        this.obterUsuarioPorId(id);

    },
    methods: {

        getAllGrupos() {
            grupoService.obterTodos()
                .then(response => {
                    this.grupos = response.data.data.map((p) => new Grupo(p));
                })
                .catch(error => {
                    console.log(error)
                })

        },

        obterUsuarioPorId(id) {
            usuarioService.obterPorId(id)
                .then(response => {
                    this.usuario = new Usuario(response.data);
                })
                .catch(error => {
                    console.log(error)
                })
        },
        cadastrarUsuario() {

            usuarioService.cadastrar(this.usuario)
                .then(() => {

                    this.usuario = new Usuario();
                    this.$router.push({ name: "ControleDeUsuarios" })

                })
                .catch(error => {
                    console.log(error);
                });
        },

        salvarUsuario() {

            (this.modoCadastro) ? this.cadastrarUsuario(): this.atualizarUsuario();
        },
        atualizarUsuario() {

            usuarioService.atualizar(this.usuario)
                .then(() => {
                    alert("Usuario atualizada com sucesso!");
                    this.$router.push({ name: "ControleDeUsuarios" });

                })
                .catch(error => {
                    console.log(error);
                });
        },

        cancelar() {
            this.usuario = new Usuario();
            this.$router.push({ name: "ControleDeUsuarios" })
        }
    }
}
</script>

<style scoped>

</style>

