<template>
    <div class="box-login">
        <h3 class="titulo"> Redefinir Senha </h3>
        <hr>
    
        <b-input-group class="mb-2">
            <b-input-group-prepend is-text>
                <b-icon icon="lock-fill"></b-icon>
            </b-input-group-prepend>
            <b-form-input type="password" placeholder="Senha" v-model="novaSenha"></b-form-input>
        </b-input-group>
    
        <b-input-group class="mb-2">
            <b-input-group-prepend is-text>
                <b-icon icon="lock-fill"></b-icon>
            </b-input-group-prepend>
    
            <b-form-input type="password" placeholder="Repita a Senha" v-model="repitaNovaSenha"></b-form-input>
        </b-input-group>
    
        <label style="color: red; text-decoration: double;" v-if="error">{{ error }}</label>
    
        <div class="col-sm-12">
            <b-button class="b-button">
                <b-icon @click="resetPassword" icon="check-circle"></b-icon>
                &nbsp; Redefinir Senha
            </b-button>
        </div>
    </div>
</template>
  
<script>


export default {

    name: 'ResetarSenhaView',
    components: {
    },
    props: ['hash'],
    data() {
        return {
            novaSenha: null,
            repitaNovaSenha: null,
            error: ''
        }
    },

    methods: {
        resetPassword() {

            if (this.novaSenha || this.repitaNovaSenha == null) {
                this.error = "Por favor, preencha todos os campos !"
            }

            if (this.novaSenha !== this.repitaNovaSenha) {

                this.error = "As senhas não conferem!"
            } else {
                console.log('Resetando senha com hash:', this.hash);

            }
        },

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
  
 