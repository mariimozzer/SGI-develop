<template>
    <div class="container">
        <FlashMessage></FlashMessage>
        <FlashMessageError></FlashMessageError>
    
    
        <div class="box-login">
            <h4 class="titulo"> Esqueceu sua Senha ? </h4>
            <hr><br>
            <label style="text-align: center;">Informe o e-mail para o qual deseja redefinir sua senha</label>
            <br><br>
            <b-input-group class="mb-2">
                <b-input-group-prepend is-text>
                    <b-icon icon="envelope-fill"></b-icon>
                </b-input-group-prepend>
                <b-form-input type="text" ref="emailInput"  v-model="email" :state="emailValidationState" placeholder="Digite seu Email"></b-form-input>
            </b-input-group>
            <div v-if="!emailValidationState && emailTouched && !email" class="text-danger">Por favor, preencha o campo de email.</div>
            <b-button @click="resetarSenha" class="b-button">
                <i v-if="!loading" class="fa-solid fa-paper-plane" aria-hidden="true"></i>
                <!-- <b-icon v-if="!loading" icon="check-circle-fill" aria-hidden="true"></b-icon> -->
                <i v-if="loading" class="fas fa-spinner fa-spin"></i> &nbsp;
                <span v-if="!loading">Enviar código de recuperação</span>
                <span v-if="loading">Enviando...</span>
            </b-button>
            <div v-if="loading" style="text-align: center;">
                <br>
                <!-- <i v-if="loading" class="fas fa-spinner fa-spin"> </i> -->
            </div>
            <br><br>
            <label style="text-align: center; color: rgb(116, 112, 112);">Você receberá um código token por e-mail para cadastrar uma nova senha</label>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { mapMutations } from 'vuex'
import FlashMessage from '../components/flashMessage/FlashOKComponent.vue'
import FlashMessageError from '@/components/flashMessage/FlashErrorComponent.vue'


export default {
    name: "EsqueceuSenhaComponent",

    components: {
        FlashMessage,
        FlashMessageError
    },

    data() {
        return {
            email: '',
            loading: false,
            emailValidationState: null,
            emailTouched: false
        }
    },

    methods: {
        resetarSenha() {

            if (!this.email) {
                this.emailValidationState = false;
                this.emailTouched = true;

                this.$nextTick(() => {
                    this.$refs.emailInput.focus();
                });

                return;
            }

            this.emailValidationState = true
            this.loading = true;

            axios.post('http://192.168.0.6:8000/api/enviar-codigo', {

                email: this.email,

            }).then(
                res => {
                    this.$store.commit('setFlashMessage', 'E-mail código de validação enviado com sucesso!');
                    this.$router.push({ name: "ValidarSenha" })
                    this.loading = false;
                    setTimeout(() => {
                        this.$store.commit('clearFlashMessage');
                    }, 10000)

                    this.email = ''

                    console.log(res)
                },


            ).catch(
                err => {

                    this.loading = false;
                    this.emailValidationState = false;
                    this.$store.commit('setFlashMessageError', 'E-mail inválido')
                    setTimeout(() => {
                        this.$store.commit('clearFlashMessageError');
                    }, 10000)

                    this.email = ''

                    console.log(err)
                }
            )
        },

        ...mapMutations(['setFlashMessage']),

        ...mapMutations(['setFlashMessageError']),

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

.container {
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    flex-direction: column;
}
</style>