<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <h1 class="titulo">{{modoCadastro ? "Adicionar" : "Editar" }} Usuário </h1>
                <hr/>
                <br>
            </div>
        </div>
        <div class="row">
            <h1>{{ usuario }}</h1>
            <div class="col-sm-2">
                <div class="form-group">
                    <label for="id">ID</label>
                    <input id="id" type="text" v-model="usuario.id" disabled class="form-control">
                </div>
            </div>
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
                    <label for="grupo_id">Grupo ID</label>
                    <input id="grupo_id" type="text" v-model="usuario.grupo_id" class="form-control">
                </div>
            </div>
    
            <button @click="cancelar" class="btn btn-default float-right">Cancelar</button>
            <button @click="salvarUsuario" class="btn btn-primary float-right mr-2">Salvar</button>
        </div>
    </div>
</template>

<script>
import Usuario from '@/models/Usuario'
import usuarioService from '@/services/usuario-service';


export default {
    name: "UsuarioComponent",
    data() {
        return {
            usuario: new Usuario(),
            modoCadastro: true
        }
    },


    mounted() {
        let id = this.$route.params.id;
        if (!id)

            return;

        this.modoCadastro = false;
        this.obterUsuarioPorId(id);

    },
    methods: {
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
                    console.log(this.usuario)
                    //alert("Setor cadastrado com sucesso!");
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

