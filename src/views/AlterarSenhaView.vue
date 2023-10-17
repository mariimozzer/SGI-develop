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
            <b-form-input type="password" ref="currentInput" :state="validationState" placeholder="Senha Atual" v-model="current_password"></b-form-input>
        </b-input-group>
    
        <b-input-group class="mb-2">
            <b-input-group-prepend is-text>
                <b-icon icon="lock-fill"></b-icon>
            </b-input-group-prepend>
            <b-form-input type="password" ref="newPasswordInput" :state="validationState" placeholder="Nova Senha" v-model="new_password"></b-form-input>
        </b-input-group>
    
        <b-input-group class="mb-2">
            <b-input-group-prepend is-text>
                <b-icon icon="lock-fill"></b-icon>
            </b-input-group-prepend>
    
            <b-form-input type="password" ref="newPasswordConfInput" :state="validationState" placeholder="Repita a Nova Senha" v-model="new_password_confirmation"></b-form-input>
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
    
        {{ current_password }} {{ new_password }} {{ new_password_confirmation }}
    
    </div>
</template>
  
<script>
import AlterarSenha from '@/models/AlterarSenha'
import FlashMessage from '@/components/flashMessage/FlashOKComponent.vue'
import FlashErrorMessage from '@/components/flashMessage/FlashErrorComponent.vue';
import axios from 'axios';
import { mapMutations } from 'vuex';

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
            newPasswordConfTouched: false,
            reset_token: ''


        }
    },

    methods: {
        resetPassword() {
            this.loading = true;
            this.validationState = true;
            if (!this.current_password) {
                this.currentPasswordTouched = true;

                this.$nextTick(() => {
                    this.$refs.currentInput.focus();
                });

                this.loading = false;
                this.validationState = false;
                return;
            }

            if (!this.new_password) {
                this.newPasswordTouched = true;

                this.$nextTick(() => {
                    this.$refs.newPasswordInput.focus();
                });

                this.loading = false;
                this.validationState = false;
                return;
            }

            if (!this.new_password_confirmation) {
                this.newPasswordConfTouched = true;

                this.$nextTick(() => {
                    this.$refs.newPasswordConfInput.focus();
                });

                this.loading = false;
                this.validationState = false;
                return;
            }

            if (this.new_password === this.new_password_confirmation) {
                this.validationState = true;
                this.currentPasswordTouched = true
                this.newPasswordTouched = true
                this.newPasswordConfTouched = true
                this.reset_token = localStorage.getItem('token')
                console.log(this.reset_token)

                axios.post('http://192.168.0.6:8000/api/usuario/senha/alterar', {
                        current_password: this.current_password,
                        new_password: this.new_password,
                        new_password_confirmation: this.new_password_confirmation
                    }, {
                        headers: {
                            'Authorization': `Bearer ${this.reset_token}`
                        }
                    })
                    .then(
                        response => {
                            this.$store.commit('setFlashMessage', 'Senha resetada com sucesso!')
                            this.current_password = ''
                            this.new_password = ''
                            this.new_password_confirmation = ''
                            this.loading = false

                            console.log(response)
                        }
                    )
                    .catch(error => {
                        this.loading = false
                        this.validationState = false
                        this.$store.commit('setFlashMessageError', 'Erro ao redefinir senha!')
                        setTimeout(() => {
                            this.$store.commit('clearFlashMessageError');
                        }, 5000)
                        console.error(error)
                    })


            } else {
                this.loading = false
                this.$store.commit('setFlashMessageError', 'As senhas não conferem!')
                this.new_password = ''
                this.new_password_confirmation = ''
                this.current_password = ''

            }



        },

        ...mapMutations(['setFlashMessage']),

        ...mapMutations(['setFlashMessageError'])
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
  
 