<template>
    <div class="box-login">
        <h3 class="titulo"> Esqueceu Senha </h3>
        <hr>
        <br>
        <b-input-group class="mb-2">
            <b-input-group-prepend is-text>
                <b-icon icon="envelope-fill"></b-icon>
            </b-input-group-prepend>
            <b-form-input type="text" placeholder="Digite seu Email"></b-form-input>
        </b-input-group>
        <b-button @click="resetarSenha" class="b-button">
            <b-icon icon="check-circle-fill" aria-hidden="true"></b-icon>
            &nbsp; Enviar Link de Recuperação
        </b-button>
    </div>
</template>

<script>
export default {
    name: "EsqueceuSenhaComponent",

    data() {
        return {
        }
    },

    methods: {
        resetarSenha() {

        }
    }
}
</script>

<style scoped>
.box-login {
    width: 350px;
    margin: auto;
    border: 1px solid #ddd;
    margin-top: 30px;
    padding: 30px;
    border-radius: 20px;
}
</style>