<template>
    <div class="box-login">
        <FlashErrorMessage></FlashErrorMessage>
        <FlashMessage></FlashMessage>
    
        <div>
            <b-button variant="outline-secondary" @click="toggleShowPassword ">
                <b-icon :icon="showNewPasswordConf ? 'eye-fill' : 'eye-slash-fill'"></b-icon>
            </b-button>
            <h4 class="titulo"> Alterar Senha </h4>
        </div>
    
        <hr>
    
        <b-input-group class="mb-2">
            <b-input-group-prepend is-text>
                <b-icon icon="lock-fill"></b-icon>
            </b-input-group-prepend>
            <b-form-input :type="showCurrentPassword ? 'text' : 'password'" ref="currentInput" :state="validationState" placeholder="Senha Atual" v-model="current_password"></b-form-input>
            <b-input-group-append>
                <!-- <b-button variant="outline-secondary" @click="toggleShowPassword('current')">
                            <b-icon :icon="showCurrentPassword ? 'eye-fill' : 'eye-slash-fill'" ></b-icon>
                        </b-button> -->
            </b-input-group-append>
        </b-input-group>
    
        <b-input-group class="mb-2">
            <b-input-group-prepend is-text>
                <b-icon icon="lock-fill"></b-icon>
            </b-input-group-prepend>
            <b-form-input :type="showNewPassword ? 'text' : 'password'" ref="newPasswordInput" :state="validationState" placeholder="Nova Senha" v-model="new_password"></b-form-input>
            <b-input-group-append>
                <!-- <b-button variant="outline-secondary" @click="toggleShowPassword('new') ">
                            <b-icon :icon="showNewPassword ? 'eye-fill' : 'eye-slash-fill'" ></b-icon>
                        </b-button> -->
            </b-input-group-append>
        </b-input-group>
    
        <b-input-group class="mb-2">
            <b-input-group-prepend is-text>
                <b-icon icon="lock-fill"></b-icon>
            </b-input-group-prepend>
            <b-form-input :type="showNewPasswordConf ? 'text' : 'password'" ref="newPasswordConfInput" :state="validationState" placeholder="Repita a Nova Senha" v-model="new_password_confirmation"></b-form-input>
            <b-input-group-append>
                <!-- <b-button variant="outline-secondary" @click="toggleShowPassword('confirmation')">
                            <b-icon :icon="showNewPasswordConf ? 'eye-fill' : 'eye-slash-fill'"></b-icon>
                        </b-button> -->
            </b-input-group-append>
        </b-input-group>
    
        <div class="matches" v-if='notSamePasswords' style="color: red; text-align: center;">
            <p>A senhas não conferem!</p>
        </div>
    
        <br>
    
        <!-- <b-form-input disabled placeholder="Visualizar senha"></b-form-input> -->
    
    
        <br>
        <transition name="hint" appear>
            <div v-if='passwordValidation.errors.length > 0 && !submitted' class='hints'>
    
                <!-- <h5 style="text-align: center;">Requerimentos</h5> -->
                <hr>
                <p style="color: green;" v-for='error in passwordValidation.errors' :key="error.id">{{error}} </p>
            </div>
        </transition>
    
        <div v-if="!validationState && (
                              (currentPasswordTouched && !current_password) ||
                              (newPasswordTouched && !new_password) ||
                              (newPasswordConfTouched && !new_password_confirmation)
                            )" class="text-danger">Por favor, preencha todos os campos.</div>
    
        <b-button @click="resetPassword" class="b-button" v-if='passwordsFilled && !notSamePasswords && passwordValidation.valid'>
            <b-icon v-if="!loading" icon="check-circle-fill" aria-hidden="true"></b-icon>
            <i v-if="loading" class="fas fa-spinner fa-spin"></i> &nbsp;
            <span v-if="!loading">Salvar </span>
            <span v-if="loading">Salvando...</span>
        </b-button>
    
        <!-- {{ current_password }} {{ new_password }} {{ new_password_confirmation }} -->
    
    
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
            reset_token: '',
            submitted: false,
            showCurrentPassword: false,
            showNewPassword: false,
            showNewPasswordConf: false,
            rules: [
                { message: '- Minimo de 1 Letra Maiúscula', regex: /[A-Z]+/ },
                { message: '- Mínimo de 6 caracteres', regex: /.{6,}/ },
                { message: '- Minímo de 1 número', regex: /[0-9]+/ },
                { message: '- Mínimo de 1 caracter especial (ex: @ ! , . * -)', regex: /[^a-zA-Z 0-9]+/g },

            ]
        }
    },

    methods: {

        toggleShowPassword(field) {

            if (field === 'current') {
                this.showCurrentPassword = !this.showCurrentPassword;
            } else if (field === 'new') {
                this.showNewPassword = !this.showNewPassword;
            } else if (field === 'confirmation') {
                this.showNewPasswordConf = !this.showNewPasswordConf;
            }
            this.showCurrentPassword = !this.showCurrentPassword;
            this.showNewPassword = !this.showNewPassword;
            this.showNewPasswordConf = !this.showNewPasswordConf;
        },

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

            // if (!this.new_password) {
            //     this.newPasswordTouched = true;

            //     this.$nextTick(() => {
            //         this.$refs.newPasswordInput.focus();
            //     });

            //     this.loading = false;
            //     this.validationState = false;
            //     return;
            // }

            // if (!this.new_password_confirmation) {
            //     this.newPasswordConfTouched = true;

            //     this.$nextTick(() => {
            //         this.$refs.newPasswordConfInput.focus();
            //     });

            //     this.loading = false;
            //     this.validationState = false;
            //     return;
            // }

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
    },

    computed: {
        notSamePasswords() {
            if (this.passwordsFilled) {
                return (this.new_password !== this.new_password_confirmation)
            } else {
                return false
            }
        },
        passwordsFilled() {
            return (this.new_password !== '' && this.new_password_confirmation !== '')
        },
        passwordValidation() {
            let errors = []
            for (let condition of this.rules) {
                if (!condition.regex.test(this.new_password)) {
                    errors.push(condition.message)
                }
            }
            if (errors.length === 0) {
                return { valid: true, errors }
            } else {
                return { valid: false, errors }
            }
        },


    }
}
</script>
  
<style scoped>
.box-login {
    max-width: 350px;
    margin: auto;
    border: 1px solid #ddd;
    margin-top: 50px;
    padding: 30px;
    border-radius: 20px;
    background-color: #ffffff;
}

.b-button {
    width: 100%;
    background-color: var(--second-color) !important;
    color: rgb(255, 255, 255) !important;
    padding: 10px !important;
    margin: 6px 0 !important;
    border: none !important;
    border-radius: 4px !important;
    cursor: pointer;
}

@media (max-width: 576px) {
    .box-login {
        margin-top: 20px;
    }
}
</style>
  