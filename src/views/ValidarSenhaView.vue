<template>
    <div class="container">
    
        <FlashMessage></FlashMessage>
        <FlashErrorMessage></FlashErrorMessage>
    
        <div class="box-login">
            <div style="text-align: right;"> 
                <div v-if="codigoValido">
                <b-button variant="outline-secondary" @click="toggleShowPassword ">
                    <b-icon :icon="showPasswordConf ? 'eye-fill' : 'eye-slash-fill'"></b-icon>
                </b-button>
            </div>
            </div>
           <br>
    
            <h4 class="titulo"> Validação de Token &nbsp;  <b-icon icon="shield-lock"></b-icon></h4>
            <hr>
            <label style="text-align: center;">Insira o código token que você recebeu por email </label>
            <br>
            <b-input-group class="mb-2">
    
                <b-input-group-prepend is-text>
                    <b-icon icon="shield-lock"></b-icon>
                </b-input-group-prepend>
                <b-form-input type="number" ref="codeInput" :disabled="codigoValido" :state="validationState" v-model="codigo" placeholder="Digite o código do email"></b-form-input>
            </b-input-group>
    
            <div v-if="!validationState && codeTouched && !codigo" class="text-danger">Por favor, preencha o campo de código.</div>
    
            <b-button v-if="!codigoValido" @click="validarCodigo" class="b-button">
                <i v-if="!loading" class="fa-solid fa-key" aria-hidden="true"></i> &nbsp;
                <!-- <b-icon v-if="!loading" icon="key-fill"></b-icon> -->
                <i v-if="loading" class="fas fa-spinner fa-spin"></i>
                <span v-if="!loading">Verificar </span>
                <span v-if="loading"> &nbsp; Verificando...</span>
            </b-button>
    
            <div v-if="codigoValido">
    
            <br>
            <br>
            <b-input-group class="mb-2">
                <b-input-group-prepend is-text>
                    <b-icon icon="lock-fill"></b-icon>
                </b-input-group-prepend>
                <b-form-input :type="showNewPassword ? 'text' : 'password'" ref="newPasswordInput" :state="validationState" placeholder="Nova Senha" v-model="new_password"></b-form-input>

                <!-- <b-form-input type="password" ref="newPasswordInput" :state="validationState" v-model="new_password" placeholder="Senha"></b-form-input> -->
            </b-input-group>
    
            <b-input-group class="mb-2">
                <b-input-group-prepend is-text>
                    <b-icon icon="lock-fill"></b-icon>
                </b-input-group-prepend>
                <b-form-input :type="showPasswordConf ? 'text' : 'password'" ref="newPasswordConfInput" :state="validationState" placeholder="Repita a Nova Senha" v-model="new_password_confirmation"></b-form-input>

                <!-- <b-form-input type="password" ref="newPasswordConfInput" :state="validationState" v-model="new_password_confirmation" placeholder="Repita a Senha"></b-form-input> -->
            </b-input-group>
    
            <div class="matches" v-if='notSamePasswords' style="color: red; text-align: center;">
            <p>A senhas não conferem!</p>
        </div>
    
            <div v-if="!validationState && (
                                (newPasswordTouched && !new_password) ||
                                (newPasswordConfTouched && !new_password_confirmation)
                            )" class="text-danger">Por favor, preencha todos os campos.</div>
    
    
            <b-button @click="resetarSenha" class="b-button" v-if='passwordsFilled && !notSamePasswords && passwordValidation.valid'>
                <b-icon v-if="!loading" icon="check-circle-fill" aria-hidden="true"></b-icon>
                <i v-if="loading" class="fas fa-spinner fa-spin"></i> &nbsp;
                <span v-if="!loading">Resetar Senha</span>
                <span v-if="loading">Resetando...</span>
            </b-button>
    
            <transition name="hint" appear>
                <div v-if='passwordValidation.errors.length > 0 && !submitted' class='hints'>
                    <!-- <h5 style="text-align: center;">Critérios</h5> -->
                    <hr>
                    <p style="color: green;" v-for='error in passwordValidation.errors' :key="error.id">{{error}} </p>
                </div>
            </transition>
        </div>
    </div>
    </div>
</template>

<script>
import axios from 'axios';
import FlashMessage from '@/components/flashMessage/FlashOKComponent.vue';
import FlashErrorMessage from '@/components/flashMessage/FlashErrorComponent.vue';
import { mapMutations } from 'vuex'

export default {
    name: "ValidarSenhaComponent",

    components: {
        FlashMessage,
        FlashErrorMessage
    },
    data() {
        return {
            codigo: '',
            new_password: '',
            new_password_confirmation: '',
            erroCodigo: false,
            codigoValido: false,
            validationState: null,
            codeTouched: false,
            loading: false,
            newPasswordTouched: false,
            newPasswordConfTouched: false,
            submitted: false,
            showNewPassword: false,
            showPasswordConf: false,
            rules: [
                { message: '- Minimo de 1 Letra Maiúscula', regex: /[A-Z]+/ },
                { message: '- Mínimo de 6 caracteres', regex: /.{6,}/ },
                { message: '- Minímo de 1 número', regex: /[0-9]+/ },
                { message: '- Mínimo de 1 caracter especial (ex: @ ! , . * -)', regex: /[^a-zA-Z 0-9]+/g },
            ]
        }
    },

    watch: {

    },

    methods: {
        toggleShowPassword(field) {

            if (field === 'new') {
                this.showNewPassword = !this.showNewPassword;

            } else if (field === 'confirmation') {
                this.showPasswordConf = !this.showPasswordConf;
            }
            this.showNewPassword = !this.showNewPassword;
            this.showPasswordConf = !this.showPasswordConf;
        },

        validarCodigo() {
            if (!this.codigo) {
                this.validationState = false
                this.codeTouched = true

                this.$nextTick(() => {
                    this.$refs.codeInput.focus();
                });

                return
            }

            this.validationState = true
            this.loading = true

            axios.post('http://192.168.0.6:8000/api/validar-codigo', { codigo: this.codigo })
                .then(
                    response => {
                        if (response.data === 0) {
                            this.erroCodigo = true;
                            this.$store.commit('setFlashMessageError', 'Código inválido ou expirado!')
                            this.codigo = ''
                            this.loading = false



                        } else if (response.data === 1) {
                            this.$store.commit('setFlashMessage', 'Código verificado!')

                            this.erroCodigo = false;
                            this.codigoValido = true;
                            this.loading = false

                        }
                    })
                .catch(error => {
                    console.error(error);
                });
        },

        resetarSenha() {

            this.loading = true
            this.validationState = null;
            this.newPasswordTouched = false;
            this.newPasswordConfTouched = false;

            if (!this.new_password) {
                this.newPasswordTouched = true
                this.loading = false

                this.$nextTick(() => {
                    this.$refs.newPasswordInput.focus();

                });
                return;

            }

            if (!this.new_password_confirmation) {
                // this.validationState = false
                this.newPasswordConfTouched = true
                this.loading = false


                this.$nextTick(() => {
                    this.$refs.newPasswordConfirmationInput.focus();
                });

                return;
            }

            if (this.new_password === this.new_password_confirmation) {
                this.validationState = true

                axios.post('http://192.168.0.6:8000/api/redefinir-senha', {
                        codigo: this.codigo,
                        new_password: this.new_password,
                        new_password_confirmation: this.new_password_confirmation

                    })
                    .then(response => {
                        this.$store.commit('setFlashMessage', 'Senha resetada com sucesso!');
                        this.codigo = ''
                        this.new_password = ''
                        this.new_password_confirmation = ''
                        this.loading = false
                        console.log(response)
                    })
                    .catch(error => {
                        this.loading = false
                        this.validationState = false
                        this.$store.commit('setFlashMessageError', 'Erro ao redefinir senha!')
                        setTimeout(() => {
                            this.$store.commit('clearFlashMessageError');
                        }, 5000)

                        console.error('Erro ao redefinir a senha:', error);
                    });
            } else {
                this.loading = false
                this.$store.commit('setFlashMessageError', 'As senhas não conferem!')
                this.new_password = ''
                this.new_password_confirmation = ''
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
.container {
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    flex-direction: column;
}

.box-login {
    width: 350px;
    margin: auto;
    border: 1px solid #ddd;
    margin-top: 30px;
    padding: 30px;
    border-radius: 20px;
}
</style>