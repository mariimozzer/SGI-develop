<template>
    <div class="box-login">
        <h3 class="titulo"> Redefinir Senha </h3>
        <hr>
    
        <b-input-group class="mb-2">
            <b-input-group-prepend is-text>
                <b-icon icon="lock-fill"></b-icon>
            </b-input-group-prepend>
            <b-form-input type="password" placeholder="Senha Atual" v-model="senha.current_password"></b-form-input>
        </b-input-group>
    
        <b-input-group class="mb-2">
            <b-input-group-prepend is-text>
                <b-icon icon="lock-fill"></b-icon>
            </b-input-group-prepend>
            <b-form-input type="password" placeholder="Nova Senha" v-model="senha.new_password"></b-form-input>
        </b-input-group>
    
        <b-input-group class="mb-2">
            <b-input-group-prepend is-text>
                <b-icon icon="lock-fill"></b-icon>
            </b-input-group-prepend>
    
            <b-form-input type="password" placeholder="Repita a Senha" v-model="senha.new_password_confirmation"></b-form-input>
        </b-input-group>
    
        <!-- <label style="color: red; text-decoration: double;" v-if="error">{{ error }}</label> -->

        <b-input-group class="mb-2">
        <b-button @click="resetPassword" class="b-button">
            <b-icon icon="check-circle-fill" aria-hidden="true"></b-icon>
            &nbsp;  
        </b-button>
        </b-input-group>
    

    </div>
</template>
  
<script>
import ResetarSenha from '@/models/ResetarSenha'
import resetarSenhaService from '@/services/resetar_senha-service'

export default {

    name: 'ResetarSenhaView',
    components: {},
    props: ['hash'],
    data() {
        return {
            senha: new ResetarSenha()
        }
    },

    methods: {
        resetPassword() {

            resetarSenhaService.cadastrar(this.senha)
                .then(() => {
                    this.senha = new ResetarSenha();

                })
                .catch(error => {
                    console.log(error);
                });

        },

        verSenha() {


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
  
 