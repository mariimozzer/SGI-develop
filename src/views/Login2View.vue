<template>
    <div class="login-page">
        <form @submit.prevent="login" class="container">
            <FlashMessageError></FlashMessageError>
            <div class="box-login" style="background-color: #343537; color: white">
                <div>
                    <!-- <img class="logo" style="height: 150px;" src="../../public/img/logo-roboflex-vetor-branco.png"> -->
    
                </div>
    
                <b-input-group class="mb-2">
                    <b-input-group-prepend is-text>
                        <b-icon icon="envelope-fill"></b-icon>
                    </b-input-group-prepend>
                    <b-form-input type="text" v-model="email" :state="validationState" @blur="emailTouched = true" placeholder="roboflex@roboflex.com.br" class="form-control" ref="emailInput"></b-form-input>
                </b-input-group>
                <b-input-group class="mb-2">
                    <b-input-group-prepend is-text>
                        <b-icon icon="lock-fill"></b-icon>
                    </b-input-group-prepend>
                    <b-form-input type="password" v-model="password" :state="validationState" @blur="passwordTouched = true" placeholder="12345678" class="form-control" ref="passwordInput"></b-form-input>
                </b-input-group>
                <br>
    
                <div class="form-check">
                    <input class="form-check-input" type="radio" id="roboflex" value="roboflex" v-model="local">
                    <label class="form-check-label" for="roboflex"> Roboflex </label>
                    <br>
                    <input class="form-check-input" type="radio" id="zontec" value="zontec" v-model="local">
                    <label class="form-check-label" for="zontec"> Zontec </label>
                </div>
                <br>
    
                <div v-if="!validationState && (
                                            (emailTouched && !email) ||
                                            (passwordTouched && !password)
                                        )" class="text-danger">Por favor, preencha todos os campos.</div>
    
                <div class="col-sm-12">
                    <Button class="botaoLogin" value="Entrar"><i v-if="loading" class="fas fa-spinner fa-spin"></i> &nbsp;
                                                    <span v-if="!loading">Entrar</span>
                                                    <span v-if="loading">Processando...</span></Button>
                </div>
    
                <div class="col-sm-12" style="text-align: center; white; font-size: 15px;">
                    <a href="/esqueceuSenha" style="color: rgb(255, 255, 255);">Esqueceu sua senha ?</a>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import Button from '../components/button/ButtonComponent.vue';
import FlashMessageError from '@/components/flashMessage/FlashErrorComponent.vue'
import axios from 'axios';
import { mapMutations } from 'vuex';

export default {
    name: "LoginComponent2",

    components: {
        Button,
        FlashMessageError
    },

    data() {
        return {
            local: '',
            errors: [],
            email: '',
            password: '',
            token: '',
            id: '',
            menuUrl: '',
            loading: false,
            user: null,
            emailTouched: false,
            passwordTouched: false,
            validationState: null
        }
    },

    mounted() {
        if (localStorage.local) {
            this.local = localStorage.local
        }
    },

    watch: {
        local(newLocal) {
            localStorage.local = newLocal;
        }
    },

    methods: {

        login() {

            this.loading = true


            if (!this.email) {
                this.validationState = false;
                this.emailTouched = true;
                this.$nextTick(() => {
                    this.$refs.emailInput.focus();
                });

                this.loading = false;
                return;
            }

            if (!this.password) {
                this.validationState = false;
                this.passwordTouched = true;
                this.$nextTick(() => {
                    this.$refs.passwordInput.focus();
                });

                this.loading = false;
                return;
            }

            this.validationState = true;

            axios.post('http://192.168.0.6:8000/api/login', {
                email: this.email,
                password: this.password,
            }).then(
                res => {
                    // console.log(res)
                    this.id = res.data.user.id
                    this.user = res.data.user.name
                    localStorage.setItem('userName', this.user)


                    localStorage.setItem('token', res.data.token)
                    this.$router.push({ name: "HomeView" })

                    this.menuUrl = `http://192.168.0.6:8000/api/menu/usuario/${this.id}`
                    console.log(this.menuUrl)
                    console.log(res)

                    axios.get(this.menuUrl).then(menuResponse => {
                        const menuOptions = menuResponse.data
                        console.log(menuOptions)
                    })

                    this.loading = false

                }
            ).catch(
                err => {
                    this.$store.commit('setFlashMessageError', 'O E-mail ou a senha estão incorretos!')
                    setTimeout(() => {
                        this.$store.commit('clearFlashMessageError');
                    }, 10000)
                    this.email = ''
                    this.password = ''
                    console.log(err)
                }
            )
        },

        ...mapMutations(['setFlashMessageError'])
    }
}
</script>

<style scoped>

.app{
    background-color: var(--first-color);
}
.login-page {
    background-color: black;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.login-page .top-section,
.login-page .bottom-section {
    background-color: white;
    flex-shrink: 0;
}

.botaoLogin {
    /* border: 1px solid; */
    border-radius: 20px;
}

.box-login {
    width: 350px;
    margin: auto;
    border: 1px solid #ddd;
    margin-top: 150px;
    padding: 30px;
    border-radius: 20px;
}

.logo {
    text-align: center;
    background-image: url(../../public/img/logo-roboflex-vetor-branco.png);
    height: 100px;
    color: var(--first-color);
    padding: 100;
    font-size: 22px;
}

.container {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    flex-direction: column;
}
</style>