<template>
    <form @submit.prevent="login">
    
    
        <div class="box-login">
    
            <div>
                <img class="logo" src="../../public/img/logo-preta.png">
                <br>
                <br>
                <br>
    
            </div>
            <b-input-group class="mb-2">
                <b-input-group-prepend is-text>
                    <b-icon icon="envelope-fill"></b-icon>
                </b-input-group-prepend>
                <b-form-input type="text" v-model="email" placeholder="roboflex@roboflex.com.br"  class="form-control"></b-form-input>
            </b-input-group>
            <b-input-group class="mb-2">
                <b-input-group-prepend is-text>
                    <b-icon icon="lock-fill"></b-icon>
                </b-input-group-prepend>
                <b-form-input type="password" v-model="password" placeholder="12345678"    class="form-control"></b-form-input>
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
            
            <Button value="Entrar"></Button>
            <br>
            <div class="col-sm-12" style="text-align: center;">
                <a href="/esqueceuSenha" style="color: black;">Esqueceu sua senha ?</a>
    
            </div>
        </div>
    </form>
</template>

<script>
import Button from '../components/button/ButtonComponent.vue';
import axios from 'axios';

export default {
    name: "LoginComponent",

    components: {
        Button
    },

    data() {
        return {
            local: '',
            errors: [],
            email: '',
            password: '',
            token: '',
            id : '',
            menuUrl : ''
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
            axios.post('http://192.168.0.6:8000/api/login', {
                email: this.email,
                password: this.password,
            }).then(
                res => {
                    // console.log(res)
                    this.id = res.data.user.id
                    localStorage.setItem('token',res.data.token)
                    this.$router.push({ name: "HomeView" })

                    this.menuUrl = `http://192.168.0.6:8000/api/menu/usuario/${this.id}`
                    console.log(this.menuUrl)


                    axios.get(this.menuUrl).then(menuResponse => {
                        const menuOptions = menuResponse.data
                        console.log(menuOptions)
                    })

                    
                    .catch(error => {
                        console.error('Erro', error)
                    })
                }
            ).catch(
                err => {
                    console.log(err)
                }
            )
        }
    }
}
</script>

<style scoped>
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
    background-image: url(../../public/img/logo-preta.png);
    color: var(--first-color);
    padding: 100;
    font-size: 22px;
}
</style>