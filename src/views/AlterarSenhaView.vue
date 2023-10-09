<template>
    <div class="box-login">
    
        <FlashErrorMessage></FlashErrorMessage>
        <FlashMessage></FlashMessage>
    
        <h4 class="titulo"> Alterar Senha </h4>
        <hr>
    
        <b-input-group class="mb-2">
            <b-input-group-prepend is-text>
                <b-icon icon="lock-fill"></b-icon>
            </b-input-group-prepend>
            <b-form-input type="password" ref="currentInput" :state="validationState" placeholder="Senha Atual" v-model="senha.current_password"></b-form-input>
        </b-input-group>
    
        <b-input-group class="mb-2">
            <b-input-group-prepend is-text>
                <b-icon icon="lock-fill"></b-icon>
            </b-input-group-prepend>
            <b-form-input type="password" ref="newPasswordInput" :state="validationState" placeholder="Nova Senha" v-model="senha.new_password"></b-form-input>
        </b-input-group>
    
        <b-input-group class="mb-2">
            <b-input-group-prepend is-text>
                <b-icon icon="lock-fill"></b-icon>
            </b-input-group-prepend>
    
            <b-form-input type="password" ref="newPasswordConfInput" :state="validationState" placeholder="Repita a Nova Senha" v-model="senha.new_password_confirmation"></b-form-input>
        </b-input-group>
    
        <!-- <label style="color: red; text-decoration: double;" v-if="error">{{ error }}</label> -->
    
    
        <div v-if="!validationState && (
                (currentPasswordTouched && !current_password) ||
                (newPasswordTouched && !new_password) ||
                (newPasswordConfTouched && !new_password_confirmation)
            )" class="text-danger">Por favor, preencha todos os campos.</div>
    
        <b-button @click="resetPassword" class="b-button">
            <b-icon v-if="!loading" icon="check-circle-fill" aria-hidden="true"></b-icon>
            <i v-if="loading" class="fas fa-spinner fa-spin"></i> &nbsp;
            <span v-if="!loading">Salvar </span>
            <span v-if="loading">Salvando...</span>
        </b-button>
    
    </div>
</template>
  
<script>
import AlterarSenha from '@/models/AlterarSenha'
import alterarSenhaService from '@/services/alterar_senha-service'
import FlashMessage from '@/components/flashMessage/FlashOKComponent.vue'
import FlashErrorMessage from '@/components/flashMessage/FlashErrorComponent.vue';
import axios from 'axios';

export default {

    name: 'AlterarSenhaComponent',
    components: {
        FlashMessage,
        FlashErrorMessage
    },
    data() {
        return {
            senha: new AlterarSenha(),
            loading: false,
            validationState: null,
            current_password: '',
            new_password: '',
            new_password_confirmation: '',
            currentPasswordTouched: false,
            newPasswordTouched: false,
            newPasswordConfTouched: false


        }
    },

    methods: {
        resetPassword() {
            this.loading = true

            if (!this.current_password) {
                this.validationState = false
                this.currentPasswordTouched = true
                this.loading = false

                this.$nextTick(() => {
                    this.$refs.currentInput.focus();
                });
                return
            }


            if (!this.new_password) {
                this.validationState = false
                this.newPasswordTouched = true
                this.loading = false


                this.$nextTick(() => {
                    this.$refs.newPasswordInput.focus();
                });

                return
            }

            if (!this.new_password_confirmation) {
                this.validationState = false
                this.newPasswordConfTouched = true
                this.loading = false


                this.$nextTick(() => {
                    this.$refs.newPasswordConfInput.focus();
                });

                return
            }

            this.loading = true
            this.validationState = true

            axios.post('http://192.168.0.6:8000/api/usuarios/senha/alterar', {
                    current_password: this.current_password,
                    new_password: this.new_password,
                    new_password_confirmation: this.new_password_confirmation
                })
                .then(
                    response => {
                        console.log(response)
                    }
                )
                .catch(error => {
                    console.error(error)
                })


            alterarSenhaService.cadastrar(this.senha)
                .then(() => {
                    this.senha = new AlterarSenha();

                })
                .catch(error => {
                    console.log(error);
                });

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
  
 